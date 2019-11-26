<template>
  <v-row align="start" justify="start">
    <v-col v-for="flow in items"
           :key="flow.name"
           cols="3"
    >
      <summary-card :wrapper="flow"/>
    </v-col>
  </v-row>
</template>

<script>
  import SummaryCard from '@/components/Flow/SummaryCard'
  import { toWrapperList } from '@/util/flows'
  import { mapState } from 'vuex'

  export default {
    name: 'FlowOverview',
    components: {
      SummaryCard
    },
    data () {
      return {
        items: []
      }
    },
    mounted() {
      this.items = toWrapperList(this.flows)
      this.setLatestJobs()
    },
    computed: {
      ...mapState({
        flows: state => state.flows.items,
        latest: state => state.jobs.latest
      })
    },
    watch: {
      flows (after) {
        this.items = toWrapperList(after)
      },

      latest (after) {
        this.setLatestJobs()
      }
    },
    methods: {
      setLatestJobs() {
        for (let wrapper of this.items) {
          for (let latestJob of this.latest) {
            if (wrapper.id === latestJob.flowId) {
              wrapper.latestJob = latestJob
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
