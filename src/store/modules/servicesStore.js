import {servicesService} from "../../Api/services/servicesService.js";
import router from "../../router/index.js";

const state = {
    services: [],
    total: 0,
    currentService: null,
    params: {
        page: 1,
        limit: 10
    }
}

const getters = {
    services: state => state.services,
    currentService: state => state.currentService,
    total: state => state.total,
    params: state => state.params
}

const mutations = {
    SET_SERVICES(state, services) {
        state.services = services;
    },
    SET_TOTAL(state, total) {
        state.total = total;
    },
    SET_CURRENT_SERVICE(state, service) {
        state.currentService = service;
    },
    SET_PARAMS(state, params) {
        state.params = params;
    }
}

const actions = {
    async fetchServices({commit}, params) {
        if (params) commit('SET_PARAMS', params);

        const {data} = await servicesService.getServices(state.params);

        commit('SET_SERVICES', data.data);
        commit('SET_TOTAL', data.meta.total);
    },
    async fetchService({commit}, id) {
        const {data} = await servicesService.findServiceById(id);
        commit('SET_CURRENT_SERVICE', data.data);
    },
    async createService({commit}, payload) {
        await servicesService.createService(payload);
        await router.push({name: 'services.index'});
    },
    async updateService({commit}, {payload, id}) {
        await servicesService.updateService(payload, id);
        await router.push({name: 'services.index'});
    },
    async deleteService({dispatch}, id) {
        await servicesService.deleteService(id);
        dispatch('fetchServices');
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}