<template>
    <v-card height='100%' width="100%">
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
          <v-data-table
            :items="jobs.content"
            class="elevation-1"
            hide-actions
            hide-headers
          >
            <template slot="items" slot-scope="props">
              <td @click="jobdetail(props.item)">
                <v-list>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="props.item.status"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-content class="branch">
                      <v-list-tile-title>
                        <h4>#{{ props.item.buildNumber }} {{ props.item.context.FLOWCI_GIT_BRANCH }}</h4>
                      </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>提交 ID -</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-list-tile-sub-title inset>变更对比 -</v-list-tile-sub-title>
                      <v-list-tile-sub-title inset>构建于 -</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="page" :length="pages"></v-pagination>
          </div>
        </v-card-text>
    </v-card>
</template>

<script>
  import { jobsList, jobRun } from '@/api/axios/api'
  import { mapState } from 'vuex'
  export default {
    name: 'Jobs',
    data () {
      return {
        jobs: [],
        size: 10,
        page: 0,
        pages: 0,
        loading: false,
        alert: false
      }
    },
    methods: {
      yml () {
        this.$router.push({path: `/flows/${this.$route.params.id}/yml`})
      },
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
      jobdetail (val) {
        this.$router.push({path: `/flows/${this.$route.params.id}/jobs/${val.buildNumber}`})
      }
    },
    computed: {
      ...mapState({
        name: state => state.flows.name
      })
    },
    mounted () {
      jobsList(this.$route.params.id, this.size, this.page).then(res => {
        this.page = res.data.data.number + 1
        this.pages = res.data.data.totalPages
        this.jobs = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    watch: {
      page (val) {
        jobsList(this.$route.params.id, this.size, val - 1).then(res => {
          this.jobs = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },
      $route (to, form) {
        this.page = 1
        jobsList(this.$route.params.id, this.size, this.page - 1).then(res => {
          this.pages = res.data.data.totalPages
          this.jobs = res.data.data
        }).catch(err => {
          console.log(err)
        })
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
.list {
  cursor: pointer;
  background: transparent;
}
.list__tile__sub-title {
  font-size: 12px;
}
.branch {
  border-right: 1px solid rgb(212, 220, 227);
  margin-right: 20px;
  width: 60%;
  box-sizing: border-box;
}
</style>
