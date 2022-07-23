export type FavoriteFilterType = {
  id: string;
  setFilter: () => { filterFavorite?: boolean };
};

export const noFilter: FavoriteFilterType = {
  id: 'all',
  setFilter: () => ({}),
};

export const favoriteFilter: FavoriteFilterType = {
  id: 'favorites',
  setFilter: () => ({ filterFavorite: true }),
};

export const noFavoriteFilter: FavoriteFilterType = {
  id: 'noFavorites',
  setFilter: () => ({ filterFavorite: false }),
};
