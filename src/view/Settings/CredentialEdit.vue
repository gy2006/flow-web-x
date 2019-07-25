<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-card-text class="pt-0">
        <v-layout row wrap>
          <v-flex xs8>
            <v-form ref="nameForm" lazy-validation>
              <v-text-field label="Name"
                            :rules="nameRules"
                            v-model="loaded.name"
              ></v-text-field>
            </v-form>
          </v-flex>

          <v-flex xs8 v-if="isSshRsa">
            <v-form ref="sshForm" lazy-validation>
              <ssh-rsa-editor :showHelp="false" :showCreateNew="true" :keyPair="loaded"></ssh-rsa-editor>
            </v-form>
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
                    class="error--text"
                    primary-title
                >Delete credential {{ name }}?
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="dialog = false">{{ $t('cancel') }}</v-btn>
                  <v-btn outline color="error" @click="onDeleteClick">{{ $t('delete') }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn outline color="warning" @click="onBackClick">{{ $t('back') }}</v-btn>
            <v-btn color="primary" @click="onSaveClick">{{ $t('save') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card-text>
  </v-card>
</template>

<script>
  import actions from '@/store/actions'
  import SshRsaEditor from '@/components/Common/SshRsaEditor'
  import { CATEGORY_SSH_RSA } from '@/util/credentials'
  import { mapState } from 'vuex'
  import { credentialNameRules } from '@/util/rules'

  export default {
    name: 'SettingsCredentialEdit',
    components: {
      SshRsaEditor
    },
    data () {
      return {
        dialog: false,
        nameRules: credentialNameRules(this)
      }
    },
    mounted () {
      this.$store.dispatch(actions.credentials.get, this.name).then()
    },
    computed: {
      ...mapState({
        loaded: state => state.credentials.loaded
      }),

      navs () {
        return [
          {
            text: 'Credentials',
            href: '#/settings/credentials'
          },
          {
            text: this.name
          }
        ]
      },

      name () {
        return this.$route.params.name
      },

      isSshRsa () {
        return this.loaded.category === CATEGORY_SSH_RSA
      }
    },
    watch: {
      name (newValue) {
        this.$store.dispatch(actions.credentials.get, newValue).then()
      }
    },
    methods: {
      onBackClick () {
        this.$router.push('/settings/credentials')
      },

      onDeleteClick () {

      },

      onSaveClick () {

      }
    }
  }
</script>

<style scoped>

</style>