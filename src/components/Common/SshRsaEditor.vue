<template>
  <div>
    <v-flex d-flex align-center>
      <span class="sub-content">SSH-RSA Key Pair</span>
      <v-dialog v-model="dialog" persistent max-width="30%" v-if="showCreateNew">
        <template v-slot:activator="{ on }">
          <v-btn small
                 outline
                 v-on="on"
                 color="indigo"
                 open-delay="2000"
                 @click="dialog = true">
            Create new SSH key
            <v-icon right small>add</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="subheading">{{ $t('flow.hint.ssh_email_title') }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="emailForm" lazy-validation>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                      label="Email"
                      :rules="sshEmailRules"
                      v-model="email">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">{{ $t('close') }}</v-btn>
            <v-btn color="blue darken-1" flat @click="onCreateSSHClick">{{ $t('create') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>

    <v-flex class="mt-1">
      <v-textarea
          box
          label="Public Key"
          rows="4"
          class="font-weight-medium caption"
          :rules="sshPublicKeyRules"
          :append-outer-icon="showHelp ? 'help' : ''"
          v-model="keyPair.publicKey"
          @click:append-outer="onHelpClick('ssh_public')"
      ></v-textarea>
    </v-flex>

    <v-flex>
      <v-textarea
          box
          class="font-weight-medium caption"
          label="Private Key"
          rows="8"
          :rules="sshPrivateKeyRules"
          :append-outer-icon="showHelp ? 'help' : ''"
          v-model="keyPair.privateKey"
          @click:append-outer="onHelpClick('ssh_private')"
      ></v-textarea>
    </v-flex>
  </div>
</template>

<script>
  import actions from '@/store/actions'
  import { mapState } from 'vuex'
  import { sshEmailRules, sshPrivateKeyRules, sshPublicKeyRules } from '@/util/rules'

  export default {
    name: 'SshRsaEditor',
    props: {
      keyPair: {
        type: Object,
        required: true
      },
      showHelp: {
        type: Boolean,
        required: true
      },
      showCreateNew: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        email: '',
        dialog: false,
        sshEmailRules: sshEmailRules(this),
        sshPublicKeyRules: sshPublicKeyRules(this),
        sshPrivateKeyRules: sshPrivateKeyRules(this)
      }
    },
    computed: {
      ...mapState({
        sshRsa: state => state.flows.sshRsa,
        errors: state => state.errors.items
      })
    },
    watch: {
      sshRsa (newValue) {
        Object.assign(this.keyPair, newValue)
      }
    },
    methods: {
      onCreateSSHClick () {
        if (!this.$refs.emailForm.validate()) {
          return
        }

        this.dialog = false
        this.$store.dispatch(actions.flows.createSshRsa, this.email).then()
      },

      onHelpClick () {

      }
    }
  }
</script>

<style scoped>

</style>