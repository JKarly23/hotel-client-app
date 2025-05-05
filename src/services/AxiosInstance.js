import axios from 'axios';

export class AxiosInstance {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.axiosInstance.interceptors.request.use(config => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const { token } = user;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config;
    }, error => {
      return Promise.reject(error);
    })
  }

}
