<template>
  <v-card height='100%' width="100%">
    <v-card-title>
      <div>
        <v-icon v-bind:class="[status.class]">{{ status.icon }}</v-icon>
      </div>
      <div>构建</div>
      <v-spacer/>
      <v-btn color="orange darken-2" dark @click="onBackClick">
        <v-icon dark left>arrow_back</v-icon>
        {{ $t('back' )}}
      </v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
  import actions from '@/store/actions'
  import mapping from '@/util/jobs/mapping'
  import { mapState } from 'vuex'

  export default {
    name: 'JobDetail',
    data () {
      return {
        flow: null, // flow name
        number: null, // job build number
      }
    },
    mounted () {
      this.flow = this.$route.params.id
      this.number = this.$route.params.num
      this.$store.dispatch(actions.jobs.select, {flow: this.flow, buildNumber: this.number}).then()
    },
    computed: {
      ...mapState({
        job: state => state.jobs.selected
      }),
      status () {
        return mapping.status[this.job.status]
      },
    },
    methods: {
      onBackClick () {
        this.$router.push({path: `/flows/${this.flow}/jobs`})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
