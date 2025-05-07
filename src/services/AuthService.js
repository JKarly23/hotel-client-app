import { BasicService } from './BasicService';

export class AuthService extends BasicService {
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

  async logout(id) {
    const { data } = await this.axiosInstance.post(`${this.secureUrl}/logout/${id}`);
    return data;
  }


}
