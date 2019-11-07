<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-form ref="sshForm" lazy-validation>
          <ssh-rsa-editor :show-help="true"
                          :show-create-new="true"
                          :show-selection="true"
                          :module="credential"
          ></ssh-rsa-editor>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="1">
        <v-btn small
               color="primary"
               @click="handleNextClick"
        >{{ $t('next') }}</v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn small
               outlined
               color="warning"
               @click="onBackClick"
        >{{ $t('back') }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import SshRsaEditor from '../Common/SshRsaEditor'

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
        credential: {
          pair: {
            publicKey: '',
            privateKey: ''
          },
          selected: ''
        }
      }
    },
    components: {
      SshRsaEditor
    },
    methods: {
      handleNextClick () {
        if (this.$refs.sshForm.validate()) {
          this.onNextClick(this.credential)
        }
      }
    }
  }
</script>

<style scoped>

</style>
