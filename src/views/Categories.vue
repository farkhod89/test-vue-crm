<template>
  <div>
    <div class="page-title"><h3>Категории</h3></div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>

        <CategoryEdit
          :key="categories.length + updateCount + selected"
          :selected="selected"
          @update="updateCategory"
          v-bind:categories="categories"
          v-if="categories.length"
        />
        <p v-else class="center">No categories has</p>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '../components/CategoryCreate';
  import CategoryEdit from '../components/CategoryEdit';

  export default {
    name: 'Categories',
    data: () => ({
      categories: [],
      loading: true,
      updateCount: 0,
      changeSelect: null,
      //selected: null,
    }),

    computed: {
      selected: {
        get() {
          if (!this.changeSelect) {
            return this.categories.slice(-1)[0].id;
          } else {
            return this.changeSelect;
          }
        },
        set(val) {
          return (this.changeSelect = val);
        },
      },
    },

    components: {
      CategoryCreate,
      CategoryEdit,
    },
    methods: {
      addNewCategory(category) {
        this.categories.push(category);
        this.updateSelected(category.id);
      },
      updateSelected(value) {
        this.updateCount++;
        this.selected = value;
      },
      updateCategory(category) {
        const idx = this.categories.findIndex(c => c.id === category.id);
        this.categories[idx].title = category.title;
        this.categories[idx].limit = category.limit;
        this.updateSelected(category.id);
      },
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    },
  };
</script>

<style scoped></style>
