<template>
  <div class="px-3 mt-6">
    <div v-if="isParamed" class="text-center">
      There is nothing to display take test to begin <br />
      <a href="/">take test</a>
    </div>

    <!-- change the v-if value below to display card -->

    <div v-if="!isParamed">
      <div v-if="fetchingData" class="text-center auto-margin">
        <Loader />
      </div>
      <v-container v-if="!fetchingData">
        <ul>
          <transition-group name="slideY">
            <li v-for="(results, index) in data" :key="index">
              <v-card height="275px" class="d-flex align-center mt-3">
                <v-row class="px-3">
                  <v-col md="6" sm="12" xs="12">
                    <h1 style="color: #113264" class="pt-12 mt-12">
                      Your Perspective
                    </h1>
                    <p>Your Perspective Type is {{ results.name }}</p>
                  </v-col>
                  <v-col md="6" sm="12" xs="12">
                    <v-container fluid>
                      <v-row
                        v-for="(result, index) in results.data"
                        :key="`${result.name}${index}`"
                      >
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
              </v-card>
            </li>
          </transition-group>
        </ul>
      </v-container>
    </div>
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
    <div
      v-if="data.length !== 0 && !isParamed && data.length < 2 && !fetchingData"
      class="text-center mt-3"
    >
      <Loader v-if="sendingMail" />
      <v-btn
        v-else
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
      result: null,
      sendingMail: false,
      sentMail: false,
      errorType: null,
      errorText: "",
    };
  },
  methods: {
    generateReport(name) {
      /**
       * there may be many ids comming in so data has to be an array of objects depicting the values they had
       *
       * it is expecting a results.data
       */
      let data = name.split("").map((v) => {
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

      return { name, data };
    },
    async sendEmail() {
      this.sendingMail = true;
      await UserController.sendEmail({
        email: this.$router.params.email,
        result: this.data[0].name,
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
  async mounted() {
    
    this.user = await UserController.getUserData();
    if (!this.$router.params) {
      this.isParamed = true;
    } else if (this.$router.params && this.$router.params.userId) {
      this.fetchingData = true;
      await UserController.getPrevAssessments(this.$router.params.userId).then(
        (assessments) => {
          if (assessments.noTest) {
            this.isParamed = false;
          } else {
            this.data = assessments.tests.map((v) => this.generateReport(v));
            this.fetchingData = false;
          }
        }
      );
    } else {
      this.fetchingData = true;
      await UserController.getTest(this.$router.params.assessmentId).then(
        (result) => {
          let data = this.generateReport(result);
          this.data = [data];
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

.slideY-fade-enter-active {
  transition: all 0.8s ease;
}
.slideY-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slideY-fade-enter, .slideY-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

ul li {
  list-style: none;
}
</style>
