import { MovieListOrderNameType, MovieListSortNameType } from '../../types/moviesTypes';
import api from '../api/apiClient';

interface MovieListParams {
  queryKey: [
    string,
    {
      sort?: MovieListSortNameType,
      order?: MovieListOrderNameType,
      search?: string,
    }
  ];
}

interface MovieDetailsParams {
  queryKey: [string, {movieId: string}];
}

const getMoviesList = async ({queryKey: [, {order = 'DESC', ...restParams}]}: MovieListParams) => {
  return api
    .get('movies',{
      params: {
        limit: 100,
        offset: 0,
        order,
        ...restParams
      },
    })
    .then((response) => response.data.data);
};

const getMovieDetails = async ({queryKey: [, {movieId}]}: MovieDetailsParams) => {
  return api
    .get(`movies/${movieId}`)
    .then((response) => response.data.data);
};

export { getMoviesList, getMovieDetails };
