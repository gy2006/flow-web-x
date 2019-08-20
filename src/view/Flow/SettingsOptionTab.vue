<template>
  <v-container>
    <v-layout row d-block class="flow-settings-option">
      <!-- Settings -->
      <v-flex xs11 class="mb-4">
        <span class="font-weight-black title">Settings</span>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs5>
        <option-flow-name :flow="flow"></option-flow-name>
      </v-flex>

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

      <v-flex xs11 class="danger-zone pa-3">
        <option-delete-flow :flow="flow"></option-delete-flow>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import OptionFlowName from '@/components/Flow/OptionFlowName'
  import OptionGitAccess from '@/components/Flow/OptionGitAccess'
  import OptionDeleteFlow from '@/components/Flow/OptionDeleteFlow'

  export default {
    name: 'SettingsOptionTab',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    components: {
      OptionFlowName,
      OptionGitAccess,
      OptionDeleteFlow
    },
    data () {
      return {}
    },
    methods: {
      onHelpClick (item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .flow-settings-option .danger-zone {
    border-style: solid;
    border-width: 1px;
    border-color: red;
  }
</style>
