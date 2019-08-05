<template>
  <div>
    <v-form ref="sshForm" lazy-validation>
      <v-layout>
        <v-flex xs6>
          <ssh-rsa-editor :show-help="true"
                          :show-create-new="true"
                          :show-selection="true"
                          :module="credential"
          ></ssh-rsa-editor>
        </v-flex>
      </v-layout>
    </v-form>
    <v-btn small color="primary" @click="handleNextClick">{{ $t('next') }}</v-btn>
    <v-btn small flat @click="onBackClick">{{ $t('back') }}</v-btn>
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
