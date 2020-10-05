<template>
  <div>
    <v-container fluid class="mx-6">
      <h3>Discover Your Perspective</h3>
      <p>
        Complete the 7 min test and get a detailed report of your lenses on the
        world.
      </p>
      <v-container>
        <v-form ref="assessments">
          <v-card
            elevation="1"
            v-for="(question, index) in questions"
            :key="index"
            class="text-center"
          >
            <v-card-title class="text-center"
              >{{ question.question }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col offset-md="3" offset-sm="0" md="6">
                  <v-container>
                    <v-row>
                      <v-col md="2"
                        ><span class="red--text py-6 block-element">
                          Disagree</span
                        ></v-col
                      >
                      <v-col md="8">
                        <v-radio-group
                          v-model="rows[index]"
                          row
                          :rules="radioRules"
                          :disabled="processing"
                        >
                          <v-radio
                            v-for="i in 7"
                            :value="i"
                            :key="`${index},${i}`"
                            :color="
                              i < 4
                                ? i > 0 ? `red lighten-${i + 1}` : `red lighten-${i}`
                                : i === 4
                                ? `grey`
                                : `green lighten-${7 - i}`
                            "
                            @click="addAssessment(index, i)"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col md="2">
                        <span class="green--text py-6 block-element">
                          Agree</span
                        ></v-col
                      >
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card elevation="1" class="text-center">
            <v-card-title class="text-center">Your Email </v-card-title>
            <v-card-text>
              <v-row>
                <v-col offset-md="3" offset-sm="0" md="6" sm="12">
                  <v-text-field
                    outlined
                    placeholder="you@example.com"
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                    clearable
                    :disabled="processing"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <div class="text-center">
                <v-alert
                  class="center-item"
                  icon="mdi-alert"
                  width="50%"
                  v-if="incomplete"
                  :type="`${errorType || 'warning'}`"
                >
                  {{errorText || "You have to answer all questions"}}
                </v-alert>
              </div>
              <div class="text-center my-3">
                <v-btn
                  v-if="!processing"
                  color="primary"
                  class="text-no-transform"
                  medium
                  @click="assess()"
                >
                  Save & Continue
                </v-btn>
                <Loader v-if="processing" />
              </div>
            </v-card-text>
          </v-card>
        </v-form>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import Loader from "../components/Resources/loader";
import UserController from "../services/userCtrl";
/**
 * having built front end
 *    - build submit functionality
 *          - the assessment and email goes to backend * done
 *              - the email is confirmed if existent * done
 *                      - if it is(ask for password), the assessment gets added to the previous ones (using hash key) * done 
 *                                - create perspective page *done
 *                                      -  how does the data get displayed * done
 *                                      - 
 *                                - in this case, show previous data when they log in
 *                      - what to do when the user doesnt provide a password but gives right email (email answer but dont save? ask tech lead)
 *                      - if not - create a new user with assessment
 *                                - ask to create new password(if password was added) / cancel (if cancelled view answers)
 *  - build send email functionality - almost done * done
 *        - when user wants to send mail to themselves, say (you have to login first) * resolved
 *                    - throw open a dialog for this, dialog should have the login form * resolved
 * 
 *    - build login functionality * done
 *        - check for email 
 *                  - a processing variable which will be passed to the navbar and modal component should be available *done
 *                - if present login * done
 *                - if absent create account *done
 * 

 *    - Feature to get previous records 
            - create a modal
            - use the assements items to loop over the template
            - display a loader while the items load

 */
export default {
  name: "Home",
  components: { Loader },
  props: ["toggleDialog"],
  data() {
    return {
      incomplete: false,
      errorType: null,
      email: "",
      errorText: null,
      emailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      rows: [null, null, null, null, null, null, null, null, null, null],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => this.emailRegex.test(v) || "E-mail must be valid",
      ],
      radioRules: [
        (v) => {
          if (!v && this.email.length != 0) {
            this.incomplete = true;
          } else {
            this.incomplete = false;
          }
          return !!v || "You have to select a value";
        },
      ],
      questions: [
        {
          question:
            "You find it takes effort to introduce yourself to other people",
          dimension: "EI",
          direction: 1,
          meaning: "I",
        },
        {
          question: "You consider yourself more practical than creative",
          dimension: "SN",
          direction: -1,
          meaning: "S",
        },
        {
          question:
            "Winning a debate matters less to you than making sure no one gets upset",
          dimension: "TF",
          direction: 1,
          meaning: "F",
        },
        {
          question:
            "You get energized going to social events that involve many interactions.",
          dimension: "EI",
          direction: -1,
          meaning: "E",
        },
        {
          question:
            "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
          dimension: "SN",
          direction: 1,
          meaning: "N",
        },
        {
          question:
            "Deadlines seem to you to be of relative rather than absolute importance.",
          dimension: "JP",
          direction: 1,
          meaning: "P",
        },
        {
          question:
            "Logic is usually more important than heart when it comes to making important decisions.",
          dimension: "TF",
          direction: -1,
          meaning: "T",
        },
        {
          question: "Your home and work environments are quite tidy",
          dimension: "JP",
          direction: -1,
          meaning: "J",
        },
        {
          question: "You do not mind being at the center of attention",
          dimension: "EI",
          direction: -1,
          meaning: "E",
        },
        {
          question:
            "Keeping your options open is more important than having a to-do list.",
          dimension: "JP",
          direction: 1,
          meaning: "P",
        },
      ],
      assessment: {},
      processing: false,
    };
  },
  methods: {
    addAssessment(index, response) {
      this.$set(this.rows, index, response);
      this.assessment[index] = {
        question: this.questions[index],
        response,
      };
    },
    async assess() {
      if (this.$refs.assessments.validate()) {
        this.processing = true;
        await UserController.submitAssessment({
          email: this.email,
          assessment: this.assessment,
        }).then(result => {
          let {assessmentId} = result;
          this.$router.params = {assessmentId, email: this.email};
          this.$router.push("/result");
          this.processing = false;
        }).catch(err => {
          this.processing = false;
          this.incomplete = true;
          this.errorType = "error";
          this.errorText = err.message;
        });
      }
    },
  },
  mounted() {
    // console.log(this.$router.params);
  },
};
</script>

<style scoped>
.v-card__title {
  display: block !important;
}

.text-no-transform {
  text-transform: none;
}
.block-element {
  display: block;
}

.center-item {
  margin: 0 auto;
}
</style>
