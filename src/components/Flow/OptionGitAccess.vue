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
      <v-flex xs2>
        <v-btn small color="primary" @click="onTestClick">
          {{ $t('test') }}
        </v-btn>
      </v-flex>

      <v-flex xs8 v-show="isShownGitTest">
        <v-icon :class="[currentGitTest.class]">{{ currentGitTest.icon }}</v-icon>
        <span class="ml-2">{{ currentGitTest.message }}</span>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
  import vars from '@/util/vars'
  import actions from '@/store/actions'

  import { mapState } from 'vuex'
  import { FlowWrapper, GIT_TEST_ERROR, gitTestStatus } from '@/util/flows'
  import { flowNameRules, gitUrlRules } from '@/util/rules'
  import { subscribeTopic } from '@/store/subscribe'

  export default {
    name: 'OptionGitAccess',
    props: {
      flow: {
        required: true,
        type: Object
      }
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
        gitTestMessage: state => state.flows.gitTestMessage
      }),

      wrapper () {
        return new FlowWrapper(this.flow)
      },

      currentGitTest () {
        if (this.gitTestMessage === undefined) {
          return gitTestStatus.default
        }

        const gitTest = gitTestStatus[ this.gitTestMessage.status ] || gitTestStatus.default
        let message = gitTest.message

        if (this.gitTestMessage.status === GIT_TEST_ERROR) {
          message += ' : ' + this.gitTestMessage.error
        }

        return {
          icon: gitTest.icon,
          class: gitTest.class,
          message: message
        }
      }
    },
    methods: {
      onTestClick () {
        if (!this.$refs.gitAccessForm.validate()) {
          return
        }

        subscribeTopic.gitTest(this.$store, this.wrapper.id)
        this.isShownGitTest = true

        this.$store.dispatch(actions.flows.gitTestStart, this.wrapper).then(() => {
          this.start = true
        })
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
