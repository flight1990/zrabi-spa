import {categoriesService} from "../../Api/services/categoriesService.js";

const state = {
    categories: []
}

const getters = {
    categories: state => state.categories,
}

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    }
}

const actions = {
    async fetchCategories({commit}) {
        const {data} = await categoriesService.getCategories();
        commit("SET_CATEGORIES", data.data);
    },
    async createCategory({dispatch, commit, state}, payload) {
        await categoriesService.createCategory(payload);
        dispatch("fetchCategories");
    },
    async updateCategory({dispatch}, {payload, id}) {
        await categoriesService.updateCategory(payload, id);
        dispatch("fetchCategories");
    },
    async deleteCategory({dispatch}, id) {
        await categoriesService.deleteCategory(id);
        dispatch("fetchCategories");
    },
    async rebuildCategoriesTree({dispatch}, payload) {
        await categoriesService.rebuildCategoriesTree(payload);
        dispatch("fetchCategories");
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}