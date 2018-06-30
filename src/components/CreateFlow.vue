<template>
  <v-dialog v-model="show" persistent max-width="80%" min-width="80%">
    <v-card>
      <v-card-title>
        <span class="headline">Create A Flow</span>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-stepper v-model="step" vertical>
          <!--input flow name-->
          <v-stepper-step step="1">
            Input Flow Name
          </v-stepper-step>
          <v-stepper-content :complete="step > 1" step="1">
            <v-card class="mb-2">
              <v-layout row>
                <v-flex xs3>
                  <v-subheader>Give a name for flow</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-text-field
                    :rules="[flowNameRules.required, flowNameRules.format]"
                    label="flow name"
                    value=""
                    single-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
            <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
          </v-stepper-content>

          <!--setup git info-->
          <v-stepper-step step="2">
            Config Git Repo
          </v-stepper-step>
          <v-stepper-content :complete="step > 2" step="2">
            <v-card color="grey lighten-1" class="mb-2" height="200px"></v-card>
            <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
          </v-stepper-content>

          <!--config yml-->
          <v-stepper-step step="3">
            Setup Flow Execution
          </v-stepper-step>
          <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-2" height="200px"></v-card>
            <v-btn color="primary" @click.native="onSave">Save</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'CreateFlow',
    methods: {
      open () {
        this.show = true
        this.reset()
      },
      close () {
        this.show = false
      },
      reset () {
        this.step = 1
      },
      onSave () {
        console.log('save flow')
      }
    },
    data () {
      return {
        show: false,
        step: 0,
        hasError: false,
        flowNameRules: {
          required: (value) => {
            if (value) {
              this.hasError = false
              return true
            }

            this.hasError = true
            return 'flow name is required'
          },
          format: (value) => {
            return true
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
