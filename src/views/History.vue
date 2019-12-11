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
        <HistoryTable :records="items"/>
        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
        />
      </section>
    </div>
  </div>
</template>

<script>
  import HistoryTable from "../components/HistoryTable";
  import {mapActions, mapGetters} from "vuex";
  import paginationMixin from "../mixins/pagination.mixin";

  export default {
    name: "History",
    data: () => ({
      loading: true,
      records: [],
    }),
    computed: {},
    mixins: [paginationMixin],
    methods: {
      ...mapActions(['fetchCategories', "fetchRecords"]),
    },
    async mounted() {
      const categories = await this.fetchCategories();
      this.records = await this.fetchRecords();

      const data = this.records.map(r => {
        return {
          ...r,
          categoryTitle: categories.find(c => c.id === r.categoryId).title,
          typeClass: r.type === "income" ? "green" : "red",
          typeText: r.type === "income" ? "Доход" : "Расход",
        };
      });

      this.setupPagination(data);
      this.loading = false;
    },
    components: {
      HistoryTable,
    }
  }
</script>

<style scoped>

</style>
