<template>
  <div>
    <v-card color="grey lighten-1" class="mb-5" height="200px">
      config git
    </v-card>
    <v-btn color="primary" @click="handleNextClick">{{ $t('next') }}</v-btn>
    <v-btn flat @click="onBackClick">{{ $t('back') }}</v-btn>
    <v-btn flat @click="onNextClick">{{ $t('skip') }}</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'CreateConfigGit',
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
    methods: {
      handleNextClick () {
        this.onNextClick()
      }
    }
  }
</script>

<style scoped>

</style>