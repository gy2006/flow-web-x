<template>
  <v-card
      class="mx-auto"
  >
    <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ job.status }}</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
          color="orange"
          text
      >
        Share
      </v-btn>

      <v-btn
          color="orange"
          text
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'FlowSummaryCard',
    props: {
      flow: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        job: {status: '-'}
      }
    },
    computed: {
      ...mapState({
        latest: state => state.jobs.latest
      })
    },
    watch: {
      latest: {
        handler (map) {
          console.log(map)
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped>

</style>
