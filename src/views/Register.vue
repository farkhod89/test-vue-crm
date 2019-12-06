<template>
  <form class="card auth-card" @submit.prevent="sendHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email"
               type="text"
               v-model.trim="$v.email.$model"
               :class="{invalid: $v.email.$error}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
               v-if="(!$v.email.required && $v.email.$dirty)"
        >
          Данное поле обязательное
        </small>
        <small class="helper-text invalid"
               v-else-if="(!$v.email.email && $v.email.$dirty)"
        >
          Введите корректный Email
        </small>
      </div>
      <div class="input-field">
        <input id="password" type="password"
               v-model.trim="$v.password.$model"
               :class="{invalid: $v.password.$error}">
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="(!$v.password.required && $v.password.$dirty)"
        >
          Данное поле обязательное
        </small>
        <small
          class="helper-text invalid"
          v-else-if="(!$v.password.minLength && $v.password.$dirty)"
        >
          Минимальное значение поля 6 симв.
        </small>
      </div>

      <div class="input-field">
        <input id="name"
               type="text"
               v-model.trim="$v.name.$model"
               :class="{invalid: $v.name.$error}"
        >

        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="(!$v.name.required && $v.name.$dirty)"
        >
          Данное поле обязательное
        </small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="$v.agree.$model"
            :class="{invalid: $v.agree.$error}"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, minLength, required} from "vuelidate/lib/validators";
  export default {
    name: "Register",
    data: () => ({
      email: "",
      password: "",
      name: "",
      agree: false,
    }),
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)},
      name: {required},
      agree: {checked: v => v}
    },
    methods: {
      async sendHandler() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return false;
        }

        const formData = {
          email: this.email,
          password: this.password,
          name: this.name,
        };

        // отправка запроса
        this.$store.dispatch('register', formData)
          .then(() => this.$router.push("/"))
          .catch(e => e);
      },
    }
  }
</script>

<style scoped>

</style>



















