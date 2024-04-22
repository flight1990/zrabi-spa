import { createStore } from "vuex";
import usersStore from "./modules/usersStore.js";
import pagesStore from "./modules/pagesStore.js";
import tagsStore from "./modules/tagsStore.js";

export default createStore({
    modules: {
        usersStore,
        pagesStore,
        tagsStore
    },
});