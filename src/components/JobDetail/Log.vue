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
              v-model="value[i]"
            >
              <!-- title -->
              <div @click="loadSpaces(item.id, value[i])" class="step-title" slot="header">{{item.name}}</div>
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
                  v-if="steplog"
                  :data="steplog"
                  :pullup="pullup"
                  ref="listView"
                  @scrollEnd="scrollEnd(steplog, item.id)"
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
        value: [false],
        loading: false,
        num: this.$route.params.num,
        name: this.$route.params.id
      }
    },
    created () {
      // 进入页面时取到渲染列表名称
      jobSteps(this.name, this.num).then(res => {
        this.jobsteps = res.data.data
        this.jobsteps.forEach(val => {
          this.stepnum.push({name: Base64.decode(val.id).split('/')[1], id: val.id})
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
      scrollEnd (val, id) {
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
      },
      // 打开列表加载数据
      loadSpaces (val, cut) {
        this.page = 0
        if (!cut) {
          this.loading = true
          stepsLog(this.name, this.num, val, this.page).then(res => {
            this.steplog = res.data.data.content
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.steplog = []
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

}
</style>
