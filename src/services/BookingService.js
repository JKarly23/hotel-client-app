import { BasicService } from "./BasicService";

export class BookingService extends BasicService {
    constructor() {
        super()
        this.secureUrl = '/booking'
    }
    async checkIn() {
        const { data } = await this.axiosInstance.patch(`${this.secureUrl}/${id}`);
        return data;
    }

    async checkOut() {
        const { data } = await this.axiosInstance.patch(`${this.secureUrl}/${id}`);
        return data;
    }
}