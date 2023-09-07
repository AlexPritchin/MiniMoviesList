import { MovieItem } from "../types/moviesTypes";

const getMovieListItems = (data: any): MovieItem[] => {
  return (data as Array<any>).map<MovieItem>((dataItem) => {
    return {
      id: dataItem?.id,
      title: dataItem?.title,
      year: dataItem?.year,
      format: dataItem?.format,
    }
  });
};

export { getMovieListItems };