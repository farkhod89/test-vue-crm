import firebase from 'firebase/app';

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
      Vue.localStorage.set('info', JSON.stringify(info));
    },
    clearInfo(state) {
      state.info = {};
      Vue.localStorage.remove('info');
    },
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once('value')
        ).val();
        commit('setInfo', info);
      } catch (e) {
        commit('setError', e);
        console.log(e);
      }
    },

    async infoUpdate({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid');

        const updateData = {...getters.info, ...toUpdate};

        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updateData);

        commit('setInfo', updateData);
      } catch (e) {
        commit('setError', e);
        console.log(e);
      }
    },
  },
  getters: {
    info: state => {
      // console.log(Vue.localStorage.get("info"))
      // if (Vue.localStorage.get("info")) {
      //   return JSON.parse(Vue.localStorage.get("info"));
      // }
      return state.info;
    },
  },
  // watch: {
  //   info(newInfo) {
  //     console.log(localStorage);
  //     //console.log(state.info);
  //   }
  // }
};
