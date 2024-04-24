import {axiosInstance} from "../index.js";

const uri = '/admin/categories';

export const categoriesApi = {
    getCategories() {
        return axiosInstance.get(uri);
    },
    findCategoryById(id) {
        return axiosInstance.get(`${uri}/${id}`);
    },
    createCategory(payload) {
        return axiosInstance.post(uri, payload);
    },
    updateCategory(payload, id) {
        return axiosInstance.patch(`${uri}/${id}`, payload);
    },
    deleteCategory(id) {
        return axiosInstance.delete(`${uri}/${id}`);
    },
    rebuildCategoriesTree(payload) {
        return axiosInstance.post(`${uri}/rebuild`, payload);
    }
}