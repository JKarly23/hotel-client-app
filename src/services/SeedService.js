import { AxiosInstance } from "./AxiosInstance";

export class SeedService extends AxiosInstance {
    constructor() {
        super();
        this.secureUrl = 'seed'
    }
    async runSeed(){
        const {data} = await this.axiosInstance.get(`${this.secureUrl}/rooms`);
        return data
    }
}