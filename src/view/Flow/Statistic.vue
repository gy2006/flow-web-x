<template>
  <v-card class="full-size flow-statistic">
    <v-card-title>
      <Nav
          :items="[name, 'statistic']"
          :links="['jobs', 'settings']"
      ></Nav>
    </v-card-title>

    <v-card-text class="pt-0 tab-wrapper">
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import Nav from '@/components/Common/Nav'

  export default {
    name: 'FlowStatistic',
    components: {
      Nav,
    },
    computed: {
      ...mapState({
        flow: state => state.flows.selected.obj,
      }),
      name () {
        return this.$route.params.id
      }
    },
    watch: {
      name (after) {
        if (after !== this.flow.name) {
          this.$store.dispatch(actions.flows.select, after).then()
        }
      }
    },
  }
</script>

<style scoped>

</style>