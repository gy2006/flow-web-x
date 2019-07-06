<template>
  <v-container class="flow-settings-option">
    <v-layout row d-block>
      <!-- Settings -->
      <v-flex xs11 class="mb-4">
        <span class="font-weight-black title">Settings</span>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs5>
        <span class="caption grey--text text--darken-1">{{ `Flow Name (${vars.flow.name})` }}</span>
        <div class="d-flex flow-name">
          <v-text-field
              class="pt-1"
              :rule="flowNameRules"
              v-model="flow.name"
          ></v-text-field>
          <v-btn small outline color="indigo">Rename</v-btn>
        </div>
      </v-flex>
    </v-layout>

    <!-- Git Access Option -->
    <v-flex xs11 class="mt-4 mb-4">
      <span class="font-weight-black title">Git Access</span>
      <v-divider></v-divider>
    </v-flex>

    <v-flex xs12>
      <option-git-access :flow="flow"></option-git-access>
    </v-flex>

    <!-- Danger Zone -->
    <v-flex xs11 class="mt-4 mb-1">
      <span class="font-weight-black title">Danger Zone</span>
    </v-flex>

    <v-flex xs11 class="d-flex danger-zone pa-3">
      <v-flex>
        <div class="font-weight-bold body-1">Delete Flow</div>
        <div>Once you delete a repository, there is no going back. Please be certain.</div>
      </v-flex>

      <v-flex xs3>
        <v-btn color="error">Delete This Flow</v-btn>
      </v-flex>
    </v-flex>

  </v-container>
</template>

<script>
  import vars from '@/util/vars'
  import OptionGitAccess from '@/components/Flow/OptionGitAccess'
  import { flowNameRules } from '@/util/rules'

  export default {
    name: 'SettingsOptionTab',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    components: {
      OptionGitAccess
    },
    data () {
      return {
        vars: vars,
        flowNameRules: flowNameRules(this)
      }
    },
    methods: {
      onHelpClick (item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .flow-settings-option .flow-name .v-text-field.v-text-field--solo .v-input__control {
    min-height: 36px !important;
  }

  .flow-settings-option .flow-name .v-btn {
    margin-top: 3% !important;
    max-width: 20%;
  }

  .flow-settings-option .danger-zone {
    border-style: solid;
    border-width: 1px;
    border-color: red;
  }
</style>
