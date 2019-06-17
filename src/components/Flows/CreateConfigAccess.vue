<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small dark color="indigo" v-on="on" @click="onCreateSSHClick">
          Create new SSH key
        </v-btn>
      </template>
      <span>{{ $t('flow.hint.ssh_create') }}</span>
    </v-tooltip>

    <v-form
        ref="form"
        lazy-validation
    >
      <v-layout>
        <v-flex xs12 sm6>
          <v-subheader>Public Key</v-subheader>
          <v-textarea
              box
              append-outer-icon="help"
              :rules="sshPublicKeyRules"
              @click:append-outer="onHelpClick('ssh_public')"
          ></v-textarea>

          <v-subheader>Private Key</v-subheader>
          <v-textarea
              box
              append-outer-icon="help"
              :rules="sshPublicKeyRules"
              @click:append-outer="onHelpClick('ssh_private')"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-form>
    <v-btn color="primary" @click="handleNextClick">{{ $t('next') }}</v-btn>
    <v-btn flat @click="onBackClick">{{ $t('back') }}</v-btn>
    <v-btn flat @click="onNextClick">{{ $t('skip') }}</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'CreateConfigAccess',
    props: {
      flow: {
        required: true,
        type: Object
      },
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
        sshPublicKeyRules: [
          v => !!v || this.$t('flow.hint.ssh_key_required'),
        ],
        sshPrivateKeyRules: [
          v => !!v || this.$t('flow.hint.ssh_key_required'),
        ]
      }
    },
    methods: {
      onHelpClick (item) {
        console.log(item)
      },

      onCreateSSHClick () {
        console.log('add ssh')
      },

      handleNextClick () {
        if (this.$refs.form.validate()) {
          this.onNextClick()
        }
      },
    }
  }
</script>

<style scoped>

</style>
