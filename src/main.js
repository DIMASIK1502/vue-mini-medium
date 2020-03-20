import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store";

import "./utils/iconLibrary";
import "buefy/dist/buefy.min.css";

Vue.config.productionTip = false;

Vue.component("vue-fontawesome", FontAwesomeIcon);
Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
