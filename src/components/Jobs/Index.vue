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
            {{this.$route.params.id}}
          </h2>
          <v-chip label color="" outline text-color="black" @click="yml">
              <v-icon left>settings</v-icon>工作流设置
          </v-chip>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :disabled="loading"
            color="success"
            @click.native="jobrun"
          >
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
  import JobItem from './JobItem'
  import { mapState } from 'vuex'
  export default {
    name: 'Jobs',
    data () {
      return {
        jobs: [],
        size: 10,
        pages: 0,
        loading: false,
        alert: false
      }
    },
    methods: {
      // 工作流设置
      yml () {
        this.$router.push({path: `/flows/${this.$route.params.id}/yml`})
      },
      // 运行工作流
      jobrun () {
        jobRun(this.$route.params.id).then(res => {
          this.loading = true
          if (res.data.code === 200) {
            this.loading = false
          } else if (res.data.code === 404) {
            this.loading = false
            this.alert = true
            setTimeout(() => {
              this.alert = false
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
        })
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
    // 页面初始化 jobs
    created () {
      jobsList(this.$route.params.id, this.size, 0).then(res => {
        this.pages = res.data.data.totalPages
        this.jobs = res.data.data.content
      }).catch(err => {
        console.log(err)
      })
    },
    computed: {
      ...mapState({
        jobsStatus: state => state.jobs.JobsStatus
      })
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
      jobsStatus (val) {
        if (val.event === 'NEW_CREATED') {
          this.jobs.unshift(val.job)
        } else if (val.event = 'STATUS_CHANGE') { 
          for (var i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].buildNumber === val.job.buildNumber) {
              this.$set(this.jobs, i, val.job)
            }
          }
        }
      }
    },
    components: {
      JobItem
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
