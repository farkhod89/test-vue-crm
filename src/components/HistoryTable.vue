<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(r, idx) in records" :key="r.id">
      <td>{{++idx}}</td>
      <td>{{r.amount | currencyFormat("USD")}}</td>
      <td>{{r.date | date("date") }}</td>
      <td>{{r.categoryTitle}}</td>
      <td>
        <span class="white-text badge" :class="[r.typeClass]">{{r.typeText}}</span>
      </td>
      <td>
        <button
          v-tooltip="{html: 'Посмотреть запись', position: 'left'}"
          class="btn-small btn"
          @click="$router.push('/detail/' + r.id)"
        ><i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "HistoryTable",
    props: {
      records: {
        required: true,
        type: Array,
      },
    },
  }
</script>

<style scoped>

</style>
