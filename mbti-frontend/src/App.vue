<template>
  <v-app>
   <Navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Navbar from "./components/layouts/Navbar";
export default {
  name: "App",
  components: {
    Home,
    Navbar
  },
  data: () => ({
  }),
};
</script>
