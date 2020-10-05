<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          <div class="text-center">
            LOGIN
          </div>
        </v-card-title>
        <v-card-text>
          <v-form ref="loginForm">
          <v-text-field
            label="Email"
            type="email"
            :rules="emailRules"
            outlined
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            outlined
            :rules="passwordRules"
          ></v-text-field>
          <div v-if="processing" class="text-center">
            <Loader />
          </div>
          <v-btn
            v-if="!processing"
            color="primary lighten-2"
            @click="authenticate()"
            rounded
            block
          >
            submit
          </v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="toggleDialog()">
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Loader from "./Resources/loader";
export default {
  props: ["dialog", "toggleDialog", "processing", "authentication"],
  components: {
    Loader,
  },
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "password is required",
        (v) => v && v.length < 5 || "Password has to be greater than 5",
      ],
    };
  },
  methods: {
    authenticate() {
      if(this.$refs.loginForm.validate()){
        this.authentication(this.email, this.password);
      }
    },
  },
};
</script>

<style scoped>
.text-center {
  margin: 0 auto;
}
</style>
