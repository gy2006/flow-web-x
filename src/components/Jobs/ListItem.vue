<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <!-- Item in job list table -->
  <!-- state, build number, commit(id, branch, message), by(user), time, re-run -->
  <v-list>
    <v-list-item>
      <v-layout row class="align-center">
        <v-flex xs1>
          <v-icon small v-bind:class="[wrapper.status.class]">{{ wrapper.status.icon }}</v-icon>
        </v-flex>

        <v-flex xs1>
          <v-list-item-title>
            <span class="font-weight-bold"># {{ wrapper.buildNumber }}</span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small class="ml-3" v-on="on">{{ wrapper.triggerIcon }}</v-icon>
              </template>
              <span>{{ wrapper.triggerText }}</span>
            </v-tooltip>
          </v-list-item-title>
        </v-flex>

        <v-flex xs9>
          <!-- for push and tag -->
          <v-layout align-center v-if="wrapper.isPushTrigger || wrapper.isTagTrigger">
            <v-flex xs4>
              <v-list-item-subtitle>
                <i>{{ wrapper.branch }}</i>
              </v-list-item-subtitle>
            </v-flex>

            <v-flex xs6>
              <v-list-item-subtitle>
                <a :href="wrapper.commitUrl" target="_blank">{{ wrapper.commitId }}</a>
                <div> {{ wrapper.commitMsg }}</div>
              </v-list-item-subtitle>
            </v-flex>
          </v-layout>

          <!-- for pr -->
          <v-layout align-center v-if="wrapper.isPrOpenedTrigger || wrapper.isPrMergedTrigger">
            <v-flex xs4>
              <v-list-item-subtitle>
                <div v-if="wrapper.prBaseRepo !== wrapper.prHeadRepo">
                  {{ wrapper.prBaseRepo }} &#x2190; {{ wrapper.prHeadRepo}}
                </div>
                <div>{{ wrapper.prBaseBranch }} &#x2190; {{ wrapper.prHeadBranch}}</div>
              </v-list-item-subtitle>
            </v-flex>

            <v-flex xs6>
              <v-list-item-subtitle>
                <a :href="wrapper.prUrl" target="_blank">#{{ wrapper.prNumber }}</a>
                <span class="ml-1">{{ wrapper.prTitle }}</span>
              </v-list-item-subtitle>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs2>
          <v-list-item-subtitle class="text-xs-left">
            <v-icon small class="mr-1">flow-icon-calendar</v-icon>
            <time>{{ wrapper.fromNow }}</time>
          </v-list-item-subtitle>
        </v-flex>
      </v-layout>
    </v-list-item>
  </v-list>
</template>

<script>
  import { JobWrapper } from '@/util/jobs'

  export default {
    data () {
      return {
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
