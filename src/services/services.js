/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';    

axios.interceptors.request.use((response) => {
    // Do something with response data
    return response;
  },
  error => {
    if (error.response.status === 401) {     
      const requestConfig = error.config;
      return axios(requestConfig);
    }
    return Promise.reject(error);
  }
);

export default {
  get: axios.get
};