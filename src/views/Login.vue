<template>
  <form class="card auth-card" @submit.prevent="sendHandler">
    <div class="card-content"><span class="card-title">Домашняя бухгалтерия</span>
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
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>
<script>
  import {email, required, minLength} from 'vuelidate/lib/validators'
  import messages from "../utils/messages";

  export default {
    name: "Login",
    data: () => ({
      email: "",
      password: "",
    }),
    mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message]);
      }
    },
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)},
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
        };

        this.$store.dispatch('login', formData)
          .then(() => this.$router.push("/"))
          .catch(e => e);
      },
    }
  }
</script>
<style scoped>

</style>
