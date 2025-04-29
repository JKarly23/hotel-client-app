import { AbstractService } from './abstractService';

export class RoomService extends AbstractService{
    constructor(){
        super(),
        this.secureUrl = '/api/rooms/'
    }
}