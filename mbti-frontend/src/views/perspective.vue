<template>
  <div class="px-3 mt-6">
    <div v-if="isParamed" class="text-center">
      There is nothing to display take test to begin <br />
      <a href="/">take test</a>
    </div>

    <!-- change the v-if value below to display card -->

    <v-card v-if="!isParamed" height="275px" class="d-flex align-center">
      <div v-if="fetchingData" class="text-center auto-margin">
        <Loader />
      </div>
      <v-container v-if="!fetchingData">
        <v-row>
          <v-col md="6" sm="12" xs="12">
            <h1 style="color: #113264" class="pt-12 mt-12">
              Your Perspective
            </h1>
            <p>Your Perspective Type is {{ result }}</p>
          </v-col>
          <v-col md="6" sm="12" xs="12">
            <v-container fluid>
              <v-row v-for="(result, index) in data" :key="index">
                <v-col mb="1">
                  <p class="result-name">
                    {{ result.option1 }}
                  </p>
                </v-col>
                <v-col mb="10">
                  <v-progress-linear
                    color="#A920CB"
                    background-color="#E9ECEF"
                    value="50"
                    height="20px"
                    :reverse="result.reverse"
                  ></v-progress-linear>
                </v-col>
                <v-col mb="1">
                  <p class="result-name">
                    {{ result.option2 }}
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div class="text-center">
      <v-alert
        class="center-item"
        icon="mdi-alert"
        width="50%"
        v-if="sentMail"
        :type="`${errorType || 'warning'}`"
      >
        {{ errorText || "You have to answer all questions" }}
      </v-alert>
    </div>
    <div v-if="!isParamed && !fetchingData" class="text-center mt-3">
      <Loader v-if="sendingMail" />
      <v-btn
        v-if="!sendingMail"
        medium
        dark
        color="primary lighten-2"
        rounded
        @click="sendEmail()"
      >
        send as email
      </v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Loader from "../components/Resources/loader";
import UserController from "../services/userCtrl";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      user: null,
      spectrum: {
        E: {
          name: "Extraversion (E)",
          dimension: "EI",
        },
        I: {
          name: "Introversion (I)",
          dimension: "EI",
        },
        S: {
          name: "Sensing (S)",
          dimension: "SN",
        },
        N: {
          name: "Intuition (N)",
          dimension: "SN",
        },
        T: {
          name: "Thinking (T)",
          dimension: "TF",
        },
        F: {
          name: "Feeling (F)",
          dimension: "TF",
        },
        J: {
          name: "Judging (J)",
          dimension: "JP",
        },
        P: {
          name: "Perceiving (P)",
          dimension: "JP",
        },
      },
      fetchingData: false,
      isParamed: false,
      data: [],
      result: "",
      sendingMail: false,
      sentMail: false,
      errorType: null,
      errorText: "",
    };
  },
  methods: {
    generateReport(result) {
      this.data = result.split("").map((v) => {
        let vee = v.toUpperCase(),
          dimension = this.spectrum[vee].dimension,
          options = dimension.split(""),
          reverse = options[1] == vee ? true : false,
          option1 = this.spectrum[options[0]].name,
          option2 = this.spectrum[options[1]].name;

        return {
          option1,
          option2,
          reverse,
        };
      });
    },
    async sendEmail() {
      this.sendingMail = true;
      await UserController.sendEmail({
        email: this.$router.params.email,
        result: this.result,
      })
        .then((resp) => {
          this.sendingMail = false;
          (this.errorType = "success"),
            (this.errorText = resp.message.toUpperCase());
          this.sentMail = true;
        })
        .catch((err) => {
          this.errorType = "warning";
          this.errorText =
            "Unable to send mail - please confirm your email " +
            " " +
            err.message;
          this.sentMail = true;
          this.sendingMail = false;
        });
    },
  },
  mounted() {
    this.user = firebase.auth().currentUser;
    if (!this.$router.params) {
      this.isParamed = true;
    } else {
      this.fetchingData = true;
      UserController.getTest(this.$router.params.assessmentId).then(
        (result) => {
          this.result = result;
          this.generateReport(result);
          this.fetchingData = false;
        }
      );
    }
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
