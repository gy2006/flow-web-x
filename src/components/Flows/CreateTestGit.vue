<template>
  <div>
    <v-layout row class="mb-2" v-show="start">
      <v-flex xs4>
        <v-icon :class="[current.class]">
          {{ current.icon }}
        </v-icon>
        <span class="ml-3">{{ current.message }}</span>
      </v-flex>
    </v-layout>

    <!-- test button -->
    <v-btn color="primary"
           @click="handleTestClick"
           :disabled="start"
           v-if="isShowTestBtn"
    >
      {{ $t('test') }}
    </v-btn>

    <!-- save button -->
    <v-btn
        color="primary"
        @click="handleSaveClick"
        v-if="isShowSaveBtn"
    >
      {{ $t('save') }}
    </v-btn>

    <!-- back button -->
    <v-btn
        color="primary"
        @click="onBackClick"
        v-if="isShowBackBtn"
    >
      {{ $t('back') }}
    </v-btn>
    <v-btn flat @click="handleSkipClick">{{ $t('skip') }}</v-btn>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import { subscribeTopic, unsubsribeTopic } from '@/store/subscribe'
  import { GIT_TEST_DONE, GIT_TEST_ERROR, GIT_TEST_FETCHING, gitTestStatus } from '@/util/flows'

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
        start: false
      }
    },
    computed: {
      ...mapState({
        errors: state => state.errors.items,
        gitTestMessage: state => state.flows.gitTestMessage
      }),

      current () {
        if (this.gitTestMessage === undefined) {
          return gitTestStatus.default
        }

        return gitTestStatus[ this.gitTestMessage.status ] || gitTestStatus.default
      },

      isShowTestBtn () {
        if (this.gitTestMessage === undefined) {
          return true
        }

        return this.gitTestMessage.status === GIT_TEST_FETCHING;
      },

      isShowSaveBtn () {
        if (this.gitTestMessage === undefined) {
          return false
        }

        return this.gitTestMessage.status === GIT_TEST_DONE;
      },

      isShowBackBtn () {
        if (this.gitTestMessage === undefined) {
          return false
        }

        return this.gitTestMessage.status === GIT_TEST_ERROR;
      }
    },
    methods: {
      handleTestClick () {
        // subscribe
        subscribeTopic.gitTest(this.$store, this.flow.id)

        // send git test request
        this.$store.dispatch(actions.flows.gitTestStart, this.flow).then(() => {
          this.start = true
        })
      },

      handleSaveClick () {
        this.onNextClick()
      },

      handleSkipClick () {
        unsubsribeTopic.gitTest(this.flow.id)
        this.onSkipClick()
      }
    }
  }
</script>

<style scoped>

</style>
