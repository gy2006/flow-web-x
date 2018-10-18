<template>
    <v-card width="100%" height="100%">
        <v-card-title style="background: #55575c;" class="pa-1 pl-3 pr-3">
            <h4 class="white--text">构建日志</h4>
            <v-spacer/>
            <v-btn color="info" @click="download">下载完整日志</v-btn>
        </v-card-title>
        <v-expansion-panel>
            <v-expansion-panel-content
              v-for="(item,i) in Steps"
              :key="i"
              @input="loadSpaces($event, item.id, item.totalPages, item.name, i)"
              :ref="item.name"
            >
              <!-- title -->
              <div class="step-title" slot="header">
                <!-- status -->
                <v-icon class="mr-2" v-if="item.status == 'TIMEOUT' || item.status == 'PENDING'">error_outline</v-icon>
                <v-icon class="mr-2" color="green" v-if="item.status === 'SUCCESS'">check_circle</v-icon>
                {{item.name}}
              </div>
              <!-- loading -->
              <div class="text-xs-center pa-5 black"  v-if="!item.content">
                <v-progress-circular
                indeterminate
                color="purple"
                ></v-progress-circular>
              </div>
              <!-- listView -->
              <div class="card black">
                <Scroll
                  v-if="item.content"
                  :data="item.content"
                  :pullup="pullup"
                  ref="listView"
                  @scrollEnd="scrollEnd(item.id, i)"
                >
                  <!-- 滚动的loading -->
                  <div class="text-xs-center pa-5 black"  v-if="loading">
                    <v-progress-circular
                    indeterminate
                    color="purple"
                    ></v-progress-circular>
                  </div>
                  <div id="div">
                    <v-card-text
                      class="white--text pa-1"
                      v-for="(log, index) in item.content"
                      :key="index"
                    >
                      {{log.indexOf('#') === -1 ? log : log.split('#')[2]}}
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
        Steps: [], // 获取step
        page: 0,
        loading: false,
        num: this.$route.params.num,
        name: this.$route.params.id,
        code: 0
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
        res.data.data.forEach(val => {
          this.Steps.push({
            name: Base64.decode(val.id).split('/')[1],
            id: val.id,
            status: val.status,
            totalPages: Math.ceil(val.logSize / 20),
            content: []})
        })
      }).catch(err => {
        return err
      })
    },
    methods: {
      download () {
        console.log('download')
      },
      // 滚动到顶部加载数据
      scrollEnd (id, index) {
        this.loading = true
        if (this.code === 200 && this.page > 0) {
          this.page--
          stepsLog(this.name, this.num, id, this.page).then(res => {
            if (res.data.data.content) {
              this.Steps[index].content.unshift(...res.data.data.content)
              this.loading = false
            }
          }).catch(err => {
            return err
          })
        } else {
          this.loading = false
        }
      },
      // 打开列表加载数据
      loadSpaces (state, id, totalPages, name, index) {
        this.page = totalPages - 1
        let self = this
        if (state) {
          // 在step 的推送的状态是 PENDING RUNNING的时候 渲染LOG推送的日志
          const path = '/topic/logs/' + id
          this.SocketClient.subscribe(path, function (data) { // 订阅服务端提供的某个topic
            if (self.Steps[index].content.indexOf(data.body) === -1) { // data.body存放的是服务端发送给我们的信息
              self.Steps[index].content.push(data.body)
              self.Steps[index].content.length > 20 && self.Steps[index].content.shift()
            }
          })
          // 在step 的的推送的状态是 SUCCESS的时候 渲染LOG接口的日志
          stepsLog(this.name, this.num, id, totalPages - 1).then(res => {
            this.code = res.data.code
            this.Steps[index].content = res.data.data.content
          }).catch(err => {
            return err
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
