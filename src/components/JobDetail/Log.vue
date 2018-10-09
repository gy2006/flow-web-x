<template>
    <v-card width="100%" height="100%">
        <v-card-title style="background: #55575c;" class="pa-1 pl-3 pr-3">
            <h4 class="white--text">构建日志</h4>
            <v-spacer/>
            <v-btn color="info" @click="download">下载完整日志</v-btn>
        </v-card-title>
        <v-expansion-panel :disabled="disabled">
            <v-expansion-panel-content
              v-for="(item,i) in stepnum"
              :key="i"
              @input="loadSpaces($event, item.id)"
            >
              <!-- title -->
              <div class="step-title" slot="header">
                <!-- status -->
                <v-icon class="mr-2" v-if="item.status == 'TIMEOUT' || item.status == 'PENDING'">error_outline</v-icon>
                <v-icon class="mr-2" color="green" v-if="item.status === 'SUCCESS'">check_circle</v-icon>
                {{item.name}}
              </div>
              <!-- loading -->
              <div class="text-xs-center pa-5 black"  v-if="loading">
                <v-progress-circular
                indeterminate
                color="purple"
                ></v-progress-circular>
              </div>
              <!-- listView -->
              <div class="card black" v-if="!loading">
                <Scroll
                  :data="steplog"
                  :pullup="pullup"
                  ref="listView"
                  @scrollEnd="scrollEnd(item.id)"
                >
                  <div>
                    <v-card-text
                      class="white--text pa-1"
                      v-for="(log, index) in steplog"
                      :key="index"
                    >
                      {{log}}
                    </v-card-text>
                  </div>
                </Scroll>
              </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-card>
</template>

<script>
  import Scroll from '@/components/iScroll/Index'
  import { jobSteps, stepsLog } from '@/api/axios/api'
  import { mapState } from 'vuex'
  let Base64 = require('js-base64').Base64
  export default {
    name: 'Log',
    data () {
      return {
        pullup: true,
        jobsteps: [], // 获取ID
        stepnum: [], // 获取step 的name
        steplog: [], // 获取 step 的数据
        disabled: false,
        page: 0,
        loading: false,
        num: this.$route.params.num,
        name: this.$route.params.id,
        state: false,
        stompClient: null,
        code: 0,
        totalPages: 0
      }
    },
    computed: {
      ...mapState({
        SocketClient: state => state.socket.SocketClient
      })
    },
    created () {
      // 进入页面时取到渲染列表名称
      jobSteps(this.name, this.num).then(res => {
        this.jobsteps = res.data.data
        this.jobsteps.forEach(val => {
          this.stepnum.push({name: Base64.decode(val.id).split('/')[1], id: val.id, status: val.status})
        })
      }).catch(err => {
        return err
      })
    },
    methods: {
      download () {
        console.log('download')
      },
      // 滚动到底部加载数据
      scrollEnd (id) {
        if (this.code === 200 && this.page < this.totalPages - 1) {
          this.page++
          stepsLog(this.name, this.num, id, this.page).then(res => {
            if (res.data.data.content) {
              res.data.data.content.forEach(val => {
                this.steplog.push(val)
              })
            }
          }).catch(err => {
            return err
          })
        }
      },
      // 打开列表加载数据
      loadSpaces (state, id) {
        let self = this
        this.page = 0
        if (state) { // 判断是否是打开的状态
          this.loading = false
          stepsLog(this.name, this.num, id, this.page).then(res => {
            this.code = res.data.code
            if (res.data.code === 407) {
              const path = '/topic/logs/' + id
              this.SocketClient.subscribe(path, function (data) { // 订阅服务端提供的某个topic
                console.log(data.body + '=======') // data.body存放的是服务端发送给我们的信息
                self.steplog.push(data.body.split('#')[2])
              })
            } else if (res.data.code === 200) {
              this.steplog = res.data.data.content
              this.totalPages = res.data.data.totalPages
              this.loading = false
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style>
.v-expansion-panel__header {
  justify-content: space-between !important;
}
.card {
  height: 300px;
  position: relative;
  overflow: hidden;
}
.step-title {
  display: flex;
  align-items: center;
}
</style>
