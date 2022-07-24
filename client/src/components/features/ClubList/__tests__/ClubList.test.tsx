import { render, screen, within } from '@testing-library/react';
import { TestingLayout } from '../../../../testing';

import { DUMMY_CLUBS_LIST } from '../../../../testing/mocks/clubsList';
import { ClubList } from '../ClubList';

describe('<ClubList>', () => {
  it('should render all the clubs in the store', async () => {
    render(
      <TestingLayout>
        <ClubList />
      </TestingLayout>
    );

    expect(screen.getByRole('list').childNodes).toHaveLength(
      DUMMY_CLUBS_LIST.length
    );

    DUMMY_CLUBS_LIST.forEach((club) => {
      const foundationDateText = club.foundationDate.toLocaleString('es', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
      });
      const card = screen.getByRole('article', { name: club.name });
      expect(within(card).getByText(club.name)).toBeInTheDocument();
      expect(
        within(card).getByText(`Fundado el ${foundationDateText}`)
      ).toBeInTheDocument();
      expect(
        within(card).getByAltText(`Escudo de ${club.name}`)
      ).toBeInTheDocument();

      const favoriteToggle: HTMLInputElement = within(card).getByRole(
        'checkbox',
        {
          name: 'Favorito',
        }
      );
      expect(favoriteToggle.checked).toBe(club.favorite);
    });
  });

  it('should show a message when there are no clubs in the catalog', async () => {
    render(
      <TestingLayout
        preloadClubsState={{
          clubs: [],
          total: 0,
        }}
      >
        <ClubList />
      </TestingLayout>
    );

    const noClubsMessage =
      'No se encontraron resultados para la busqueda que desea realizar. Intente de nuevo.';

    expect(screen.getByText(noClubsMessage)).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
