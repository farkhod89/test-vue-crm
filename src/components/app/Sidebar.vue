<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :exact="link.exact"
      :to="link.url"
      active-class="active"
      tag="li"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: 'Sidebar',
    props: ['value'],
    data: () => ({
      links: [
        {title: 'Счет', url: '/', exact: true},
        {title: 'История', url: '/history'},
        {title: 'Планирование', url: '/planning'},
        {title: 'Новая запись', url: '/record'},
        {title: 'Категории', url: '/categories'},
      ],
    }),
  };
</script>

<style scoped></style>
