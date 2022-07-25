import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import {
  axiosMock,
  FAVORITE_CLUB,
  getMockedClubs,
  renderWithProviders,
} from '../../../../testing';

import { NOT_FAVORITE_CLUB } from '../../../../testing';
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

  it('should render the clubs in the store when loaded', async () => {
    axiosMock.onGet('/api/clubs').reply(200, getMockedClubs());

    renderWithProviders(<ClubCatalog />);

    const searchContainer = screen.getByRole('search', {
      name: 'Search club by name',
    });

    await waitFor(() => {
      expect(
        screen.getByRole('list', { name: 'Club Catalog' }).childNodes
      ).toHaveLength(6);
    });

    expect(searchContainer).toHaveTextContent('Se encontraron 20 clubes.');
  });

  it('should allow to favorite a club', async () => {
    axiosMock.onGet('/api/clubs').reply(200, getMockedClubs());
    axiosMock
      .onPatch(`/api/clubs/${NOT_FAVORITE_CLUB.id}`)
      .reply(200, { ...NOT_FAVORITE_CLUB, favorite: true });

    renderWithProviders(<ClubCatalog />);

    const searchContainer = screen.getByRole('search', {
      name: 'Search club by name',
    });

    await waitFor(() => {
      expect(searchContainer).toHaveTextContent('Se encontraron 20 clubes.');
    });

    const clubCard = screen.getByRole('article', {
      name: NOT_FAVORITE_CLUB.name,
    });

    const favoriteCheckbox = within(clubCard).getByLabelText('Favorito');

    expect(favoriteCheckbox).not.toBeChecked();

    fireEvent.click(favoriteCheckbox);

    await waitFor(() => {
      expect(favoriteCheckbox).toBeChecked();
    });
  });

  it('should allow to unfavorite a club', async () => {
    axiosMock.onGet('/api/clubs').reply(200, getMockedClubs());
    axiosMock
      .onPatch(`/api/clubs/${FAVORITE_CLUB.id}`)
      .reply(200, { ...FAVORITE_CLUB, favorite: false });

    renderWithProviders(<ClubCatalog />);

    const searchContainer = screen.getByRole('search', {
      name: 'Search club by name',
    });

    await waitFor(() => {
      expect(searchContainer).toHaveTextContent('Se encontraron 20 clubes.');
    });

    const clubCard = screen.getByRole('article', { name: FAVORITE_CLUB.name });

    const favoriteCheckbox = within(clubCard).getByLabelText('Favorito');

    expect(favoriteCheckbox).toBeChecked();

    fireEvent.click(favoriteCheckbox);

    await waitFor(() => {
      expect(favoriteCheckbox).not.toBeChecked();
    });
  });
});
