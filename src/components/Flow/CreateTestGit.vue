<template>
  <div>
    <!-- finish button -->
    <v-btn small color="primary" @click="handleFinishClick">{{ $t('flow.create_btn_finish') }}</v-btn>

    <!-- back button -->
    <v-btn small flat @click="onBackClick">{{ $t('back') }}</v-btn>

    <!-- test button -->
    <git-test-btn :wrapper="flow"></git-test-btn>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import GitTestBtn from '@/components/Flow/GitTestBtn'

  export default {
    name: 'CreateTestGit',
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
    components: {
      GitTestBtn
    },
    data () {
      return {
        start: false
      }
    },
    computed: {
      ...mapState({
        errors: state => state.errors.items,
      })
    },
    methods: {
      handleFinishClick () {
        this.onNextClick()
      }
    }
  }
</script>

<style scoped>

</style>
