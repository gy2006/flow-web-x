<template>
  <v-dialog v-model="show" persistent max-width="80%" min-width="80%">
    <v-card>
      <v-card-title>
        <span class="headline">Create A Flow</span>
      </v-card-title>

      <v-card-text>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">Input Flow Name</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2">Config Git Repo</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Setup Flow Execution</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!--input flow name-->
            <v-stepper-content step="1">
              <v-card color="grey lighten-1" class="mb-2" height="200px"></v-card>
              <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
              <v-btn flat @click.native="onCancel">Cancel</v-btn>
            </v-stepper-content>

            <!--setup git info-->
            <v-stepper-content step="2">
              <v-card color="grey lighten-1" class="mb-2" height="200px"></v-card>
              <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
              <v-btn flat @click.native="onCancel">Cancel</v-btn>
            </v-stepper-content>

            <!--config yml-->
            <v-stepper-content step="3">
              <v-card color="grey lighten-1" class="mb-2" height="200px"></v-card>
              <v-btn color="primary" @click.native="onSave">Save</v-btn>
              <v-btn flat @click.native="onCancel">Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'CreateFlow',
    props: {
      show: Boolean,
      onCancel: Function
    },
    methods: {
      onSave () {
        console.log('save flow')
        this.onCancel()
      }
    },
    data () {
      return {
        step: 0
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
