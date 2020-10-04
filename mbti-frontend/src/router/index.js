import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";
import Home from "../views/Home";
import Perspective from "../views/perspective";

let firebaseConfig = {
  apiKey: `${process.env.VUE_APP_API_KEY}`,
  authDomain: `${process.env.VUE_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `${process.env.VUE_APP_DB_URL}`,
  projectId: `${process.env.VUE_APP_PROJECT_ID}`,
  appId: `${process.env.VUE_APP_PROJECT_ID}`,
  storageBucket: `${process.env.VUE_APP_STORAGE_BUCKET}`,
};

firebase.initializeApp(firebaseConfig);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
    },
    { path: "/result", component: Perspective },
    { path: "*", component: Home },
  ],
});

export default router;