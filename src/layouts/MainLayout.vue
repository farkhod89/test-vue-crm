<template>
  <div class="app-main-layout">
    <Navbar @navbarClick="isOpen = !isOpen"/>
    <Sidebar v-model="isOpen"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div
      class="fixed-action-btn"
      v-tooltip="{html: 'Добавить новую запись', position: 'left'}"
    >
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Navbar from '../components/app/Navbar';
  import Sidebar from '../components/app/Sidebar';
  import messages from '../utils/messages';

  export default {
    name: 'MainLayout',
    data: () => ({
      isOpen: true,
    }),
    computed: {
      error() {
        return this.$store.getters.error;
      },
    },
    watch: {
      error(fbError) {
        console.log(fbError);
        this.$error(messages[fbError.code] || messages['default']);
      },
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo');
      }

      //Vue.localStorage.get("info")
      //console.log(this.$localStorage.get("info"));

      // const localInfo = this.$localStorage.get("info");
      // if (!Object.keys(localInfo).length) {
      //   console.log("!")
      //   await this.$store.dispatch("fetchInfo");
      // } else {
      //   // console.log("3")
      //   // console.log(JSON.parse(localInfo));
      //   //this.$store.commit("setInfo", localInfo)
      // }
    },
    components: {
      Navbar,
      Sidebar,
    },
  };
</script>

<style scoped></style>
