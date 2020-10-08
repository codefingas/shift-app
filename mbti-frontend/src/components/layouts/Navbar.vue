<template>
  <div>
    <v-app-bar color="white" flat>
      <v-spacer></v-spacer>
      <span v-if="user" class="mx-3">
        <span>Welcome, {{ user.email }}</span>
        <a
          v-if="user.assessments.length > 0"
          @click="viewPrev()"
          class="mx-3"
          >view previous tests</a
        >
      </span>

      <Loader v-if="processing" />
      <div v-else>
        <v-btn
          @click="logout()"
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
          v-else
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
/*eslint-disable no-async-promise-executor */
import UserController from "../../services/userCtrl";
import Loader from "../../components/Resources/loader";
import Dialog from "../modal";
export default {
  components: {
    Dialog,
    Loader,
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
    viewPrev() {
      this.$router.params = { ...this.$route.params, userId: this.user.id };
      this.$router.push("/result");
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    async logout() {
      this.processing = true;
      await UserController.logout();
      this.user = null;
      this.processing = false;
    },
    async authentication(email, password) {
      this.toggleProcessing();

      return new Promise(async (resolve, reject) => {
        await UserController.confirmUserByEmail(email).then(async (resp) => {
          this.toggleDialog();
          if (resp.isUser) {
            await UserController.login(email, password)
              .then((user) => {
                this.setUser(user);
                resolve(null);
              })
              .catch((err) => {
                this.toggleDialog();
                reject(err);
              });
          } else {
            await UserController.signUp({ email, password })
              .then((user) => {
                this.setUser(user);
                resolve(null);
              })
              .catch((err) => {
                this.toggleDialog();
                reject(err);
              });
          }
          this.toggleProcessing();
        });
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
    this.processing = true;
    let user = await UserController.getUserData();
    this.setUser(user);
    this.processing = false;
  },
};
</script>

<style scoped>
.auto-margin {
  margin: 0 auto;
}
.result-name {
  color: #878787;
}

.center-item {
  margin: 0 auto;
}
</style>
