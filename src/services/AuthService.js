import { AxiosInstance } from './AxiosInstance';

export class AuthService extends AxiosInstance {
  constructor() {
    super();
    this.secureUrl = '/auth';
  }

  async login(payload) {
    const { data } = await this.axiosInstance.post(`${this.secureUrl}/login`, payload);
    return data;
  }

  async register(payload) {
    const { data } = await this.axiosInstance.post(`${this.secureUrl}/register`, payload);
    return data;
  }

  async logout() {
    const { data } = await this.axiosInstance.post(`${this.secureUrl}/logout`);
    return data;
  }
}
