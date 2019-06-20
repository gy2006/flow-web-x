<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-dialog v-model="dialog" persistent max-width="40%">
      <template v-slot:activator="{ on }">
        <v-btn small
               v-on="on"
               color="indigo"
               class="mb-3"
               open-delay="2000"
               :dark="!isCreated"
               :disabled="isCreated"
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

    <v-form ref="sshForm" lazy-validation>
      <v-layout>
        <v-flex xs12 sm6>
          <v-textarea
              box
              label="Public Key"
              rows="4"
              class="font-weight-medium caption"
              append-outer-icon="help"
              :rules="sshPublicKeyRules"
              v-model="sshRsa.publicKey"
              @click:append-outer="onHelpClick('ssh_public')"
          ></v-textarea>

          <v-textarea
              box
              class="font-weight-medium caption"
              label="Private Key"
              rows="8"
              append-outer-icon="help"
              :rules="sshPrivateKeyRules"
              v-model="sshRsa.privateKey"
              @click:append-outer="onHelpClick('ssh_private')"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-form>
    <v-btn color="primary" @click="handleNextClick">{{ $t('next') }}</v-btn>
    <v-btn flat @click="onBackClick">{{ $t('back') }}</v-btn>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'

  export default {
    name: 'CreateConfigAccess',
    props: {
      onBackClick: {
        required: true,
        type: Function
      },
      onNextClick: {
        required: true,
        type: Function
      }
    },
    data () {
      return {
        email: '',
        isCreated: false,
        dialog: false,
        sshEmailRules: [
          v => !!v || this.$t('flow.hint.ssh_email_required')
        ],
        sshPublicKeyRules: [
          v => !!v || this.$t('flow.hint.ssh_key_required'),
          v => (/(^ssh-rsa)/g.test(v)) || this.$t('flow.hint.ssh_public_format')
        ],
        sshPrivateKeyRules: [
          v => !!v || this.$t('flow.hint.ssh_key_required'),
          v => (/(^-----BEGIN RSA PRIVATE KEY-----)/g.test(v)) || this.$t('flow.hint.ssh_private_format')
        ]
      }
    },
    computed: {
      ...mapState({
        sshRsa: state => state.flows.sshRsa,
        errors: state => state.errors.items
      })
    },
    methods: {
      onHelpClick (item) {
        console.log(item)
      },

      onCreateSSHClick () {
        if (!this.$refs.emailForm.validate()) {
          return
        }

        this.dialog = false
        this.isCreated = true

        this.$store.dispatch(actions.flows.createSshRsa, this.email).then(() => {
          if (this.errors.length > 0) {
            this.isCreated = false
          }
        })
      },

      handleNextClick () {
        if (this.$refs.sshForm.validate()) {
          this.onNextClick(this.sshRsa)
        }
      }
    }
  }
</script>

<style scoped>

</style>
