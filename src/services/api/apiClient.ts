import axios from 'axios';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'http://rn.test.webbylab.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async function (config) {
    if (config.url?.includes('movies')) {
      const token = await SecureStore.getItemAsync('token');
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
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
  function (error) {
    if (!error.status && error.message === 'Network Error') {
      Alert.alert('Network error', 'Server is unavailable now. Please try again later.');
    } else {
      Alert.alert('Error', 'Something went wrong');
    }

    return Promise.reject(error);
  },
);

export default api;
