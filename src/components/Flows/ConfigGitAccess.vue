<template>
  <v-layout class="d-inline-block full-size">
    <v-flex xs5>
      <span class="caption grey--text text--darken-1">{{ `Webhook (${vars.flow.webhook})` }}</span>
      <v-text-field
          class="pt-0"
          v-model="wrapper.webhook"
          append-icon="help"
          @click:append="onHelpClick('hook')"
          readonly
      ></v-text-field>

      <span class="caption grey--text text--darken-1">{{ `Git URL (${vars.flow.gitUrl})` }}</span>
      <v-text-field
          class="pt-0"
          v-model="wrapper.gitUrl"
          append-icon="help"
          @click:append="onHelpClick('url')"
          readonly
      ></v-text-field>

      <span class="caption grey--text text--darken-1">{{ `SSH keys (${vars.credential.ssh})` }}</span>
      <v-text-field
          class="pt-0"
          v-model="wrapper.credential"
          append-icon="help"
          @click:append="onHelpClick('url')"
          readonly
      ></v-text-field>
    </v-flex>

    <v-flex xs5>
      <v-btn small color="primary" @click="onTestClick">
        {{ $t('test') }}
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import vars from '@/util/vars'
  import { FlowWrapper } from '@/util/flows'
  import { flowNameRules } from '@/util/rules'

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
        flowNameRules: flowNameRules(this)
      }
    },
    computed: {
      wrapper () {
        return new FlowWrapper(this.flow)
      }
    },
    methods: {
      onTestClick () {

      }
    }
  }
</script>

<style>
  .ssh-add-btn.v-btn--floating.v-btn--small {
    height: 22px !important;
    width: 22px !important;
  }
</style>
