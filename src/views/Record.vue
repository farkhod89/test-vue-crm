<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading"/>
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" id="category" v-model="category">
          <option value="-" selected disabled>Выберите категорию</option>
          <option
            v-for="c of categories"
            :value="c.id"
            :key="c.id"
          >{{c.title}}
          </option>
        </select>
        <label for="category">Выберите категорию</label>
      </div>

      <div>
        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
            />
            <span>Доход</span>
          </label>
        </p>
        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
            />
            <span>Расход</span>
          </label>
        </p>
      </div>
      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="$v.amount.$model"
          :class="{invalid: $v.amount.$error}"
        >
        <label for="amount">Сумма</label>
        <small
          class="helper-text invalid"
          v-if="(!$v.amount.required && $v.amount.$dirty)"
        >
          Данное поле обязательное
        </small>
        <small
          class="helper-text invalid"
          v-else-if="(!$v.amount.minValue && $v.amount.$dirty)"
        >
          Минимальное значение {{ this.$v.amount.$params.minValue.min }}$
        </small>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="$v.description.$model"
          :class="{invalid: $v.description.$error}"
        >
        <label for="description">Описание</label>
        <small
          class="helper-text invalid"
          v-if="(!$v.description.required && $v.description.$dirty)"
        >
          Данное поле обязательное
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {required, minValue} from "vuelidate/lib/validators"
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: "Record",
    data: () => ({
      loading: true,
      select: null,
      categories: [],

      category: null,
      type: "income",
      amount: null,
      description: null,
    }),
    computed: {
      ...mapGetters(['info']),
      canCreateRecord() {
        if ("income" === this.type) {
          return true;
        }
        return this.bill >= this.amount;
      },
      bill() {
        return this.info.bill;
      },
    },
    validations: {
      category: {required},
      type: {required},
      amount: {required, minValue: minValue(1)},
      description: {required},
    },
    async mounted() {
      this.categories = await this.$store.dispatch("fetchCategories");
      this.loading = false;

      if (this.categories.length) {
        this.category = this.categories[0].id;
      }

      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select);
      }, 0);
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy();
      }
    },
    methods: {
      ...mapActions(["recordCreate"]),
      async submitHandler() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return false;
        }

        if (!this.canCreateRecord) {
          this.$error(`Недостаточно денег на счету (${(this.amount - this.bill)})`);
          return false;
        }

        try {
          await this.recordCreate({
            categoryId: this.category,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON(),
          });

          const bill = this.type === "income"
            ? this.bill + this.amount
            : this.bill - this.amount;

          await this.$store.dispatch("infoUpdate", {bill});
          this.$message("Запись успешно создана");


          this.$v.$reset();
          this.amount = null;
          this.description = null;

        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>
