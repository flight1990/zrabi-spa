import {tagsApi} from "../../Api/modules/tagsApi.js";

const state = {
    tags: [],
    total: 0,
    currentTag: null,
    params: {
        page: 1,
        limit: 10
    }
}

const getters = {
    tags: state => state.tags,
    total: state => state.total,
    params: state => state.params
}

const mutations = {
    SET_TAGS(state, tags) {
        state.tags = tags;
    },
    SET_TOTAL(state, total) {
        state.total = total;
    },
    SET_PARAMS(state, params) {
        state.params = params;
    },
    SET_UPDATED_TAG(state, updatedTag) {
        state.tags = state.tags.map(tag =>
            tag.id === updatedTag.id ? updatedTag : tag
        );
    }
}

const actions = {
    async fetchTags({commit, state}, params) {
        if (params) commit('SET_PARAMS', params);

        const {data} = await tagsApi.getTags(state.params);

        commit('SET_TAGS', data.data);
        commit('SET_TOTAL', data.meta.total);
    },
    async createTag({dispatch, commit, state}, payload) {
        await tagsApi.createTag(payload);
        dispatch('fetchTags');
    },
    async updateTag({commit}, {payload, id}) {
        const {data} = await tagsApi.updateTag(payload, id);
        commit('SET_UPDATED_TAG', data.data);
    },
    async deleteTag({dispatch}, id) {
        await tagsApi.deleteTag(id);
        dispatch('fetchTags');
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}