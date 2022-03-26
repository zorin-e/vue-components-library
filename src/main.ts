import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import App from "./App.vue";
import View from "@/View.vue";
const VueInputMask = require("vue-inputmask").default;
Vue.use(VueInputMask);

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: View
  },
  {
    path: "/brokers",
    name: "brokers",
    component: View
  },
  {
    path: "/news",
    name: "news",
    component: View
  },
  {
    path: "/dictionary",
    name: "dictionary",
    component: View
  },
  {
    path: "/chat",
    name: "chat",
    component: View
  },
  {
    path: "/chat",
    name: "chat",
    component: View,
    children: [
      {
        path: ":id",
        name: "messagesList",
        component: View
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
