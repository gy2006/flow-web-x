<template>
  <v-card>
    <v-card-title class="pb-0">
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

        <v-flex xs8 v-if="category === ssh_rsa">
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
  import { CATEGORY_SSH_RSA } from '@/util/credentials'
  import { credentialNameRules } from '@/util/rules'

  export default {
    name: 'SettingsCredentialNew',
    components: {
      SshRsaEditor
    },
    data () {
      return {
        ssh_rsa: CATEGORY_SSH_RSA,
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
      }
    },
    methods: {
      onBackClick () {
        this.$router.push('/settings/credentials')
      },

      onSaveClick () {
        if (this.$refs.nameForm.validate() && this.$refs.sshForm.validate()) {
          console.log(this.instance)
          this.onBackClick()
        }
      }
    }
  }
</script>

<style scoped>

</style>