import {categoriesService} from "../../Api/services/categoriesService.js";

const state = {
    categories: [],
    flattenedCategories: []
}

const getters = {
    categories: state => state.categories,
    flattenedCategories: state => state.flattenedCategories,
}

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_FLATTEN_CATEGORIES(state, {data, prefix = '-'}) {
        state.flattenedCategories = [];

        function flatten(data, prefix, flattenedData) {
            data.forEach(item => {
                flattenedData.push({id: item.id, title: prefix + ' ' + item.title});
                if (item.children && item.children.length > 0) {
                    flatten(item.children, prefix + '-', flattenedData);
                }
            });
        }

        flatten(data, prefix, state.flattenedCategories);
    }
}

const actions = {
    async fetchCategories({commit}) {
        const {data} = await categoriesService.getCategories();

        commit("SET_CATEGORIES", data.data);
        // commit("SET_FLATTEN_CATEGORIES", {data: data.data});
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