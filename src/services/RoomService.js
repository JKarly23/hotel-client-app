import { BasicService } from './BasicService';

export class RoomService extends BasicService {
  constructor() {
    super();
    this.secureUrl = '/room';
  }
}
