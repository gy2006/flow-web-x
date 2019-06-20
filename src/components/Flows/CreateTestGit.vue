<template>
  <div>
    <v-layout row class="mb-2" v-show="start">
      <v-flex xs4>
        <v-icon :class="[state.FETCHING.class]">
          {{ state.FETCHING.icon }}
        </v-icon>
        <span class="ml-3">{{ state.FETCHING.message }}</span>
      </v-flex>
    </v-layout>
    <v-btn color="primary" @click="handleTestClick">{{ $t('test') }}</v-btn>
    <v-btn flat @click="onSkipClick">{{ $t('skip') }}</v-btn>
  </div>
</template>

<script>
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
      },
      onSkipClick: {
        required: true,
        type: Function
      }
    },
    data () {
      return {
        start: false,
        state: {
          FETCHING: {
            class: [ 'amber--text', 'rotate' ],
            icon: 'flow-icon-loading1',
            message: 'Testing'
          },

          DONE: {
            icon: 'flow-icon-circle-check',
            class: [ 'green--text' ],
            message: 'Done'
          },

          ERROR: {
            icon: 'flow-icon-cross',
            class: [ 'red--text' ],
            message: 'Error'
          }
        }
      }
    },
    methods: {
      handleTestClick () {
        this.start = true
      }
    }
  }
</script>

<style scoped>

</style>
