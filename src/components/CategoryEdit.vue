<template>
  <div class="col s12 m6">
    <div class="page-subtitle"><h4>Редактировать</h4></div>
    <form @submit.prevent="sendHandler">
      <div class="input-field">
        <select id="category" ref="select" v-model="inSelected">
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
      <div class="input-field">
        <input
          id="u-name"
          type="text"
          v-model="$v.title.$model"
          :class="{invalid: $v.title.$error}"
        >
        <label for="u-name">Название</label>
        <small
          class="helper-text invalid"
          v-if="(!$v.title.required && $v.title.$dirty)"
        >
          Данное поле обязательное
        </small>
      </div>
      <div class="input-field">
        <input id="u-limit" type="number"
               v-model.number="$v.limit.$model"
               :class="{invalid: $v.limit.$error}"
        >
        <label for="u-limit">Лимит</label>
        <small
          class="helper-text invalid"
          v-if="(!$v.limit.required && $v.limit.$dirty)"
        >
          Данное поле обязательное
        </small>
        <small
          class="helper-text invalid"
          v-else-if="(!$v.limit.minValue && $v.limit.$dirty)"
        >
          Минимальное значение {{ this.$v.limit.$params.minValue.min }}$
        </small>
      </div>
      <button class="btn waves-effect waves-light" type="submit">Обновить<i
        class="material-icons right">send</i></button>
    </form>
  </div>
</template>

<script>
  import {required, minValue} from "vuelidate/lib/validators"

  export default {
    name: "CategoryEdit",
    props: {
      categories: {
        type: Array,
        required: true,
        default: [],
      },
      selected: {
        default: "0"
      },
    },
    data: () => ({
      select: null,
      title: "",
      limit: 1,
      current: null,
    }),
    validations: {
      title: {required},
      limit: {required, minValue: minValue(1)},
    },
    computed: {
      inSelected: {
        get() {
          return this.selected;
        },
        set(value) {
          //console.log("change inSelect");
          this.current = value;
          //
          // const result = this.categories.find(c => c.id === value);
          // console.log(result);
          // if (result) {
          //   this.title = result.title;
          //   this.limit = result.limit;
          // } else {
          //   this.title = "00000000000000";
          //   this.limit = 1;
          // }
          //
          // M.updateTextFields();
          //M.FormSelect.updateSelect();
          //
          //
          //M.updateTextFields();
          // //this.current = value;
          // this.$emit("changeSelected", value);
        }
      },
    },

    watch: {
      current(value) {
        const {title, limit} = this.categories.find(c => c.id === value);
        this.title = title;
        this.limit = limit;
      },
      selected(value) {
        console.log(value);
      }
    },

    methods: {
      async sendHandler() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return false;
        }

        try {

          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
          };

          await this.$store.dispatch("categoryUpdate", categoryData);

          //this.title = "";
          //this.limit = 1;
          //this.$v.$reset();


          this.$message("Категория успешно обновлена");
          this.$emit("update", categoryData);

        } catch (e) {
          console.log(e)
        }
      }
    },
    created() {
      // this.current = this.selected;
      // const {id, title, limit} = this.categories.slice(-1)[0];
      const {id, title, limit} = this.categories.find(c => c.id === this.selected);
      this.current = id;
      this.title = title;
      this.limit = limit;
    },
    async mounted() {
      M.updateTextFields();
      this.select = M.FormSelect.init(this.$refs.select);
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy();
      }
    }
  }
</script>

<style scoped>

</style>
