<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link class="breadcrumb" to="/history">История</router-link>
        <a class="breadcrumb">
          {{ record.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div :class="[record.typeClass]" class="card">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currencyFormat('USD') }}</p>
              <p>Категория: {{ record.categoryTitle }}</p>
              <small>{{ record.date | date('date') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'DetailRecord',
    data: () => ({
      loading: true,
      record: null,
    }),
    computed: {
      id() {
        return this.$route.params.id;
      },
    },
    methods: {
      ...mapActions(['fetchRecordById', 'fetchCategoryById']),
    },
    async mounted() {
      const record = await this.fetchRecordById(this.id);

      if (!record) {
        await this.$router.push('/404');
        return;
      }
      const category = await this.fetchCategoryById(record.categoryId);
      this.record = {
        ...record,
        categoryTitle: category.title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      };
      this.loading = false;
    },
  };
</script>

<style scoped></style>
