import axios from 'axios';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'http://192.168.0.100:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async function (config) {
    if (config.url === 'movies') {
      const token = await SecureStore.getItemAsync('token');
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    if (response.data.status !== 0) {
      if (response.data.token)
        SecureStore.setItemAsync('token', response.data.token);
      return response;
    }

    Alert.alert('Error', 'Something went wrong');
    return Promise.reject(response);
  },
);

export default api;
