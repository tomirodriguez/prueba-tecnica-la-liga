import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import {
  axiosMock,
  getMockedClubs,
  renderWithProviders,
} from '../../../../testing';

import userEvent from '@testing-library/user-event';
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

describe('<SearchBox>', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should filter by name correctly', async () => {
    axiosMock
      .onGet('/api/clubs', { limit: 6, offset: 0, name_like: '' })
      .reply((config) => [200, getMockedClubs({ ...config.params })]);

    renderWithProviders(<ClubCatalog />);

    const searchContainer = screen.getByRole('search');

    const searchBox = within(searchContainer).getByRole('searchbox', {
      name: 'Search box',
    });

    await waitFor(() => {
      expect(searchContainer).toHaveTextContent('Se encontraron 20 clubes.');
    });

    userEvent.type(searchBox, 'filtro nombre');
    fireEvent.submit(searchBox);

    await waitFor(() => {
      expect(searchContainer).toHaveTextContent('Se encontraron 3 clubes.');
    });

    userEvent.clear(searchBox);
    fireEvent.submit(searchBox);

    await waitFor(() => {
      expect(searchContainer).toHaveTextContent('Se encontraron 20 clubes.');
    });
  });
});
