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
        v-if="user"
        transition="fade-transition"
      >
        <span class="mr-2">sign out</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>

      <v-btn
        @click="toggleDialog()"
        dark
        color="primary lighten-2"
        x-large
        rounded
        v-if="!user"
        transition="fade-transition"
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <Dialog :dialog="dialog" :toggleDialog="toggleDialog" />
  </div>
</template>

<script>
import firebase from "firebase";
import UserController from "../../services/userCtrl";
import Dialog from "../modal";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      dialog: false,
      loggedIn: false,
      user: null
    };
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    logout(){
      UserController.logout();
    }
  },
  mounted() {
    this.user = firebase.auth().currentUser;
  },
};
</script>
