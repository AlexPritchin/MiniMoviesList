import { MovieItem, MovieDetails } from "../types/moviesTypes";

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

const getMovieDetailsItem = (data: any): MovieDetails => {
  const actorsNames = (data?.actors as any[]).map(actorData => actorData.name);

  return {
    id: data?.id,
    title: data?.title,
    year: data?.year,
    format: data?.format,
    actors: actorsNames
  };
};

export { getMovieListItems, getMovieDetailsItem };