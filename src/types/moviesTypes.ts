export type MovieFormatNameType = 'DVD' | 'VHS' | 'Blu-Ray';

export type MovieItem = {
  id: string;
  title: string;
  year: string;
  format: MovieFormatNameType;
};