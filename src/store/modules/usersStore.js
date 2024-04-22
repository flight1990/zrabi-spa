import {usersApi} from "../../Api/modules/usersApi.js";
import router from "../../router/index.js";

const state = {
    users: [],
    total: 0,
    currentUser: null,
    params: {
        page: 1,
        limit: 10
    }
}

const getters = {
    users: state => state.users,
    currentUser: state => state.currentUser,
    total: state => state.total,
    params: state => state.params
}

const mutations = {
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_TOTAL(state, total) {
        state.total = total;
    },
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
    },
    SET_PARAMS(state, params) {
        state.params = params;
    }
}

const actions = {
    async fetchUsers({commit, state}, params) {
        if (params) commit('SET_PARAMS', params);

        const {data} = await usersApi.getUsers(state.params);

        commit('SET_USERS', data.data);
        commit('SET_TOTAL', data.meta.total);
    },
    async fetchUser({commit}, id) {
        const {data} = await usersApi.findUserById(id);
        commit('SET_CURRENT_USER', data.data);
    },
    async createUser({commit}, payload) {
        await usersApi.createUser(payload);
        await router.push({name: 'users.index'});
    },
    async updateUser({commit}, {payload, id}) {
        await usersApi.updateUser(payload, id);
        await router.push({name: 'users.index'});
    },
    async deleteUser({dispatch}, id) {
        await usersApi.deleteUser(id);
        dispatch('fetchUsers');
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}