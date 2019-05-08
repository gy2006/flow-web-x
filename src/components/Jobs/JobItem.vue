<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <!-- Item in job list table -->
  <!-- state, build number, commit(id, branch, message), by(user), time, re-run -->
  <v-list two-line>
    <v-list-tile>
      <v-list-tile-avatar>
        <v-icon class="green--text" v-text="'$vuetify.icons.job-success'"></v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>
          <span class="font-weight-bold"># {{ job.buildNumber }}</span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon small class="ml-1" v-on="on" v-text="'$vuetify.icons.trigger-push'"/>
            </template>
            <span>push</span>
          </v-tooltip>
        </v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-content>
        <v-list-tile-sub-title>
          <v-icon small class="mr-1" v-text="'$vuetify.icons.git-branch'"/>
          <i>master</i>
        </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-content>
        <v-list-tile-sub-title>
          <v-icon small class="mr-1" v-text="'$vuetify.icons.git-commit'"/>
          <a>eebd7b17</a>
        </v-list-tile-sub-title>
        <v-list-tile-sub-title>
          Initial commit
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
          <v-icon small class="mr-1" v-text="'$vuetify.icons.date'"></v-icon>
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
  export default {
    data () {
      return {
        mapping: {
          status: {
            'QUEUED': {
              icon: 'job-queued',
              color: 'green--text'
            },

            'RUNNING': {
              icon: 'job-running',
              color: 'green--text'
            },

            'SUCCESS': {
              icon: 'job-success',
              color: 'green--text'
            },

            'FAILURE': {
              icon: 'job-failure',
              color: 'green--text'
            },

            'CANCELLED': {
              icon: 'job-cancelled',
              color: 'green--text'
            },

            'TIMEOUT': {
              icon: 'job-timeout',
              color: 'green--text'
            }
          },

          trigger: {

          }
        }
      }
    },
    props: {
      job: {
        type: Object,
        required: true
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

</style>
