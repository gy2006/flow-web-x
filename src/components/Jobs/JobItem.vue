<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <!-- Item in job list table -->
  <!-- state, build number, commit(id, branch, message), by(user), time, re-run -->
  <v-list two-line>
    <v-list-tile>
      <v-list-tile-avatar>
        <v-icon small v-bind:class="[status.color]">{{ status.icon }}</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>
          <span class="font-weight-bold"># {{ buildNumber }}</span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon small class="ml-1" v-on="on">{{ trigger.icon }}</v-icon>
            </template>
            <span>{{ trigger.text }}</span>
          </v-tooltip>
        </v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-content>
        <v-list-tile-sub-title>
          <v-icon small class="mr-1">flow-icon-git-branch</v-icon>
          <i>{{ branch }}</i>
        </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-content>
        <v-list-tile-sub-title>
          <v-icon small class="mr-1">flow-icon-git-commit</v-icon>
          <a>{{ commitId }}</a>
        </v-list-tile-sub-title>
        <v-list-tile-sub-title>
          {{ commitMsg }}
        </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-content>
      </v-list-tile-content>

      <v-list-tile-content>
      </v-list-tile-content>

      <v-list-tile-content>
      </v-list-tile-content>

      <v-list-tile-content>
        <v-list-tile-sub-title class="text-xs-center">
          <v-icon small class="mr-1">date_range</v-icon>
          <time datetime="May 3, 2019 11:00am GMT+0200">4 days ago</time>
        </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-icon>replay</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
  import vars from '@/util/vars'
  import mapping from './mapping'

  export default {
    data () {
      return {
      }
    },
    props: {
      job: {
        type: Object,
        required: true
      }
    },

    computed: {
      status() {
        return mapping.status[this.job.status]
      },

      trigger() {
        return mapping.trigger[this.job.trigger]
      },

      buildNumber() {
        return this.job.buildNumber
      },

      branch() {
        return this.job.context[vars.git.branch]
      },

      commitId() {
        return this.job.context[vars.git.commit.id]
      },

      commitMsg() {
        return this.job.context[vars.git.commit.message]
      }
    },

    methods: {
      toDetail (val) {
        this.$router.push({path: `/flows/${this.$route.params.id}/jobs/${val.buildNumber}`})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .status-rotate {
    -webkit-animation: running-rotate 2s linear infinite;
    -moz-animation: running-rotate 2s linear infinite;
    -ms-animation: running-rotate 2s linear infinite;
    -o-animation: running-rotate 2s linear infinite;
    animation: running-rotate 2s linear infinite;
  }

  @keyframes running-rotate {
    from {
      transform:rotate(0deg);
      -o-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    to {
      transform:rotate(360deg);
      -o-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
</style>
