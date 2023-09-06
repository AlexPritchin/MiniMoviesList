import axios from 'axios';
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: 'http://192.168.0.100:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  function (response) {
    if (response.data.status !== 0)
      return response;

    Alert.alert('Error', 'Something went wrong');
    return Promise.reject(response);
  },
);

export default api;
