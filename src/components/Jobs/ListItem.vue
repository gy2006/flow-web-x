<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <!-- Item in job list table -->
  <!-- state, build number, commit(id, branch, message), by(user), time, re-run -->
  <v-list>
    <v-list-tile>
      <v-layout row class="align-center">
        <v-flex xs1>
          <v-icon small v-bind:class="[wrapper.status.class]">{{ wrapper.status.icon }}</v-icon>
        </v-flex>

        <v-flex xs1>
          <v-list-tile-title>
            <span class="font-weight-bold"># {{ wrapper.buildNumber }}</span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small class="ml-3" v-on="on">{{ wrapper.triggerIcon }}</v-icon>
              </template>
              <span>{{ wrapper.triggerText }}</span>
            </v-tooltip>
          </v-list-tile-title>
        </v-flex>

        <v-flex xs9>
          <!-- for push and tag -->
          <v-layout align-center v-if="wrapper.trigger === TRIGGER_PUSH || wrapper.trigger === TRIGGER_TAG">
            <v-flex xs4>
              <v-list-tile-sub-title>
                <i>{{ wrapper.branch }}</i>
              </v-list-tile-sub-title>
            </v-flex>

            <v-flex xs6>
              <v-list-tile-sub-title>
                <a :href="wrapper.commitUrl" target="_blank">{{ wrapper.commitId }}</a>
                <div> {{ wrapper.commitMsg }}</div>
              </v-list-tile-sub-title>
            </v-flex>
          </v-layout>

          <!-- for pr -->
          <v-layout align-center v-if="wrapper.trigger === TRIGGER_PR_OPEN || wrapper.trigger === TRIGGER_PR_CLOSE">
            <v-flex xs4>
              <v-list-tile-sub-title>
                <div v-if="wrapper.prBaseRepo !== wrapper.prHeadRepo">
                  {{ wrapper.prBaseRepo }} < {{ wrapper.prHeadRepo}}
                </div>
                <div>{{ wrapper.prBaseBranch }} < {{ wrapper.prHeadBranch}}</div>
              </v-list-tile-sub-title>
            </v-flex>

            <v-flex xs6>
              <v-list-tile-sub-title>
                <a :href="wrapper.prUrl" target="_blank">#{{ wrapper.prNumber }}</a>
                <span class="ml-1">{{ wrapper.prTitle }}</span>
              </v-list-tile-sub-title>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs2>
          <v-list-tile-sub-title class="text-xs-left">
            <v-icon small class="mr-1">flow-icon-calendar</v-icon>
            <time>{{ wrapper.fromNow }}</time>
          </v-list-tile-sub-title>
        </v-flex>
      </v-layout>
    </v-list-tile>
  </v-list>
</template>

<script>
  import { JobWrapper, TRIGGER_PR_CLOSE, TRIGGER_PR_OPEN, TRIGGER_PUSH, TRIGGER_TAG } from '@/util/jobs'

  export default {
    data () {
      return {
        TRIGGER_PUSH,
        TRIGGER_TAG,
        TRIGGER_PR_OPEN,
        TRIGGER_PR_CLOSE,
        wrapper: new JobWrapper(this.job)
      }
    },
    props: {
      job: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
