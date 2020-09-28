<template>
  <v-app>
    <v-app-bar color="white" app flat>
      <v-spacer></v-spacer>

      <v-btn dark color="primary lighten-2" x-large rounded>
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main> </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
