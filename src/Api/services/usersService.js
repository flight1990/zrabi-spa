import {axiosInstance} from "../index.js";

const uri = '/admin/users';

export const usersService = {
    getUsers(params) {
        return axiosInstance.get(uri, {params: params});
    },
    findUserById(id) {
        return axiosInstance.get(`${uri}/${id}`);
    },
    createUser(payload) {
        return axiosInstance.post(uri, payload);
    },
    updateUser(payload, id) {
        return axiosInstance.patch(`${uri}/${id}`, payload);
    },
    deleteUser(id) {
        return axiosInstance.delete(`${uri}/${id}`);
    }
}