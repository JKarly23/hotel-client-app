import { BasicService } from './BasicService';

export class RoomService extends BasicService {
  constructor() {
    super();
    this.secureUrl = '/room';
  }
  async getRoomAvailable() {
    const { data } = await this.axiosInstance.get(`${this.secureUrl}/available`);
    return data;
  }
}
