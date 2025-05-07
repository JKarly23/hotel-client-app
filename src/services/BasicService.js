import { AxiosInstance } from './AxiosInstance';

export class BasicService extends AxiosInstance {
  constructor() {
    super();
  }

  async findAll(query = '') {
    const { data } = await this.axiosInstance.get(`${this.secureUrl}/${query}`);
    return data;
  }

  async findAllData() {
    const { data } = await this.axiosInstance.get(`${this.secureUrl}/all`);
    return data;
  }

  async findById(id) {
    const { data } = await this.axiosInstance.get(`${this.secureUrl}/${id}`);
    return data;
  }

  async create(payload) {
    const { data } = await this.axiosInstance.post(this.secureUrl, payload);
    return data;
  }

  async update(id, payload) {
    const { data } = await this.axiosInstance.patch(`${this.secureUrl}/${id}`, payload);
    return data;
  }

  async delete(id) {
    await this.axiosInstance.delete(`${this.secureUrl}/${id}`);
  }
}
