<template>
  <div>
    <v-app-bar color="white" flat>
      <v-spacer></v-spacer>
      <span v-if="user" class="mx-3">
        <span>Welcome, {{ user.email }}</span>
        <a href="#/" v-if="user.assessments.length > 0">view previous tests</a>
      </span>

      <Loader v-if="processing" />

      <div v-if="!processing">
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
      </div>
    </v-app-bar>
    <Dialog
      :processing="processing"
      :dialog="dialog"
      :toggleDialog="toggleDialog"
      :authentication="authentication"
    />
  </div>
</template>

<script>
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
      user: null,
      processing: false,
    };
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    logout() {
      UserController.logout();
    },
    async authentication(email, password) {
      this.toggleProcessing();
      await UserController.confirmUserByEmail(email).then(async (resp) => {
        if (resp.isUser) {
          await UserController.login(email, password).then((user) => {
            this.setUser(user);
          });
        } else {
          await UserController.signUp({ email, password }).then((user) => {
            this.setUser(user);
          });
        }
        this.toggleProcessing();
      });
    },
    toggleProcessing() {
      this.processing = !this.processing;
    },
    setUser(user) {
      let assessments = user.assessments
        ? Object.keys(user.assessments)
            .sort((a, b) => b - a)
            .map((v) => user.assessments[v])
        : [];
      this.user = { ...user, assessments };
    },
  },
  async mounted() {
    this.user = await UserController.getUserData();
  },
};
</script>
