<template>
  <v-card height='100%' class="ma-2">
    <v-card-title>
      <div>
        <v-icon small v-bind:class="[wrapper.status.class]">{{ wrapper.status.icon }}</v-icon>
      </div>
      <div class="font-weight-black title ml-3">
        <span>{{ this.flow }}</span>
        <span class="ml-1">#{{ this.number }}</span>
      </div>
      <v-spacer/>
      <v-btn color="orange darken-2" dark @click="onBackClick">
        <v-icon dark left>arrow_back</v-icon>
        {{ $t('back') }}
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-tabs fixed-tabs>
        <v-tab href="#info" class="ml-0">
          {{ $t('job_detail_tab_info') }}
        </v-tab>
        <v-tab href="#logs">
          {{ $t('job_detail_tab_logs') }}
        </v-tab>

        <v-tab-item value="info">
          <job-info :wrapper="wrapper"></job-info>
        </v-tab-item>
        <v-tab-item value="logs">
          logs
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
  import actions from '@/store/actions'
  import { JobWrapper } from '@/util/jobs'
  import {mapState} from 'vuex'

  import JobInfo from '@/components/Jobs/Info'

  export default {
    name: 'JobDetail',
    data () {
      return {
        flow: null, // flow name
        number: null, // job build number
        wrapper: new JobWrapper({})
      }
    },
    components: {
      JobInfo
    },
    mounted () {
      this.flow = this.$route.params.id
      this.number = this.$route.params.num
      this.$store.dispatch(actions.jobs.select, {flow: this.flow, buildNumber: this.number}).then(() => {
        this.wrapper = new JobWrapper(this.job)
      })
    },
    computed: {
      ...mapState({
        job: state => state.jobs.selected
      })
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
