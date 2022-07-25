type FilterId = 'all' | 'favorites' | 'no_favorites';

export type FavoriteFilterType = {
  id: FilterId;
  label: string;
  filterFavorite?: boolean;
};

export const noFilter: FavoriteFilterType = {
  id: 'all',
  label: 'Todos',
};

export const favoriteFilter: FavoriteFilterType = {
  id: 'favorites',
  label: 'Favoritos',
  filterFavorite: true,
};

export const noFavoriteFilter: FavoriteFilterType = {
  id: 'no_favorites',
  label: 'No favoritos',
  filterFavorite: false,
};
