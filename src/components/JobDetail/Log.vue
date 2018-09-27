<template>
    <v-card width="100%" height="100%">
        <v-card-title style="background: #55575c;" class="pa-1 pl-3 pr-3">
            <h4 class="white--text">构建日志</h4>
            <v-spacer/>
            <v-btn color="info">下载完整日志</v-btn>
        </v-card-title>
        <v-expansion-panel>
            <v-expansion-panel-content
            v-for="(item,i) in jobsteps"
            :key="i"
            >
            <div slot="header">{{stepnum[i]}}</div>
            <v-card>
                <v-card-text>{{steplog[i]}}</v-card-text>
            </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-card>
</template>

<script>
  import { jobSteps, stepsLog } from '@/api/axios/api'
  let Base64 = require('js-base64').Base64
  export default {
    name: 'Log',
    data () {
      return {
        jobsteps: [],
        stepnum: [],
        steplog: []
      }
    },
    created () {
      let num = this.$route.params.num
      let name = this.$route.params.id
      jobSteps(name, num).then(res => {
        this.jobsteps = res.data.data
        this.jobsteps.forEach(val => {
          this.stepnum.push(Base64.decode(val.id).split('/')[1])
          stepsLog(name, num, val.id).then(res => {
            this.steplog.push(res.data.data.content[0])
          })
        })
      }).catch(err => {
        return err
      })
    }
  }
</script>

<style scoped>

</style>
