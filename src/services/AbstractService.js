import axios from 'axios';

export class AbstractService {


    constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    async findALl() {
        const { data } = await this.axiosInstance.get(this.secureUrl);
        return data
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