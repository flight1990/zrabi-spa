import {pagesApi} from "../../Api/modules/pagesApi.js";
import router from "../../router/index.js";

const state = {
    pages: [],
    total: 0,
    currentPage: null,
    params: {
        page: 1,
        limit: 10
    }
}

const getters = {
    pages: state => state.pages,
    currentPage: state => state.currentPage,
    total: state => state.total,
    params: state => state.params
}

const mutations = {
    SET_PAGES(state, pages) {
        state.pages = pages;
    },
    SET_TOTAL(state, total) {
        state.total = total;
    },
    SET_CURRENT_PAGE(state, page) {
        state.currentPage = page;
    },
    SET_PARAMS(state, params) {
        state.params = params;
    }
}

const actions = {
    async fetchPages({commit}, params) {
        if (params) commit('SET_PARAMS', params);

        const {data} = await pagesApi.getPages();

        commit('SET_PAGES', data.data);
        commit('SET_TOTAL', data.meta.total);
    },
    async fetchPage({commit}, id) {
        const {data} = await pagesApi.findPageById(id);
        commit('SET_CURRENT_PAGE', data.data);
    },
    async createPage({commit}, payload) {
        await pagesApi.createPage(payload);
        await router.push({name: 'pages.index'});
    },
    async updatePage({commit}, {payload, id}) {
        await pagesApi.updatePage(payload, id);
        await router.push({name: 'pages.index'});
    },
    async deletePage({dispatch}, id) {
        await pagesApi.deletePage(id);
        dispatch('fetchPages');
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}