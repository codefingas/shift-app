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
                        >
                          <v-radio
                            v-for="i in 7"
                            :value="i"
                            :key="`${index},${i}`"
                            :color="
                              i < 4
                                ? `red lighten-${i}`
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
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <div class="text-center">
                <v-alert class="center-item" icon="mdi-alert" width="50%" v-if="incomplete" type="warning">
                  You have to answer all questions
                </v-alert>
              </div>
              <div class="text-center my-3">
                <v-btn
                  color="primary"
                  class="text-no-transform"
                  medium
                  @click="assess()"
                >
                  Save & Continue
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-form>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: ["toggleDialog"],
  data() {
    return {
      incomplete: false,
      email: "",
      rows: [null, null, null, null, null, null, null, null, null, null],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      radioRules: [(v) => {
        if(!v && this.email.length != 0){
         this.incomplete = true;
        } else {
          this.incomplete = false;
        }
        return !!v || "You have to select a value";
      } ],
      questions: [
        {
          question:
            "You find it takes effort to introduce yourself to other people",
          dimension: "EI",
          meaning: "I",
        },
        {
          question: "You consider yourself more practical than creative",
          dimension: "SN",
          meaning: "S",
        },
        {
          question:
            "Winning a debate matters less to you than making sure no one gets upset",
          dimension: "TF",
          meaning: "F",
        },
        {
          question:
            "You get energized going to social events that involve many interactions.",
          dimension: "EI",
          meaning: "E",
        },
        {
          question:
            "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
          dimension: "SN",
          meaning: "N",
        },
        {
          question:
            "Deadlines seem to you to be of relative rather than absolute importance.",
          dimension: "JP",
          meaning: "P",
        },
        {
          question:
            "Logic is usually more important than heart when it comes to making important decisions.",
          dimension: "TF",
          meaning: "T",
        },
        {
          question: "Your home and work environments are quite tidy",
          dimension: "JP",
          meaning: "J",
        },
        {
          question: "You do not mind being at the center of attention",
          dimension: "EI",
          meaning: "E",
        },
        {
          question:
            "Keeping your options open is more important than having a to-do list.",
          dimension: "JP",
          meaning: "P",
        },
      ],
      assessment: {},
    };
  },
  methods: {
    addAssessment(index, response) {
      this.$set(this.rows, index, response);
      let question = this.questions[index];
      let meaning =
        response === 4 || response > 4
          ? question.meaning
          : question.dimension.split(question.meaning)[0];
      this.assessment[index] = {
        question: this.questions[index].question,
        response,
        meaning,
      };
    },
    assess() {
      console.log("the data", this.assessment);
      this.$refs.assessments.validate();
    },
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
  margin : 0 auto;
}
</style>
