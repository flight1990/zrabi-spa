import {axiosInstance} from "../index.js";

const uri = '/admin/pages';

export const pagesApi = {
    getPages() {
        return axiosInstance.get(uri);
    },
    findPageById(id) {
        return axiosInstance.get(`${uri}/${id}`);
    },
    createPage(payload) {
        return axiosInstance.post(uri, payload);
    },
    updatePage(payload, id) {
        return axiosInstance.patch(`${uri}/${id}`, payload);
    },
    deletePage(id) {
        return axiosInstance.delete(`${uri}/${id}`);
    }
}