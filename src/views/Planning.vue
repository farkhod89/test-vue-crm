<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{bill | currencyFormat("USD")}}</h4>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="c in categories" :key="c.id">
        <p>
          <strong>{{c.title}}:</strong>
          {{c.spend | currencyFormat("USD")}} из {{c.limit | currencyFormat("USD")}}
        </p>
        <div class="progress" v-tooltip="{html: c.tooltip, position: 'top'}">
          <div
            class="determinate"
            :class="[c.progressColor]"

            :style="{width: c.processPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import currencyFormat from "../filters/currency.format";

  export default {
    name: "Planning",
    data: () => ({
      loading: true,
      categories: [],
      records: [],
    }),
    computed: {
      ...mapGetters(['info']),
      bill() {
        return this.info.bill;
      },
    },
    methods: {
      ...mapActions(['fetchCategories', "fetchRecords"]),
    },
    async mounted() {
      const categories = await this.fetchCategories();
      const records = await this.fetchRecords();

      this.categories = categories.map(c => {
        const spend = records
          .filter(r => r.categoryId === c.id)
          .filter(r => r.type === "outcome")
          .reduce((total, record) => {
            return total += +record.amount
          }, 0);

        const percent = (100 * spend / c.limit);
        const processPercent = percent > 100 ? 100 : percent;

        const progressColor = percent < 60
          ? "green"
          : percent < 100
            ? "yellow"
            : "red";

        const tooltipValue = c.limit - spend;
        const tooltip = `${tooltipValue < 0 ? 'Превышение на ' : 'Осталось '} ${currencyFormat(Math.abs(tooltipValue), "USD")}`;

        return {
          ...c,
          progressColor,
          processPercent,
          spend,
          tooltip,
        }
      });
      this.loading = false;
    },
  }
</script>

<style scoped>

</style>
