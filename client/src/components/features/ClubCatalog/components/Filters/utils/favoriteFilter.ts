type FilterId = 'all' | 'favorites' | 'no_favorites';

export type FavoriteFilterType = {
  id: FilterId;
  label: string;
  setFilter: () => { filterFavorite?: boolean };
};

export const noFilter: FavoriteFilterType = {
  id: 'all',
  label: 'Todos',
  setFilter: () => ({}),
};

export const favoriteFilter: FavoriteFilterType = {
  id: 'favorites',
  label: 'Favoritos',
  setFilter: () => ({ filterFavorite: true }),
};

export const noFavoriteFilter: FavoriteFilterType = {
  id: 'no_favorites',
  label: 'No favoritos',
  setFilter: () => ({ filterFavorite: false }),
};
