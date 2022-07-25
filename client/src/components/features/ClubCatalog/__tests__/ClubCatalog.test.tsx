import {
  fireEvent,
  screen,
  waitFor,
  within,
  prettyDOM,
} from '@testing-library/react';

import {
  axiosMock,
  AXIOS_GET_CLUBS_DEFAULT_FAVORITE_RESPONSE,
  AXIOS_GET_CLUBS_DEFAULT_RESPONSE,
  renderWithProviders,
  responseToClub,
} from '../../../../testing';

import { clubsCatalogSlice } from '../../../../redux/slices/clubsCatalog/clubsCatalogSlice';
import { AXIOS_GET_CLUBS_DEFAULT_NOT_FAVORITE_RESPONSE } from '../../../../testing/axios/responses/axiosGetClubsDefaultNotFavoriteResponse';
import { ClubCatalog } from '../ClubCatalog';
import { GetClubsProps } from '../../../../services';
import { AxiosRequestConfig } from 'axios';

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

  it('should filter by favorites correctly', async () => {
    axiosMock
      .onGet('/api/clubs', { limit: 6, offset: 0, name_like: '' })
      .reply((config) => {
        if (config.params.favorite === true)
          return [200, AXIOS_GET_CLUBS_DEFAULT_FAVORITE_RESPONSE];
        else if (config.params.favorite === false)
          return [200, AXIOS_GET_CLUBS_DEFAULT_NOT_FAVORITE_RESPONSE];
        else return [200, AXIOS_GET_CLUBS_DEFAULT_RESPONSE];
      });

    renderWithProviders(<ClubCatalog />, {
      preloadedState: {
        clubs: {
          ...clubsCatalogSlice.getInitialState(),
          clubs: responseToClub(AXIOS_GET_CLUBS_DEFAULT_RESPONSE.results),
          total: 20,
          loading: false,
        },
      },
    });

    const filters = screen.getByRole('list', { name: 'Favorite filter' });

    const all = within(filters).getByText('Todos');
    const favorites = within(filters).getByText('Favoritos');
    const notFavorites = within(filters).getByText('No favoritos');

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' })
      ).toBeInTheDocument();
    });

    fireEvent.click(favorites);

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' }).childElementCount
      ).toBe(2);
    });

    fireEvent.click(notFavorites);

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' }).childElementCount
      ).toBe(4);
    });

    fireEvent.click(all);

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' }).childElementCount
      ).toBe(6);
    });
  });
});
