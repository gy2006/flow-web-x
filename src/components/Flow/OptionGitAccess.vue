<template>
  <v-layout d-block class="full-size" wrap>
    <v-form ref="gitAccessForm" lazy-validation>
      <v-flex xs8>
        <v-layout row wrap align-center>
          <v-flex xs9>
            <span class="caption grey--text text--darken-1">{{ `Webhook (${vars.flow.webhook})` }}</span>
            <v-text-field
                class="pt-0"
                v-model="wrapper.webhook"
                append-icon="help"
                @click:append="onHelpClick('hook')"
                readonly
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-icon :class="['ml-4', 'mt-2', wrapper.webhookStatus.color]">{{ wrapper.webhookStatus.icon }}</v-icon>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs6>
        <span class="caption grey--text text--darken-1">{{ `Git URL (${vars.flow.gitUrl})` }}</span>
        <v-text-field
            class="pt-0"
            v-model="wrapper.gitUrl"
            append-icon="help"
            append-outer-icon=""
            :rules="gitUrlRules"
            @click:append="onHelpClick('url')"
            readonly
        ></v-text-field>
      </v-flex>

      <v-flex xs6>
        <span class="caption grey--text text--darken-1">{{ `SSH keys (${vars.credential.ssh})` }}</span>
        <v-text-field
            class="pt-0"
            v-model="wrapper.credential"
            append-icon="help"
            :rules="credentialNameRules"
            @click:append="onHelpClick('url')"
            readonly
        ></v-text-field>
      </v-flex>
    </v-form>

    <v-flex xs12 class="d-flex">
      <git-test-btn :wrapper="wrapper" :onBeforeTest="onTestClick"></git-test-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import vars from '@/util/vars'
  import GitTestBtn from '@/components/Flow/GitTestBtn'

  import { FlowWrapper } from '@/util/flows'
  import { flowNameRules, gitUrlRules } from '@/util/rules'

  export default {
    name: 'OptionGitAccess',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    components: {
      GitTestBtn
    },
    data () {
      return {
        vars: vars,
        flowNameRules: flowNameRules(this),
        gitUrlRules: gitUrlRules(this),
        credentialNameRules: [
          v => !!v || this.$t('flow.hint.credential_name_required')
        ]
      }
    },
    computed: {
      wrapper () {
        return new FlowWrapper(this.flow)
      }
    },
    methods: {
      onTestClick () {
        return this.$refs.gitAccessForm.validate()
      },

      onHelpClick (type) {

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
