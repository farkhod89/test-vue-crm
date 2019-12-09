import firebase from "firebase/app";

import Vue from 'vue';
// import VueLocalStorage from 'vue-localstorage';
// Vue.use(VueLocalStorage);

export default {
  state: {
    info: {},
  },
  mutations: {
    async setInfo(state, info) {
      state.info = info;
      Vue.localStorage.set("info", JSON.stringify(info));
    },
    clearInfo(state) {
      state.info = {};
      Vue.localStorage.remove("info");
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch("getUid");
        const info = (await firebase.database().ref(`/users/${uid}/info`).once("value")).val();
        commit("setInfo", info);
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    info: (state) => {
      if (Vue.localStorage.get("info")) {
        return JSON.parse(Vue.localStorage.get("info"));
      }
      return state.info
    },
  },
  // watch: {
  //   info(newInfo) {
  //     console.log(localStorage);
  //     //console.log(state.info);
  //   }
  // }
}
