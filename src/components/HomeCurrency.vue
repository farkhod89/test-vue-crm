<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="cur" v-for="cur in currencies">
            <td>{{ cur }}</td>
            <td>{{ getCurrency(cur).toFixed(5) }}</td>
            <td>{{ date | date('date') }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeCurrency',
    props: ['rates', 'date'],
    data: () => ({
      currencies: ['USD', 'RUB', 'EUR', 'UZS'],
    }),
    methods: {
      getCurrency(currency) {
        return this.rates[currency] / this.rates['USD'];
      },
    },
  };
</script>

<style scoped></style>
