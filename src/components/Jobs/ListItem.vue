<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <!-- Item in job list table -->
  <!-- state, build number, commit(id, branch, message), by(user), time, re-run -->
  <v-list>
    <v-list-tile>
      <v-layout row class="align-center">
        <v-flex xs1>
          <v-icon small v-bind:class="[helper.status.class]">{{ helper.status.icon }}</v-icon>
        </v-flex>

        <v-flex xs1>
          <v-list-tile-title>
            <span class="font-weight-bold"># {{ helper.buildNumber }}</span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small class="ml-1" v-on="on">{{ helper.trigger.icon }}</v-icon>
              </template>
              <span>{{ helper.trigger.text }}</span>
            </v-tooltip>
          </v-list-tile-title>
        </v-flex>

        <v-flex xs2>
          <v-list-tile-sub-title>
            <v-icon small class="mr-1">flow-icon-git-branch</v-icon>
            <i>{{ helper.branch }}</i>
          </v-list-tile-sub-title>
        </v-flex>

        <v-flex xs3>
          <v-list-tile-sub-title>
            <v-icon small class="mr-1">flow-icon-git-commit</v-icon>
            <a>{{ helper.commitId }}</a>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title>
            {{ helper.commitMsg }}
          </v-list-tile-sub-title>
        </v-flex>

        <v-flex xs2></v-flex>

        <v-flex xs2>
          <v-list-tile-sub-title class="text-xs-left">
            <v-icon small class="mr-1">flow-icon-calendar</v-icon>
            <time>{{ helper.fromNow }}</time>
          </v-list-tile-sub-title>
        </v-flex>

        <v-flex xs1>
          <v-icon small>replay</v-icon>
        </v-flex>
      </v-layout>
    </v-list-tile>
  </v-list>
</template>

<script>
  import { JobWrapper } from '@/util/jobs'

  export default {
    data () {
      return {
        helper: new JobWrapper(this.job)
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
