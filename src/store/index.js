import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import info from "./info";
import currency from "./currency";
import category from "./category";

Vue.use(Vuex);
// Vue.use(VueLocalStorage, {
//   name: 'ls',
//   bind: true //created computed members from your variable declarations
// });

export default new Vuex.Store({
  state: {
    error: null,
    //ls: VueLocalStorage,
  },
  mutations: {
    setError(state, error) {
      //debugger
      state.error = error;
    },
    clearError: state => state.error = null,
  },
  getters: {
    error: state => state.error,
  },
  actions: {},
  modules: {
    auth, info, currency, category
  }
})
