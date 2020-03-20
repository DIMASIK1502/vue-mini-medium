<template>
  <div class="login-page">
    <div class="login-form">
      <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
      <b-field class="form-input" label="Email">
        <b-input v-model="email"> </b-input>
      </b-field>

      <b-field class="form-input" label="Password">
        <b-input v-model="password" type="password"></b-input>
      </b-field>

      <b-field class="form-input">
        <button size="is-large" @click="handleClick" class="button is-primary">
          Войти
        </button>
      </b-field>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false
    };
  },
  computed: {
    ...mapState({ authError: state => state.user.error })
  },
  methods: {
    ...mapActions("user",["userAuth"]),
    async handleClick() {
      if (this.email.length && this.password.length) {
        this.isLoading = true;
        await this.userAuth({
          email: this.email,
          password: this.password
        });
        this.isLoading = false;
        if (this.authError) {
          this.$buefy.toast.open({
            duration: 3000,
            message: this.authError,
            position: "is-bottom",
            type: "is-danger"
          });
        } else {
          this.$router.replace("/");
        }
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: "Все поля должны быть заполенены",
          position: "is-bottom",
          type: "is-danger"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  padding-top: 64px;
  .login-form {
    position: relative;
    background-color: white;
    max-width: 500px;
    width: 100%;
    padding: 32px 16px;
    border-radius: 4px;
    .form-input {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
