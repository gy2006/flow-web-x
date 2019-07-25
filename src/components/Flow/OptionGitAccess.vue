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

      <v-form ref="gitAccessForm" lazy-validation>
        <span class="caption grey--text text--darken-1">{{ `Git URL (${vars.flow.gitUrl})` }}</span>
        <v-text-field
            class="pt-0"
            v-model="wrapper.gitUrl"
            append-icon="help"
            :rules="gitUrlRules"
            @click:append="onHelpClick('url')"
            readonly
        ></v-text-field>

        <span class="caption grey--text text--darken-1">{{ `SSH keys (${vars.credential.ssh})` }}</span>
        <v-text-field
            class="pt-0"
            v-model="wrapper.credential"
            append-icon="help"
            :rules="credentialNameRules"
            @click:append="onHelpClick('url')"
            readonly
        ></v-text-field>
      </v-form>
    </v-flex>

    <v-flex xs12 class="d-flex">
      <git-test-btn :wrapper="wrapper"></git-test-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import vars from '@/util/vars'
  import GitTestBtn from '@/components/Flow/GitTestBtn'

  import { mapState } from 'vuex'
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
        isShownGitTest: false,
        flowNameRules: flowNameRules(this),
        gitUrlRules: gitUrlRules(this),
        credentialNameRules: [
          v => !!v || this.$t('flow.hint.credential_name_required'),
        ]
      }
    },
    computed: {
      ...mapState({
        errors: state => state.errors.items,
      }),

      wrapper () {
        return new FlowWrapper(this.flow)
      }
    },
    methods: {
      onTestClick () {
        if (!this.$refs.gitAccessForm.validate()) {
          return
        }
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
