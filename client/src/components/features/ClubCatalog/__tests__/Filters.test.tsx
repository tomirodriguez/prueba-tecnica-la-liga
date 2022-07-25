import { fireEvent, screen, waitFor, within } from '@testing-library/react';

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

describe('<Filters>', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should filter by favorites correctly', async () => {
    axiosMock
      .onGet('/api/clubs', { limit: 6, offset: 0, name_like: '' })
      .reply((config) => [200, getMockedClubs({ ...config.params })]);

    renderWithProviders(<ClubCatalog />);

    const filters = screen.getByRole('list', { name: 'Favorite filter' });

    const all = within(filters).getByText('Todos');
    const favorites = within(filters).getByText('Favoritos');
    const notFavorites = within(filters).getByText('No favoritos');

    const searchContainer = screen.getByRole('search', {
      name: 'Search club by name',
    });

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' }).childElementCount
      ).toBe(6);
    });

    fireEvent.click(favorites);

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' }).childElementCount
      ).toBe(4);
    });

    expect(searchContainer).toHaveTextContent('Se encontraron 4 clubes.');

    fireEvent.click(notFavorites);

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' }).childElementCount
      ).toBe(6);
    });

    expect(searchContainer).toHaveTextContent('Se encontraron 16 clubes.');

    fireEvent.click(all);

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' }).childElementCount
      ).toBe(6);
    });

    expect(searchContainer).toHaveTextContent('Se encontraron 20 clubes.');
  });
});
