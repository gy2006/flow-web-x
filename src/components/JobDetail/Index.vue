<template>
<div style="height:100%; width:100%;">
    <div class="text-xs-center mt-5"  v-if="!jobdetail">
        <v-progress-circular
        indeterminate
        color="purple"
        ></v-progress-circular>
      </div>
    <v-card height='100%' width="100%" v-if="jobdetail">
        <v-card-title :class="state">
            <div class="state">{{ jobdetail.status }}</div>
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
                            <div>
                                {{ jobsteps }}
                            </div>
                        </v-card-text>
                        <v-card-text v-if="n === 'YML 配置'">
                            <Editor></Editor>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
</div>
</template>

<script>
  import { jobDetail, jobSteps, getYml } from '@/api/axios/api'
  import Message from './Message'
  import Editor from '@/components/Yml/Editor'
  import Actions from '@/api/actions'
  export default {
    name: 'JobDetail',
    data () {
      return {
        tab: ['详细信息', '构建日志', 'YML 配置'],
        jobdetail: null,
        jobsteps: null,
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
        if (this.jobdetail.status === 'TIMEOUT') {
          this.state = 'gray'
        } else if (this.jobdetail.status === 'SUCCESS') {
          this.state = 'green'
        }
      }).catch(err => {
        return err
      })
      jobSteps(name, num).then(res => {
        this.jobsteps = res.data.data
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
      Editor
    }
  }
</script>

<style scoped>
.gray {
    background: gray;
}
.green {
    background: green;
}
.card__text {
    height: 500px;
}
.state {
    border-right: 1px solid white;
    padding-right: 20px;
}
.way {
    padding: 0 20px;
}
</style>
