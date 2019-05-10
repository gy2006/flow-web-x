<template>
  <v-container fluid class="elevation-1 pa-2 full-height">
    <!-- header -->
    <v-layout row class="pa-1">
      <v-flex xs6 class="header">
        <h2 class="pr-4">
          <v-icon>layers</v-icon>
          {{ this.name }}
        </h2>

        <v-chip label color="" outline text-color="black" @click="yml">
          <v-icon left>settings</v-icon>
          {{ $t('flow_settings') }}
        </v-chip>
      </v-flex>
    </v-layout>

    <!-- tool bar -->
    <v-layout row justify-end>
      <v-flex xs12>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-btn
              :loading="loading"
              :disabled="loading"
              color="success"
              @click.native="jobrun">
            {{ $t('job_run_manual') }}
          </v-btn>
        </v-toolbar>
      </v-flex>
    </v-layout>

    <!-- list -->
    <v-layout row justify-center class="body">
      <v-flex xs12>
        <v-data-table
            :items="jobs"
            hide-actions
            hide-headers>

          <template slot="items" slot-scope="props">
            <td @click="onItemClick(props.item)">
              <job-item :job="props.item"></job-item>
            </td>
          </template>

          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
             Start the first build :)
            </v-alert>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <!-- pagination -->
    <v-layout row justify-center>
      <v-flex xs12 class="text-xs-center">
        <v-pagination
            v-model="pagination.page"
            @input="onPageChange"
            :length="pagination.totalPages"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {jobsList} from '@/api/axios/api'
  import JobItem from '@/components/Jobs/JobItem'
  import actions from '@/store/actions'
  import {mapState} from 'vuex'

  export default {
    name: 'Jobs',
    data () {
      return {
        name: '', // flow name
        loading: false,
        alert: false,
      }
    },
    components: {
      JobItem
    },
    mounted () {
      this.name = this.$route.params.id
      this.$store.dispatch(actions.job.list, this.name).then()
    },
    computed: {
      ...mapState({
        pagination: state => state.jobs.pagination,
        jobs: state => state.jobs.items,
        jobsStatus: state => state.jobs.JobsStatus
      }),

      pages() {
        console.log(this.pagination)
        return this.pagination.totalPages
      }
    },
    methods: {
      onItemClick (job) {
        this.$router.push({path: `/flows/${this.name}/jobs/${job.buildNumber}`})
      },

      // 工作流设置
      yml () {
        this.$router.push({path: `/flows/${this.name}/yml`})
      },

      onPageChange (page) {
        console.log(page)
      }
    },
    watch: {
      //  每次监听到路由变换的时候 渲染不同的JOBS
      $route (to, form) {
        jobsList(this.$route.params.id, this.size, 0).then(res => {
          this.pages = res.data.data.totalPages
          this.jobs = res.data.data.content
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
  }

  .body {
    height: 78%;
  }

  .alert {
    position: absolute;
    width: 100%;
    z-index: 1000;
  }

</style>
