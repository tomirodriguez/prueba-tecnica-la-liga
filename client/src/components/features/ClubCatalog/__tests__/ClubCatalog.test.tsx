import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import {
  axiosMock,
  AXIOS_GET_CLUBS_DEFAULT_FAVORITE_RESPONSE,
  AXIOS_GET_CLUBS_DEFAULT_RESPONSE,
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

describe('<Catalog>', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should render all the clubs in the store', async () => {
    axiosMock
      .onGet('/api/clubs', { limit: 6, offset: 0, name_like: '' })
      .reply(200, AXIOS_GET_CLUBS_DEFAULT_RESPONSE);

    renderWithProviders(<ClubCatalog />);

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' }).childNodes
      ).toHaveLength(6);
    });

    expect(screen.getByText('Se encontraron 20 clubes.')).toBeInTheDocument();

    const catalog = screen.getByRole('list', { name: 'Club Catalog' });

    expect(catalog.childElementCount).toBe(6);
  });

  it('should render filter by favorites', async () => {
    axiosMock
      .onGet('/api/clubs', { limit: 6, offset: 0, name_like: '' })
      .reply(200, AXIOS_GET_CLUBS_DEFAULT_RESPONSE);

    axiosMock
      .onGet('/api/clubs', {
        limit: 6,
        offset: 0,
        name_like: '',
        favorite: true,
      })
      .reply(200, AXIOS_GET_CLUBS_DEFAULT_FAVORITE_RESPONSE);

    const { results } = AXIOS_GET_CLUBS_DEFAULT_FAVORITE_RESPONSE;

    renderWithProviders(<ClubCatalog />);

    const filters = screen.getByRole('list', { name: 'Favorite filter' });

    const favorites = within(filters).getByText('Favoritos');

    fireEvent.click(favorites);

    await waitFor(() => {
      expect(
        screen.getByRole('article', {
          name: results[0].name,
        })
      ).toBeInTheDocument();
    });
  });
});
