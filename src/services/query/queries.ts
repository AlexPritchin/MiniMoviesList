import api from '../api/apiClient';

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

export { getMoviesList };
