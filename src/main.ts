import { createApp } from "vue";
import App from "./App.vue";
import Home from "./views/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import "./assets/tailwind.css";

const routes = [{ path: "/", component: Home }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
