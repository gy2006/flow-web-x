<template>
  <v-card-text class="pt-0">
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field label="Name"
                      readonly
                      v-model="name"
        ></v-text-field>
      </v-flex>

      <v-flex xs8 v-if="isSshRsa">
        <ssh-rsa-editor :show-help="false"
                        :show-create-new="false"
                        :is-read-only="true"
                        :module="credentialModule"
        ></ssh-rsa-editor>
      </v-flex>

      <v-flex xs8 d-flex>
        <v-dialog
            v-model="dialog"
            width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn
                outline
                color="error"
                v-on="on"
            >{{ $t('delete') }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title
                class="red--text subheading"
                primary-title
            >Delete credential {{ name }}?
            </v-card-title>

            <!-- list the flows which are connected with credential -->
            <v-card-text>
              <v-flex>
                You are going to credential {{ name }}.
                Removed credential CANNOT be restored!
              </v-flex>

              <v-flex class="mt-3 red--text" v-if="connectedFlows.length > 0">
                <span>The following flow will be affected!</span>

                <ul>
                  <li v-for="flow in connectedFlows"
                      :key="flow.id"
                  >{{ flow.name }}
                  </li>
                </ul>
              </v-flex>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="dialog = false">{{ $t('cancel') }}</v-btn>
              <v-btn outline color="error" @click="onDeleteClick">{{ $t('delete') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn outline color="warning" @click="onBackClick">{{ $t('back') }}</v-btn>
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
  import actions from '@/store/actions'
  import SshRsaEditor from '@/components/Common/SshRsaEditor'
  import { CATEGORY_SSH_RSA } from '@/util/credentials'
  import { mapState } from 'vuex'

  export default {
    name: 'SettingsCredentialEdit',
    components: {
      SshRsaEditor
    },
    props: {
      credentialObj: {
        type: Object,
        required: false,
        default () {
          return {
            name: '',
            privateKey: '',
            publicKey: ''
          }
        }
      }
    },
    data () {
      return {
        dialog: false,
        credentialModule: {
          selected: '',
          pair: this.credentialObj.pair
        }
      }
    },
    mounted () {
      this.$emit('onConfigNav', {
        navs: this.navs,
        showAddBtn: false
      })
      this.$store.dispatch(actions.flows.listByCredential, this.name).then()
    },
    computed: {
      ...mapState({
        connectedFlows: state => state.flows.itemsByCredential
      }),

      navs () {
        return [
          {
            text: 'Credentials',
            href: '#/settings/credentials'
          },
          {
            text: 'Edit'
          },
          {
            text: this.name
          }
        ]
      },

      name () {
        return this.credentialObj.name
      },

      isSshRsa () {
        return this.credentialObj.category === CATEGORY_SSH_RSA
      }
    },
    methods: {
      onBackClick () {
        this.$router.push('/settings/credentials')
      },

      onDeleteClick () {
        this.$store.dispatch(actions.credentials.delete, this.credentialObj).then(() => {
          this.onBackClick()
        })
      }
    }
  }
</script>

<style scoped>

</style>
