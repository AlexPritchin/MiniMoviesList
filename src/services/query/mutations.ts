import api from '../api/apiClient';

interface LogInParams {
  email: string;
  password: string;
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

export {logInUser};
