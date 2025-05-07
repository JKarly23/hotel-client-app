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
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config;
    }, error => {
      return Promise.reject(error);
    })

    this.axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      response => response,
      this.handleResponseError.bind(this) // important to keep the right context
    );
  }

  async handleResponseError(error) {
    const originalRequest = error.config;

    const refreshToken = localStorage.getItem('refresh_token');

    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = 'Bearer ' + token;
          return this.axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      this.isRefreshing = true;

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        this.processQueue(null, access_token);

        originalRequest.headers.Authorization = 'Bearer ' + access_token;
        return this.axiosInstance(originalRequest);
      } catch (err) {
        this.processQueue(err, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Aquí podrías redirigir al login si lo necesitas
        return Promise.reject(err);
      } finally {
        this.isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  get instance() {
    return this.axiosInstance;

  }

}
