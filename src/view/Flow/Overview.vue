<template>
  <v-row align="start" justify="start">
    <v-col v-for="flow in flows"
           :key="flow.name"
           cols="3"
    >
      <summary-card :flow="flow"/>
    </v-col>
  </v-row>
</template>

<script>
  import SummaryCard from '@/components/Flow/SummaryCard'
  import { mapState } from 'vuex'

  export default {
    name: 'FlowOverview',
    components: {
      SummaryCard
    },
    computed: {
      ...mapState({
        flows: state => state.flows.items,
      })
    }
  }
</script>

<style scoped>

</style>
