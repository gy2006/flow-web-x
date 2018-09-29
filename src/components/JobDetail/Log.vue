<template>
    <v-card width="100%" height="100%">
        <v-card-title style="background: #55575c;" class="pa-1 pl-3 pr-3">
            <h4 class="white--text">构建日志</h4>
            <v-spacer/>
            <v-btn color="info" @click="download">下载完整日志</v-btn>
        </v-card-title>
        <v-expansion-panel :disabled="disabled" v-model="panel">
            <v-expansion-panel-content
              v-for="(item,i) in jobsteps"
              :key="i"
            >
              <template slot="header">{{stepnum[i]}}</template>
              <div class="card black" v-if="steplog">
                <Scroll
                  v-if="steplog[i]"
                  :data="steplog[i]"
                  :pullup="pullup"
                  ref="listView"
                  @scrollEnd="scrollEnd(steplog[i], item.id, i)"
                >
                  <div>
                    <v-card-text
                      class="white--text pa-1"
                      v-for="(log, index) in steplog[i]"
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
        jobsteps: [],
        stepnum: [],
        steplog: [],
        disabled: false,
        page: 0,
        panel: [false]
      }
    },
    created () {
      let num = this.$route.params.num
      let name = this.$route.params.id
      jobSteps(name, num).then(res => {
        this.jobsteps = res.data.data
        let promises = this.jobsteps.map((item, index) => {
          this.stepnum.push(Base64.decode(item.id).split('/')[1])
          return new Promise((resolve, reject) => {
            stepsLog(name, num, item.id, this.page).then(res => {
              resolve(res.data.data.content)
            })
          })
        })
        Promise.all(promises).then((allData) => {
          this.steplog = allData
        }).catch((err) => {
          console.log(err)
        })
      }).catch(err => {
        return err
      })
    },
    methods: {
      download () {
        console.log('download')
      },
      scrollEnd (val, id, index) {
        let num = this.$route.params.num
        let name = this.$route.params.id
        this.page++
        stepsLog(name, num, id, this.page).then(res => {
          if (res.data.data.content) {
            res.data.data.content.forEach(val => {
              this.steplog[index].push(val)
            })
          }
        }).catch(err => {
          return err
        })
      }
    },
    components: {
      Scroll
    },
    watch: {
      panel () {
        this.$refs.listView[0].refresh()
      }
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
</style>
