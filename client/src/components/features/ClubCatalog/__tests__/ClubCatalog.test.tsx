import { screen, waitFor } from '@testing-library/react';

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
});
