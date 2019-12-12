import firebase from 'firebase/app';

export default {
  state: {},
  actions: {
    async recordCreate({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUid');
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const result =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once('value')
          ).val() || {};
        return Object.keys(result).map(key => ({id: key, ...result[key]}));
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid');
        const result =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id)
              .once('value')
          ).val() || {};

        return {...result, id};
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
