import api from '../api/apiClient';
import { MovieListOrderNameType, MovieListSortNameType } from '../../types/moviesTypes';
import { getMovieListItems } from '../../helpers/moviesHelpers';

const moviesPerPage = 10;

interface MovieListParams {
  queryKey: [
    string,
    {
      sort?: MovieListSortNameType,
      order?: MovieListOrderNameType,
      search?: string,
    }
  ];
  pageParam?: number;
}

interface MovieDetailsParams {
  queryKey: [string, {movieId: string}];
}

interface MovieSearchListParams {
  queryKey: [
    string,
    {
      search?: string,
    }
  ];
}


const getMoviesList = async ({queryKey: [, {order = 'DESC', ...restParams}], pageParam = 0}: MovieListParams) => {
  return api
    .get('movies',{
      params: {
        limit: moviesPerPage,
        offset: pageParam * moviesPerPage,
        order,
        ...restParams
      },
    })
    .then((response) => {
      return {
        movies: getMovieListItems(response.data.data),
        total: response.data.meta.total,
      };
    });
};

const getMovieDetails = async ({queryKey: [, {movieId}]}: MovieDetailsParams) => {
  return api
    .get(`movies/${movieId}`)
    .then((response) => response.data.data);
};

const getMoviesSearchList = async ({queryKey: [, {search}]}: MovieSearchListParams) => {
  return api
    .get('movies',{
      params: {
        limit: 100,
        offset: 0,
        order: 'DESC',
        search,
      },
    })
    .then((response) => response.data.data);
};


export { getMoviesList, getMovieDetails, getMoviesSearchList, moviesPerPage };
