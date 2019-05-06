<template>
    <!-- Item in job list table -->
    <!-- state, build number, commit(id, branch, message), by(user), time, re-run -->
    <v-list>
      <v-list-tile>
        <v-icon class="green--text">done</v-icon>
      </v-list-tile>
    </v-list>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      job: {
        type: Object,
        default: undefined
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
