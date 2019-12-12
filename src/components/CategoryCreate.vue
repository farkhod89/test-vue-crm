<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle"><h4>Создать</h4></div>
      <form @submit.prevent="sendHandler">
        <div class="input-field">
          <input
            id="c-name"
            type="text"
            v-model="$v.title.$model"
            :class="{invalid: $v.title.$error}"
          />
          <label for="c-name">Название</label>
          <small
            class="helper-text invalid"
            v-if="!$v.title.required && $v.title.$dirty"
          >
            Данное поле обязательное
          </small>
        </div>
        <div class="input-field">
          <input
            :class="{invalid: $v.limit.$error}"
            id="c-limit"
            type="number"
            v-model.number="$v.limit.$model"
          />
          <label for="c-limit">Лимит</label>
          <small
            class="helper-text invalid"
            v-if="!$v.limit.required && $v.limit.$dirty"
          >
            Данное поле обязательное
          </small>
          <small
            class="helper-text invalid"
            v-else-if="!$v.limit.minValue && $v.limit.$dirty"
          >
            Минимальное значение {{ this.$v.limit.$params.minValue.min }} $
          </small>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Создать<i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {minValue, required} from 'vuelidate/lib/validators';

  import {mapActions} from 'vuex';

  export default {
    name: 'CategoryCreate',
    data: () => ({
      title: '',
      limit: 1,
    }),
    validations: {
      title: {required},
      limit: {required, minValue: minValue(1)},
    },
    methods: {
      ...mapActions(['categoryCreate']),
      async sendHandler() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return false;
        }

        try {
          const newCategory = {
            title: this.title,
            limit: this.limit,
          };

          //await this.categoryCreate(newCategory);

          const category = await this.$store.dispatch(
            'categoryCreate',
            newCategory,
          );

          this.title = '';
          this.limit = 1;
          this.$v.$reset();
          this.$message('Категория успешно добавлена');

          this.$emit('created', category);
        } catch (e) {
          console.log(e);
        }
      },
    },
    mounted() {
      M.updateTextFields();
    },
  };
</script>

<style scoped></style>
