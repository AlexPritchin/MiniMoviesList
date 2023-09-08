export type MovieFormatNameType = 'DVD' | 'VHS' | 'Blu-Ray';
export type MovieListSortNameType = 'id' | 'title' | 'year';
export type MovieListOrderNameType = 'ASC' | 'DESC';

export type MovieItem = {
  id: string;
  title: string;
  year: string;
  format: MovieFormatNameType;
};

export type MovieDetails = {
  id: string;
  title: string;
  year: string;
  format: MovieFormatNameType;
  actors: string[];
};
