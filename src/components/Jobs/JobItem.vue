<template>
  <!-- Item in job list table -->
  <!-- state, build number, commit(id, branch, message), by(user), time, re-run -->
  <v-list two-line>
    <v-list-tile>
      <v-list-tile-avatar>
        <v-icon class="green--text">done</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title class="font-weight-bold"># {{ job.buildNumber }}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-content>
        <v-list-tile-sub-title>
          <v-icon small class="mr-1">flow-icon flow-icon-git-branch</v-icon>
          <i>master</i>
        </v-list-tile-sub-title>
      </v-list-tile-content>

      <v-list-tile-content>
        <v-list-tile-sub-title>
          <v-icon small class="mr-1">flow-icon flow-icon-git-commit</v-icon>
          <a>eebd7b17</a>
        </v-list-tile-sub-title>
        <v-list-tile-sub-title>
          Initial commit
        </v-list-tile-sub-title>
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
    methods: {
      toDetail (val) {
        this.$router.push({path: `/flows/${this.$route.params.id}/jobs/${val.buildNumber}`})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
