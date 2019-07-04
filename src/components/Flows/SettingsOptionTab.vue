<template>
  <v-container class="flow-settings-option">
    <v-layout row d-block>
      <!-- Settings -->
      <v-flex xs11 class="mb-4">
        <span class="font-weight-black title">Settings</span>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs5>
        <div class="d-flex mt-2 flow-name">
          <v-text-field
              :label="`Flow Name (${vars.flow.name})`"
              :rule="flowNameRules"
              v-model="name"
          ></v-text-field>
          <v-btn outline color="indigo">Rename</v-btn>
        </div>
      </v-flex>
    </v-layout>

    <!-- Git Access Option -->
    <v-flex xs11 class="mt-4 mb-4">
      <span class="font-weight-black title">Git Access</span>
      <v-divider></v-divider>
    </v-flex>

    <v-flex xs5>
      <v-text-field
          :label="`Webhook (${vars.flow.webhook})`"
          v-model="name"
          append-icon="help"
          @click:append="onHelpClick('hook')"
          readonly
      ></v-text-field>

      <v-text-field
          v-model="name"
          required
          append-icon="help"
          :label="`Git URL (${vars.flow.gitUrl})`"
          :rules="gitUrlRules"
          @click:append="onHelpClick('url')"
      ></v-text-field>
    </v-flex>

    <v-flex xs10 class="mt-2">
      <span class="caption grey--text text--darken-1">SSH keys ({{ vars.credential.ssh }} = xxx)</span>

      <v-textarea
          box
          label="Public Key"
          rows="4"
          class="font-weight-medium caption"
          append-outer-icon="help"
          :rules="sshPublicKeyRules"
          @click:append-outer="onHelpClick('ssh_public')"
      ></v-textarea>

      <v-textarea
          box
          class="font-weight-medium caption"
          label="Private Key"
          rows="8"
          append-outer-icon="help"
          :rules="sshPrivateKeyRules"
          @click:append-outer="onHelpClick('ssh_private')"
      ></v-textarea>
    </v-flex>

    <v-flex xs5>
      <v-btn color="primary">
        {{ $t('test') }}
      </v-btn>
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
  import { flowNameRules, gitUrlRules, sshEmailRules, sshPrivateKeyRules, sshPublicKeyRules } from '@/util/rules'

  export default {
    name: 'SettingsOptionTab',
    props: {
      name: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        vars: vars,
        flowNameRules: flowNameRules(this),
        gitUrlRules: gitUrlRules(this),
        sshEmailRules: sshEmailRules(this),
        sshPublicKeyRules: sshPublicKeyRules(this),
        sshPrivateKeyRules: sshPrivateKeyRules(this)
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
