<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates"/>
      <HomeCurrency :date="currency.date" :rates="currency.rates"/>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue'
  import HomeBill from '../components/HomeBill';
  import HomeCurrency from '../components/HomeCurrency';

  export default {
    name: 'home',
    data: () => ({
      loading: true,
      currency: {},
    }),
    async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
    components: {
      HomeBill,
      HomeCurrency,
    },
    methods: {
      async refresh() {
        this.loading = true;

        setTimeout(() => {
          this.loading = false;
        }, 2000);

        //await new Promise(resolve => setTimeout(resolve, 2000));
      },
    },
  };
</script>
