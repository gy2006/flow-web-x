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
          {{ $t('flow.create_title_name') }}
        </v-stepper-step>
        <v-stepper-content step="1">
          <create-flow-name
              :on-next-click="onNextClick"
          ></create-flow-name>
        </v-stepper-content>

        <!-- step 2: to config git url -->
        <v-stepper-step :complete="step > 2" step="2">
          {{ $t('flow.create_title_git_url') }}
        </v-stepper-step>
        <v-stepper-content step="2">
          <create-config-git
              :webhook="flow.webhook"
              :on-next-click="onNextClick"
              :on-back-click="onBackClick"
              :on-skip-click="onSkipClick"
          ></create-config-git>
        </v-stepper-content>

        <!-- step 3: to config git access -->
        <v-stepper-step :complete="step > 3" step="3">
          {{ $t('flow.create_title_git_access') }}
        </v-stepper-step>
        <v-stepper-content step="3">
          <create-config-access
              :on-next-click="onNextClick"
              :on-back-click="onBackClick"
          ></create-config-access>
        </v-stepper-content>

        <!-- step 4: to test git access -->
        <v-stepper-step :complete="step > 4" step="4">
          {{ $t('flow.create_title_git_test') }}
        </v-stepper-step>
        <v-stepper-content step="4">
          <create-test-git
              :flow="flow"
              :on-next-click="onNextClick"
              :on-back-click="onBackClick"
          ></create-test-git>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
  import CreateFlowName from './CreateFlowName'
  import CreateConfigGit from './CreateConfigGit'
  import CreateTestGit from './CreateTestGit'
  import CreateConfigAccess from './CreateConfigAccess'
  import { FlowWrapper } from '@/util/flows'
  import { mapState } from 'vuex'

  export default {
    name: 'FlowCreateDialog',
    components: {
      CreateFlowName,
      CreateConfigGit,
      CreateConfigAccess,
      CreateTestGit
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
    watch: {
      step (after) {
        if (after !== 4) {
          return
        }

        console.log('should be finish')
        // TODO: save git connection
        // TODO: save ssh settings
        // TODO: to confirm status
        this.onCancelClick()
      }
    },
    methods: {
      onCancelClick () {
        this.dialog = false
        this.step = 1
      },

      onBackClick () {
        if (this.step > 0) {
          this.step--
        }
      },

      onSkipClick () {
        // skip git config
        this.step = 4
      },

      onNextClick (data) {
        this.beforeStepForward(data)
        this.step++
      },

      beforeStepForward (data) {
        const handler = {
          1: (name) => {
            this.flow.name = name
            console.log('flow name: ' + name)
          },
          2: (gitUrl) => {
            this.flow.gitUrl = gitUrl
            console.log('git url: ' + gitUrl)
          },
          3: (sshRsa) => {
            this.flow.ssh = sshRsa
            console.log('ssh-rsa: ' + sshRsa)
          }
        }

        if (handler[ this.step ]) {
          handler[ this.step ](data)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
