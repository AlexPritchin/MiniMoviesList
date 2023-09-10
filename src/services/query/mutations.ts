import { MovieFormatNameType } from '../../types/moviesTypes';
import api from '../api/apiClient';

interface LogInParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface AddMovieParams {
  title: string;
  year: number;
  format: MovieFormatNameType;
  actors: string[];
}

interface DeleteMovieParams {
  movieId: string;
}

interface ImportMoviesParams {
  movieFormData: FormData;
}

const logInUser = async (params: LogInParams) => {
  return api
    .post('sessions', {
      ...params,
    })
    .then((response) => response.data);
};

const registerUser = async (params: RegisterParams) => {
  return api
    .post('users', {
      ...params,
    })
    .then((response) => response.data);
};

const addMovie = async (params: AddMovieParams) => {
  return api
    .post('movies', {
      ...params,
    })
    .then((response) => response.data);
};

const deleteMovie = async ({ movieId }: DeleteMovieParams) => {
  return api.delete(`movies/${movieId}`).then((response) => response.data);
};

const importMovies = async ({ movieFormData }: ImportMoviesParams) => {
  return api
    .post('movies/import', movieFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);
};

export { logInUser, registerUser, addMovie, deleteMovie, importMovies };
