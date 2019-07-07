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
                <v-icon small class="ml-1" v-on="on">{{ wrapper.trigger.icon }}</v-icon>
              </template>
              <span>{{ wrapper.trigger.text }}</span>
            </v-tooltip>
          </v-list-tile-title>
        </v-flex>

        <v-flex xs2>
          <v-list-tile-sub-title>
            <v-icon small class="mr-1">flow-icon-git-branch</v-icon>
            <i>{{ wrapper.branch }}</i>
          </v-list-tile-sub-title>
        </v-flex>

        <v-flex xs3>
          <v-list-tile-sub-title>
            <v-icon small class="mr-1">flow-icon-git-commit</v-icon>
            <a>{{ wrapper.commitId }}</a>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title>
            {{ wrapper.commitMsg }}
          </v-list-tile-sub-title>
        </v-flex>

        <v-flex xs3></v-flex>

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
