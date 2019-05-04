<template>
  <v-card height='100%' width="100%">
    <!-- 运行工作流错误状态 -->
    <v-alert
        :value="alert"
        type="error"
        transition="scale-transition"
        icon="warning"
        class="alert"
    >
      Please configure yml.
    </v-alert>
    <v-card-title>
      <h2 class="pr-4">
        <v-icon>layers</v-icon>
        {{this.name}}
      </h2>
      <v-chip label color="" outline text-color="black" @click="yml">
        <v-icon left>settings</v-icon>
        工作流设置
      </v-chip>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          :loading="loading"
          :disabled="loading"
          color="success"
          @click.native="jobrun">
        运行工作流
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <JobItem :jobs="jobs" :pages="pages" @pageChange="pageChange"></JobItem>
    </v-card-text>
  </v-card>
</template>

<script>
  import { jobsList, jobRun } from '@/api/axios/api'
  import JobItem from '@/components/Jobs/JobItem'
  import actions from '@/store/actions'
  import { mapState } from 'vuex'

  export default {
    name: 'Jobs',
    data () {
      return {
        name: '', // flow name
        loading: false,
        alert: false
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
        pages: state => state.jobs.pageable.total,
        jobs: state => state.jobs.items,
        jobsStatus: state => state.jobs.JobsStatus
      })
    },
    methods: {
      // 工作流设置
      yml () {
        this.$router.push({path: `/flows/${this.name}/yml`})
      },

      // 分页
      pageChange (val) {
        jobsList(this.$route.params.id, this.size, val - 1).then(res => {
          this.jobs = res.data.data.content
        }).catch(err => {
          console.log(err)
        })
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
      },
      //  推送状态监听
      jobsStatus (val) {
        if (val.event === 'NEW_CREATED') {
          this.jobs.unshift(val.job)
        } else if (val.event === 'STATUS_CHANGE') {
          for (var i = 0; i < this.jobs.length; i++) {
            if (this.jobs[ i ].buildNumber === val.job.buildNumber) {
              this.$set(this.jobs, i, val.job)
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .alert {
    position: absolute;
    width: 100%;
    z-index: 1000;
  }

</style>
