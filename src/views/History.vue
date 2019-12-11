<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      Записей пока нет.
      <router-link to="/record">Добавьте первую</router-link>
    </p>

    <div v-else>
      <div class="history-chart">
        <canvas></canvas>
      </div>
      <section>
        <HistoryTable :records="records"/>
      </section>
    </div>
  </div>
</template>

<script>
  import HistoryTable from "../components/HistoryTable";
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "History",
    data: () => ({
      loading: true,
      categories: [],
      records: [],
    }),
    computed: {},
    methods: {
      ...mapActions(['fetchCategories', "fetchRecords"]),
    },
    async mounted() {
      const categories = await this.fetchCategories();
      const records = await this.fetchRecords();

      this.records = records.map(r => {
        return {
          ...r,
          categoryTitle: categories.find(c => c.id === r.categoryId).title,
          typeClass: r.type === "income" ? "green" : "red",
          typeText: r.type === "income" ? "Доход" : "Расход",

        };
      });
      this.categories = categories;

      this.loading = false;
    },
    components: {
      HistoryTable,
    }
  }
</script>

<style scoped>

</style>
