<template>
  <v-card>
    <v-card-title class="pb-0 bottom-border">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-layout row wrap>
        <v-flex xs8>
          <v-form ref="nameForm" lazy-validation>
            <v-text-field label="Name"
                          :rules="nameRules"
                          v-model="instance.name"
            ></v-text-field>
          </v-form>
        </v-flex>

        <v-flex xs8 v-if="isSshRsa">
          <v-form ref="sshForm" lazy-validation>
            <ssh-rsa-editor :showHelp="false" :showCreateNew="true" :keyPair="instance"></ssh-rsa-editor>
          </v-form>
        </v-flex>

        <v-flex xs8 d-flex>
          <v-btn outline color="warning" @click="onBackClick">{{ $t('back') }}</v-btn>
          <v-btn color="primary" @click="onSaveClick">{{ $t('save') }}</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  import SshRsaEditor from '@/components/Common/SshRsaEditor'
  import actions from '@/store/actions'
  import { CATEGORY_SSH_RSA } from '@/util/credentials'
  import { credentialNameRules } from '@/util/rules'

  export default {
    name: 'SettingsCredentialNew',
    components: {
      SshRsaEditor
    },
    data () {
      return {
        nameRules: credentialNameRules(this),
        credential: {
          [CATEGORY_SSH_RSA]: {
            name: '',
            category: CATEGORY_SSH_RSA,
            publicKey: '',
            privateKey: ''
          }
        }
      }
    },
    computed: {
      navs () {
        return [
          {
            text: 'Credentials',
            href: '#/settings/credentials'
          },
          {
            text: 'New - ' + this.category
          }
        ]
      },

      instance () {
        return this.credential[this.category]
      },

      category () {
        return this.$route.params.category.toUpperCase()
      },

      isSshRsa () {
        return this.category === CATEGORY_SSH_RSA
      }
    },
    methods: {
      onBackClick () {
        this.$router.push('/settings/credentials')
      },

      onSaveClick () {
        if (this.$refs.nameForm.validate() && this.$refs.sshForm.validate()) {
          this.$store.dispatch(actions.credentials.create, this.instance).then(() => {
            this.onBackClick()
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
