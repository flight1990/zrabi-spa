import {axiosInstance} from "../index.js";

const uri = '/admin/tags';

export const tagsApi = {
    getTags(params) {
        return axiosInstance.get(uri, {params: params});
    },
    findTagById(id) {
        return axiosInstance.get(`${uri}/${id}`);
    },
    createTag(payload) {
        return axiosInstance.post(uri, payload);
    },
    updateTag(payload, id) {
        return axiosInstance.patch(`${uri}/${id}`, payload);
    },
    deleteTag(id) {
        return axiosInstance.delete(`${uri}/${id}`);
    }
}