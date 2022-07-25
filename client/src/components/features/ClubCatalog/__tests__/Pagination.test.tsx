import { fireEvent, screen, waitFor } from '@testing-library/react';
import { clubsCatalogSlice } from '../../../../redux/slices/clubsCatalog';

import {
  axiosMock,
  getMockedClubs,
  renderWithProviders,
} from '../../../../testing';

import { ClubCatalog } from '../ClubCatalog';

// Se hace un mock del useMediaQuery ya que no existe "window" en los tests.
// Si no se hiciese, romperia el test por no estar definida.

jest.mock('@chakra-ui/react', () => {
  // --> Original module
  const originalModule = jest.requireActual('@chakra-ui/react');

  return {
    __esModule: true,
    ...originalModule,
    useMediaQuery: jest.fn().mockImplementation(() => [true]),
  };
});

describe('<Pagination>', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should let the user navigate through page', async () => {
    axiosMock
      .onGet('/api/clubs')
      .reply((config) => [
        200,
        getMockedClubs({ ...config.params }, { maxClubs: 10 }),
      ]);

    renderWithProviders(<ClubCatalog />);

    await waitFor(() => {
      expect(
        screen.getByRole('navigation', { name: 'Pagination' })
      ).toBeInTheDocument();
    });

    const previousButton = screen.getByRole('button', {
      name: 'Previous page',
    });
    const nextButton = screen.getByRole('button', { name: 'Next page' });
    const pageCount = screen.getByRole('contentinfo', { name: 'Page count' });

    expect(previousButton).toBeDisabled();
    expect(pageCount).toHaveTextContent('1/2');

    getMockedClubs({}, { maxClubs: 10 }).results.forEach((club) =>
      expect(
        screen.getByRole('article', { name: club.name })
      ).toBeInTheDocument()
    );

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(pageCount).toHaveTextContent('2/2');
    });

    expect(nextButton).toBeDisabled();
    expect(previousButton).toBeEnabled();

    getMockedClubs({ offset: 6 }, { maxClubs: 10 }).results.forEach((club) =>
      expect(
        screen.getByRole('article', { name: club.name })
      ).toBeInTheDocument()
    );

    fireEvent.click(previousButton);

    await waitFor(() => {
      expect(pageCount).toHaveTextContent('1/2');
    });

    getMockedClubs({}, { maxClubs: 10 }).results.forEach((club) =>
      expect(
        screen.getByRole('article', { name: club.name })
      ).toBeInTheDocument()
    );
  });

  it('should not show pagination if there is no extra page to see', async () => {
    axiosMock
      .onGet('/api/clubs')
      .reply(200, getMockedClubs({}, { maxClubs: 3 }));

    renderWithProviders(<ClubCatalog />);

    const searchContainer = screen.getByRole('search');

    await waitFor(() => {
      expect(searchContainer).toHaveTextContent('Se encontraron 3 clubes.');
    });

    expect(
      screen.queryByRole('navigation', { name: 'Pagination' })
    ).not.toBeInTheDocument();
  });
});
