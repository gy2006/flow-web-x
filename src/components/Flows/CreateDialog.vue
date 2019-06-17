<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="ma-0">
        <v-icon small>flow-icon-control_point</v-icon>
      </v-btn>
    </template>

    <v-card>
      <!-- toolbar -->
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="onCancelClick">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('flow.create') }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- content -->
      <v-stepper v-model="step" vertical>

        <!-- step 1: to given a name -->
        <v-stepper-step :complete="step > 1" step="1">
          Enter flow name
          <small>Summarize if needed</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <create-flow-name
              :flow="flow"
              :on-next-click="onNextClick"
          ></create-flow-name>
        </v-stepper-content>

        <!-- step 2: to config git url -->
        <v-stepper-step :complete="step > 2" step="2">Configure Git URL</v-stepper-step>
        <v-stepper-content step="2">
          <create-config-git
              :flow="flow"
              :on-next-click="onNextClick"
              :on-back-click="onBackClick"
          ></create-config-git>
        </v-stepper-content>

        <!-- step 3: to config git access -->
        <v-stepper-step :complete="step > 3" step="3">Configure Git Access</v-stepper-step>
        <v-stepper-content step="3">
          <create-config-access
              :flow="flow"
              :on-next-click="onNextClick"
              :on-back-click="onBackClick"
          ></create-config-access>
        </v-stepper-content>

        <!-- step 3: to test git access -->
        <v-stepper-step :complete="step > 3" step="3">Test git access</v-stepper-step>
        <v-stepper-content step="3">
          <create-test-git></create-test-git>
        </v-stepper-content>

        <!-- step 4: to setup yml -->
        <v-stepper-step step="4">Setup flow YML</v-stepper-step>
        <v-stepper-content step="4">
          <create-flow-yml></create-flow-yml>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
  import CreateFlowName from './CreateFlowName'
  import CreateConfigGit from './CreateConfigGit'
  import CreateTestGit from './CreateTestGit'
  import CreateFlowYml from './CreateFlowYml'
  import CreateConfigAccess from './CreateConfigAccess'
  import { FlowWrapper } from '@/util/flows'
  import { mapState } from 'vuex'

  export default {
    name: 'FlowCreateDialog',
    components: {
      CreateFlowName,
      CreateConfigGit,
      CreateConfigAccess,
      CreateTestGit,
      CreateFlowYml
    },
    data () {
      return {
        dialog: false,
        step: 1
      }
    },
    computed: {
      ...mapState({
        created: state => state.flows.created,
      }),
      flow: function () {
        if (this.created === undefined) {
          return new FlowWrapper({name: '', variables: {}})
        }

        return new FlowWrapper(this.created)
      }
    },
    methods: {
      onCancelClick () {
        this.dialog = false
      },

      onBackClick () {
        if (this.step > 0) {
          this.step--
        }
      },

      onNextClick () {
        this.beforeStepForward()
        this.step++
      },

      onSaveClick () {

      },

      beforeStepForward () {
        const handler = {
          1: () => {
            console.log(this.flow.name)
          },
          2: () => {
            console.log(this.flow.git)
          }
        }

        if (handler[ this.step ]) {
          handler[ this.step ]()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
