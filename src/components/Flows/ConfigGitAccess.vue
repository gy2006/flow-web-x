<template>
  <v-layout class="d-inline-block full-size">
    <v-flex xs5>
      <v-text-field
          :label="`Webhook (${vars.flow.webhook})`"
          v-model="wrapper.webhook"
          append-icon="help"
          @click:append="onHelpClick('hook')"
          readonly
      ></v-text-field>

      <v-text-field
          v-model="wrapper.gitUrl"
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
          v-model="wrapper.ssh.publicKey"
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
          v-model="wrapper.ssh.privateKey"
          append-outer-icon="help"
          :rules="sshPrivateKeyRules"
          @click:append-outer="onHelpClick('ssh_private')"
      ></v-textarea>
    </v-flex>

    <v-flex xs5>
      <v-btn small color="primary">
        {{ $t('save') }}
      </v-btn>

      <v-btn small color="primary">
        {{ $t('test') }}
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import vars from '@/util/vars'
  import { FlowWrapper } from '@/util/flows'
  import { flowNameRules, gitUrlRules, sshEmailRules, sshPrivateKeyRules, sshPublicKeyRules } from '@/util/rules'

  export default {
    name: 'ConfigGitAccess',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        vars: vars,
        flowNameRules: flowNameRules(this),
        gitUrlRules: gitUrlRules(this).slice(1),
        sshEmailRules: sshEmailRules(this).slice(1),
        sshPublicKeyRules: sshPublicKeyRules(this).slice(1),
        sshPrivateKeyRules: sshPrivateKeyRules(this).slice(1)
      }
    },
    computed: {
      wrapper () {
        return new FlowWrapper(this.flow)
      }
    }
  }
</script>

<style scoped>

</style>
