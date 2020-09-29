<template>
  <div>
    <v-app-bar color="white" flat>
      <v-spacer></v-spacer>

      <v-btn
        @click="toggleDialog()"
        dark
        color="primary lighten-2"
        x-large
        rounded
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <Dialog :dialog="dialog" :toggleDialog="toggleDialog" />
  </div>
</template>

<script>
import Dialog from "../modal";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>
