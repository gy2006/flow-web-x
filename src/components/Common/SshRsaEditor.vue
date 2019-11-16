<template>
  <div>
    <v-row align="center">
      <v-col>
        <span class="body-2 grey--text">SSH-RSA Key Pair</span>
        <div v-if="showSelection">
          <v-radio-group v-model="option" row>
            <v-radio label="Select" value="select"></v-radio>
            <v-radio label="Edit or Create" value="edit"></v-radio>
          </v-radio-group>
        </div>
      </v-col>
    </v-row>

    <div v-if="showSelection & isSelectOption">
      <v-select
          dense
          v-model="model.selected"
          :items="names"
          label="Select Credential"
      ></v-select>
    </div>

    <div v-if="isEditOption">
      <v-dialog v-model="dialog" persistent max-width="30%" v-if="showCreateNew && !isReadOnly">
        <template v-slot:activator="{ on }">
          <v-btn small
                 outlined
                 v-on="on"
                 color="indigo"
                 open-delay="2000"
                 @click="dialog = true">
            Create new SSH key
            <v-icon right small>mdi-plus-box</v-icon>
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
            <v-btn color="error" outlined @click="dialog = false">{{ $t('close') }}</v-btn>
            <v-btn color="primary" outlined @click="onCreateSSHClick">{{ $t('create') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-flex class="mt-1">
        <v-textarea
            filled
            label="Public Key"
            rows="4"
            class="font-weight-medium caption"
            :rules="sshPublicKeyRules"
            :append-outer-icon="showHelp ? 'mdi-help-circle-outline' : ''"
            v-model="model.pair.publicKey"
            :readonly="isReadOnly"
            @click:append-outer="onHelpClick('ssh_public')"
        ></v-textarea>
      </v-flex>

      <v-flex>
        <v-textarea
            filled
            class="font-weight-medium caption"
            label="Private Key"
            rows="8"
            :rules="sshPrivateKeyRules"
            :append-outer-icon="showHelp ? 'mdi-help-circle-outline' : ''"
            v-model="model.pair.privateKey"
            :readonly="isReadOnly"
            @click:append-outer="onHelpClick('ssh_private')"
        ></v-textarea>
      </v-flex>
    </div>
  </div>
</template>

<script>
  import actions from '@/store/actions'
  import { mapState } from 'vuex'
  import { CATEGORY_SSH_RSA } from '@/util/credentials'
  import { sshEmailRules, sshPrivateKeyRules, sshPublicKeyRules } from '@/util/rules'

  export default {
    name: 'SshRsaEditor',
    props: {
      /**
       * Ex:
       * {
       *   selected: ''
       *   pair: {
       *     privateKey: '',
       *     publicKey: ''
       *   }
       * }
       */
      model: {
        type: Object,
        required: true
      },
      showSelection: {
        type: Boolean,
        default () {
          return false
        }
      },
      showHelp: {
        type: Boolean,
        required: true
      },
      showCreateNew: {
        type: Boolean,
        required: true
      },
      isReadOnly: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    data () {
      return {
        email: '',
        option: 'edit',
        dialog: false,
        items: [],
        sshEmailRules: sshEmailRules(this),
        sshPublicKeyRules: sshPublicKeyRules(this),
        sshPrivateKeyRules: sshPrivateKeyRules(this)
      }
    },
    mounted () {
      if (this.showSelection) {
        this.$store.dispatch(actions.credentials.listNameOnly, CATEGORY_SSH_RSA).then()
      }
    },
    computed: {
      ...mapState({
        credentials: state => state.credentials.items,
        sshRsa: state => state.flows.sshRsa
      }),

      names () {
        const nameList = []
        for (let c of this.credentials) {
          nameList.push(c.name)
        }
        return nameList
      },

      isSelectOption () {
        return this.option === 'select'
      },

      isEditOption () {
        return this.option === 'edit'
      }
    },
    watch: {
      sshRsa (newValue) {
        Object.assign(this.model.pair, newValue)
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
