<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <!-- Item in job list table -->
  <!-- state, build number, commit(id, branch, message), by(user), time, re-run -->
  <v-list>
    <v-list-tile>
      <v-layout row class="align-center">
        <v-flex xs1>
          <v-icon small v-bind:class="[status.class]">{{ status.icon }}</v-icon>
        </v-flex>

        <v-flex xs1>
          <v-list-tile-title>
            <span class="font-weight-bold"># {{ buildNumber }}</span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon small class="ml-1" v-on="on">{{ trigger.icon }}</v-icon>
              </template>
              <span>{{ trigger.text }}</span>
            </v-tooltip>
          </v-list-tile-title>
        </v-flex>

        <v-flex xs2>
          <v-list-tile-sub-title>
            <v-icon small class="mr-1">flow-icon-git-branch</v-icon>
            <i>{{ branch }}</i>
          </v-list-tile-sub-title>
        </v-flex>

        <v-flex xs3>
          <v-list-tile-sub-title>
            <v-icon small class="mr-1">flow-icon-git-commit</v-icon>
            <a>{{ commitId }}</a>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title>
            {{ commitMsg }}
          </v-list-tile-sub-title>
        </v-flex>

        <v-flex xs2></v-flex>

        <v-flex xs2>
          <v-list-tile-sub-title class="text-xs-left">
            <v-icon small class="mr-1">flow-icon-calendar</v-icon>
            <time>{{ fromNow }}</time>
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
  import moment from 'moment'
  import vars from '@/util/vars'
  import { mapping } from '@/util/jobs'

  export default {
    data () {
      return {}
    },
    props: {
      job: {
        type: Object,
        required: true
      }
    },

    computed: {
      status () {
        return mapping.status[this.job.status]
      },

      trigger () {
        return mapping.trigger[this.job.trigger]
      },

      buildNumber () {
        return this.job.buildNumber
      },

      branch () {
        return this.job.context[vars.git.branch]
      },

      commitId () {
        return this.job.context[vars.git.commit.id]
      },

      commitMsg () {
        return this.job.context[vars.git.commit.message]
      },

      fromNow() {
        return moment(this.job.createdAt).fromNow()
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>
