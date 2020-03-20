<template>
  <b-navbar spaced class="is-primary">
    <template slot="end">
      <b-navbar-item tag="div">
        <div v-if="!isAuth" class="buttons">
          <b-button
            type="is-primary"
            inverted
            @click="$router.push({ path: '/' })"
            v-if="$route.name === 'Login'"
            >Посты</b-button
          >
          <b-button
            v-else
            @click="$router.push({ path: '/login' })"
            type="is-primary"
            inverted
          >
            Авторизация
          </b-button>
        </div>
        <div v-else class="buttons">
          <b-button
            v-if="$route.name !== 'PostList'"
            type="is-primary"
            inverted
            @click="$router.push({ path: '/' })"
            >Посты</b-button
          >
          <b-button
            @click="$router.push({ path: '/create' })"
            v-if="
              role === 'writer' &&
                $route.name !== 'PostCreate' &&
                $route.name !== 'PostEdit'
            "
            type="is-primary"
            inverted
          >
            Создать пост
          </b-button>
          <b-button @click="userLogout" type="is-primary" inverted>
            Выход
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["role", "isAuth"])
  },
  methods: {
    ...mapActions("user", ["userLogout"])
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
}
</style>
