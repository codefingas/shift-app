import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Perspective from "../views/perspective";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
    },
    { path: "/result", component: Perspective },
  ],
});

export default router;
