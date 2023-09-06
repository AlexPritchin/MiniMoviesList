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

const logInUser = async (params: LogInParams) => {
  return api
    .post('sessions', {
      ...params,
    })
    .then((response) => {
      console.log(response.data.token);
    });
};

const registerUser = async (params: RegisterParams) => {
  return api
    .post('users', {
      ...params,
    })
    .then((response) => {
      console.log(response.data.token);
    });
};

export { logInUser, registerUser };
