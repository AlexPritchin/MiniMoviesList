import api from '../api/apiClient';

interface MovieDetailsParams {
  queryKey: [string, {movieId: string}];
}

const getMoviesList = async () => {
  return api
    .get('movies',{
      params: {
        limit: 100,
        offset: 0,
        order: 'DESC',
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
