import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1/api/v1',
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})