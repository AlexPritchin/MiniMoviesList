export type MovieFormatNameType = 'DVD' | 'VHS' | 'Blu-ray';

export type MovieItem = {
  id: string;
  title: string;
  year: string;
  format: MovieFormatNameType;
};