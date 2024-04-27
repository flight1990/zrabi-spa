import {categoriesApi} from "../../Api/modules/categoriesApi.js";

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
        const {data} = await categoriesApi.getCategories();
        commit("SET_CATEGORIES", data.data);
    },
    async createCategory({dispatch, commit, state}, payload) {
        await categoriesApi.createCategory(payload);
        dispatch("fetchCategories");
    },
    async updateCategory({dispatch}, {payload, id}) {
        await categoriesApi.updateCategory(payload, id);
        dispatch("fetchCategories");
    },
    async deleteCategory({dispatch}, id) {
        await categoriesApi.deleteCategory(id);
        dispatch("fetchCategories");
    },
    async rebuildCategoriesTree({dispatch}, payload) {
        await categoriesApi.rebuildCategoriesTree(payload);
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