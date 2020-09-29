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
          <v-text-field label="Email" type="email" outlined></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            outlined
          ></v-text-field>
          <div v-if="loading" class="text-center">
            <Loader />
          </div>
          <v-btn
            v-if="!loading"
            color="primary lighten-2"
            @click="toggleDialog()"
            rounded
            block
          >
            submit
          </v-btn>
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
  props: ["dialog", "toggleDialog"],
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style scoped>
    .text-center {
        margin: 0 auto;
    }
</style>