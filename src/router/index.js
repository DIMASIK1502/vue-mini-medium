import Vue from "vue";
import VueRouter from "vue-router";
import PostList from "../views/PostList.vue";
import Login from "../views/Login.vue";
import PostCreate from "../views/PostCreate.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PostList",
    component: PostList
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      role: "guest"
    }
  },
  {
    path: "/create",
    name: "PostCreate",
    component: PostCreate,
    meta: {
      role: "writer"
    }
  },
  {
    path: "/edit",
    name: "PostEdit",
    props: true,
    component: PostCreate,
    meta: {
      role: "writer"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//приватные роуты

router.beforeEach(async (to, from, next) => {
  if (!store.getters["user/isAuth"]) {
    await store.dispatch("user/getUserFromStorage");
  }
  if (to.matched.some(record => record.meta.role)) {
    if (to.meta.role !== store.getters["user/role"]) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
