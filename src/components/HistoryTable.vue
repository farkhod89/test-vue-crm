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
    <tr :key="r.id" v-for="(r, idx) in records">
      <td>{{ ++idx }}</td>
      <td>{{ r.amount | currencyFormat('USD') }}</td>
      <td>{{ r.date | date('date') }}</td>
      <td>{{ r.categoryTitle }}</td>
      <td>
          <span :class="[r.typeClass]" class="white-text badge">{{
            r.typeText
          }}</span>
      </td>
      <td>
        <button
          @click="$router.push('/detail/' + r.id)"
          class="btn-small btn"
          v-tooltip="{html: 'Посмотреть запись', position: 'left'}"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'HistoryTable',
    props: {
      records: {
        required: true,
        type: Array,
      },
    },
  };
</script>

<style scoped></style>
