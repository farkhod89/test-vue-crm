import firebase from "firebase/app";

export default {
  state: {},
  actions: {
    async categoryCreate({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch("getUid");
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit});

        return {title, limit, id: category.key};
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async categoryUpdate({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch("getUid");
        await firebase.database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({title, limit});
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategories({dispatch, commit}) {
      try {
        const uid = await dispatch("getUid");
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once("value")).val() || {};

        /*const result = [];
        Object.keys(categories).forEach(key => {
          result.push({
            id: key,
            title: categories[key].title,
            limit: categories[key].limit,
          });
        });
        return result;*/

        return Object.keys(categories).map(key => ({id: key, ...categories[key]}))
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  },
  mutations: {},
  getters: {}
}
