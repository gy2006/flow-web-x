<template>
  <div>
    <v-form ref="sshForm" lazy-validation>
      <v-layout>
        <v-flex xs6>
          <ssh-rsa-editor :show-help="true" :show-create-new="true" :key-pair="keyPair"></ssh-rsa-editor>
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
        keyPair: {
          publicKey: '',
          privateKey: ''
        }
      }
    },
    components: {
      SshRsaEditor
    },
    methods: {
      handleNextClick () {
        if (this.$refs.sshForm.validate()) {
          this.onNextClick(this.keyPair)
        }
      }
    }
  }
</script>

<style scoped>

</style>
