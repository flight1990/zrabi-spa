import {axiosInstance} from "../index.js";

const uri = '/admin/services';

export const servicesService = {
    getServices(params) {
        return axiosInstance.get(uri, {params: params});
    },
    findServiceById(id) {
        return axiosInstance.get(`${uri}/${id}`);
    },
    createService(payload) {
        return axiosInstance.post(uri, payload);
    },
    updateService(payload, id) {
        return axiosInstance.patch(`${uri}/${id}`, payload);
    },
    deleteService(id) {
        return axiosInstance.delete(`${uri}/${id}`);
    }
}