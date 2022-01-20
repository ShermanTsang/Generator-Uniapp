import Vue from 'vue';
import App from '/@/App.vue';
import Vuex from '/@plugins/vuex';
import ApiRequest from '/@plugins/api';
import Logger from '/@plugins/logger';
import Toast from '/@plugins/toast';
import Utility from '/@plugins/utility';
import Time from '/@plugins/time';
import '/@plugins/uView';
import '/@plugins/mixin';

Vue.config.productionTip = false;
Vue.prototype.$store = Vuex;
Vue.prototype.$api = ApiRequest;
Vue.prototype.$logger = Logger;
Vue.prototype.$toast = Toast;
Vue.prototype.$utility = Utility;
Vue.prototype.$time = Time;
// @ts-ignore
Vue.prototype.$uView = uni.$u;

new App().$mount();
