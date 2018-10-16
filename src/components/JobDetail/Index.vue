<template>
  <div style="height:100%; width:100%;">
    <div class="text-xs-center mt-5"  v-if="!jobdetail">
      <v-progress-circular
      indeterminate
      color="purple"
      ></v-progress-circular>
    </div>
    <v-card height='100%' width="100%" v-if="jobdetail">
        <v-card-title class="state-text" :class="jobdetail.status | Status">
            <div class="state">
              <v-progress-circular
                indeterminate
                :size="20"
                color="primary"
                v-if="jobdetail.status === 'RUNNING' || jobdetail.status === 'ENQUEUE'"
              ></v-progress-circular>
              <v-icon v-if="jobdetail.status === 'TIMEOUT'">error_outline</v-icon>
              <v-icon v-if="jobdetail.status === 'SUCCESS'">check_circle</v-icon>
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
                      <pre>
                        <code>{{editor}}</code>
                      </pre>
                      <!-- <Editor :readonly="true" :editor="editor"></Editor> -->
                    </v-card-text>
                  </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import {jobDetail, jobYml} from '@/api/axios/api'
  import Message from './Message'
  import Log from './Log'
  import Editor from '@/components/Yml/Editor'
  import { mapState } from 'vuex'
  export default {
    name: 'JobDetail',
    data () {
      return {
        tab: ['详细信息', '构建日志', 'YML 配置'],
        jobdetail: null,
        editor: ''
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
        jobYml(name, this.jobdetail.buildNumber).then(res => {
          this.editor = res.data
        })
      }).catch(err => {
        return err
      })
    },
    computed: {
      ...mapState({
        jobsStatus: state => state.jobs.JobsStatus
      })
    },
    components: {
      Message,
      Editor,
      Log
    },
    watch: {
      jobsStatus (val) {
        if (this.jobdetail.buildNumber === val.job.buildNumber) {
          this.jobdetail = val.job
        }
      }
    }
  }
</script>

<style>

</style>

<style scoped lang="scss">
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
pre {
  width: 100%;
  height: 100%;
  border: 0;
  background: #313639;
  color: #f9e890;
  font-size: 13px;
  border-radius: 3px;
  display: flex;
  position: relative;
  code {
    background-color: transparent;
    width: 100%;
    height: 100%;
    overflow: auto;
    font-size: inherit;
    color: inherit;
    white-space: pre-wrap;
    border-radius: 0;
    position: absolute;
  }
}

</style>
