<template>
  <div style="height:100%; width:100%;">
    <div class="text-xs-center mt-5"  v-if="!jobdetail">
      <v-progress-circular
      indeterminate
      color="purple"
      ></v-progress-circular>
    </div>
    <v-card height='100%' width="100%" v-if="jobdetail">
        <v-card-title class="state-text" :class="state">
            <div class="state">
              <v-progress-circular
                indeterminate
                :size="20"
                color="primary"
                v-if="state === 'info'"
              ></v-progress-circular>
              <v-icon v-if="state === 'timeout'">error_outline</v-icon>
              <v-icon v-if="state === 'success'">check_circle</v-icon>
              <span class="ml-2">{{ jobdetail.status }}</span>
            </div>
            <div class="way">{{ jobdetail.trigger }}构建</div>
            <v-spacer/>
            <v-btn color="orange darken-2" dark @click="goback">
                <v-icon dark left>arrow_back</v-icon>返回
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-tabs left>
                <v-tab
                v-for="n in tab"
                :key="n"
                >
                {{ n }}
                </v-tab>
                <v-tab-item
                v-for="n in tab"
                :key="n"
                >
                  <v-card flat>
                      <v-card-text v-if="n === '详细信息'">
                        <Message :jobdetail="jobdetail"></Message>
                      </v-card-text>
                      <v-card-text v-if="n === '构建日志'">
                        <Log></Log>
                      </v-card-text>
                      <v-card-text v-if="n === 'YML 配置'">
                        <Editor :readonly="true"></Editor>
                      </v-card-text>
                  </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import { jobDetail, getYml } from '@/api/axios/api'
  import Message from './Message'
  import Log from './Log'
  import Editor from '@/components/Yml/Editor'
  import Actions from '@/api/store/actions'
  import { status } from '@/util/status/status'
  export default {
    name: 'JobDetail',
    data () {
      return {
        tab: ['详细信息', '构建日志', 'YML 配置'],
        jobdetail: null,
        state: ''
      }
    },
    methods: {
      goback () {
        this.$router.push({path: `/flows/${this.$route.params.id}/jobs`})
      }
    },
    created () {
      let num = this.$route.params.num
      let name = this.$route.params.id
      jobDetail(name, num).then(res => {
        this.jobdetail = res.data.data
        this.state = status(this.jobdetail.status)
      }).catch(err => {
        return err
      })
      getYml(name).then(res => {
        this.$store.dispatch(Actions.Flows.Editor, res.data)
      }).catch(() => {
        this.$store.dispatch(Actions.Flows.Editor, '# flow.ci templates')
      })
    },
    components: {
      Message,
      Editor,
      Log
    }
  }
</script>

<style>

</style>

<style scoped lang="scss">
.timeout {
    background: #607D8B;
}
.success {
}
.info {
}
.state-text {
  .state {
    border-right: 1px solid #fff;
    padding-right: 20px;
    color: #fff;
    display: flex;
    align-items: center;
  }
  .way {
      padding: 0 20px;
      color: #fff;
  }
}
.v-card__text {
    height: 500px;
}

</style>
