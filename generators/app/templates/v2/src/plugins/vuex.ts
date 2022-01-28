import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const vuexPersisted = createPersistedState({
    key: 'ewsedu',
    paths: ['user', 'accessToken', 'identity', 'activeIdentity', 'apps', 'wechatAuth', 'activeClass'],
    storage: {
        getItem: (key) => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem: (key) => uni.removeStorageSync(key)
    }
});

const state: StoreOptions<Plugin.Vuex.StoreRootState>['state'] = {
};
const getters: StoreOptions<Plugin.Vuex.StoreRootState>['getters'] = {
};
const mutations: StoreOptions<Plugin.Vuex.StoreRootState>['mutations'] = {
};
const actions: StoreOptions<Plugin.Vuex.StoreRootState>['actions'] = {
};

const store: StoreOptions<Plugin.Vuex.StoreRootState> = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [vuexPersisted]
});

export default store;
