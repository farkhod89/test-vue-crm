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
        <canvas ref="canvas" />
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
  import HistoryTable from '../components/HistoryTable';
  import {mapActions} from 'vuex';
  import paginationMixin from '../mixins/pagination.mixin';
  import {Pie} from 'vue-chartjs';

  export default {
    name: 'History',
    data: () => ({
      loading: true,
      categories: [],
      records: [],
    }),
    computed: {},
    extends: Pie,
    mixins: [paginationMixin],
    methods: {
      ...mapActions(['fetchCategories', 'fetchRecords']),
      async initData() {
        this.categories = await this.fetchCategories();
        this.records = await this.fetchRecords();
      },
      async initPagination() {
        const data = this.records.map(r => {
          return {
            ...r,
            categoryTitle: this.categories.find(c => c.id === r.categoryId).title,
            typeClass: r.type === 'income' ? 'green' : 'red',
            typeText: r.type === 'income' ? 'Доход' : 'Расход',
          };
        });
        this.setupPagination(data);
      },
      async initChart() {
        const data = {
          labels: this.categories.map(c => c.title),
          datasets: [
            {
              label: 'Расходы по категориям',
              data: this.categories.map(c => {
                return this.records.reduce((total, r) => {
                  if (r.categoryId === c.id && r.type === 'outcome') {
                    total += +r.amount;
                  }

                  return total;
                }, 0);
              }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        this.renderChart(data);
      },
    },

    async mounted() {
      await this.initData();
      this.loading = false;
      await this.initPagination();
      await this.initChart();
    },
    components: {
      HistoryTable,
    },
  };
</script>

<style scoped></style>
