<template>
  <v-app>
    <Navbar />
    <v-main>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/layouts/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({}),
};
</script>
