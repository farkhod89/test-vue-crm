import Vue from 'vue';
import Vuelidate from "vuelidate";
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import dateFilter from "./filters/date.filter";
import messagePlugin from "./utils/message.plugin";
import "materialize-css/dist/js/materialize.min";

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.use(messagePlugin);

firebase.initializeApp({
  apiKey: "AIzaSyAE5MJ4TUPIgTfRypS0s3nHhivzC5kZu0Y",
  authDomain: "fir-vue-crm.firebaseapp.com",
  databaseURL: "https://fir-vue-crm.firebaseio.com",
  projectId: "fir-vue-crm",
  storageBucket: "fir-vue-crm.appspot.com",
  messagingSenderId: "118412859421",
  appId: "1:118412859421:web:951f4048419ee6c85d0ef4",
  measurementId: "G-8JSX2CRXJC"
});

let app = null;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
























