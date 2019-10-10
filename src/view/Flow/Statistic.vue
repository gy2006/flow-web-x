<template>
  <v-card class="full-size flow-statistic">
    <v-card-title>
      <Nav
          :items="[name, 'statistic']"
          :links="['jobs', 'settings']"
      ></Nav>
    </v-card-title>

    <v-card-text class="pt-0 tab-wrapper">
      <!-- header that includes data selection -->
      <v-flex xs12>
        <div id="job-chart" class="chart"></div>
      </v-flex>
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapState} from 'vuex'
  import actions from '@/store/actions'
  import Nav from '@/components/Common/Nav'

  import * as echarts from 'echarts'

  export default {
    name: 'FlowStatistic',
    components: {
      Nav,
    },
    data() {
      return {
        raw: [
          {
            flowId: '1',
            type: 'CI_JOB_STATUS',
            day: 20191001,
            counter: {
              SUCCESS: 1.0,
              FAILURE: 1.0,
              CANCELLED: 0.0,
              TIMEOUT: 0.0,
            }
          },
          {
            flowId: '1',
            type: 'CI_JOB_STATUS',
            day: 20191002,
            counter: {
              SUCCESS: 4.0,
              FAILURE: 1.0,
              CANCELLED: 1.0,
              TIMEOUT: 1.0,
            }
          },
          {
            flowId: '1',
            type: 'CI_JOB_STATUS',
            day: 20191003,
            counter: {
              SUCCESS: 4.0,
              FAILURE: 3.0,
              CANCELLED: 1.0,
              TIMEOUT: 1.0,
            }
          },
          {
            flowId: '1',
            type: 'CI_JOB_STATUS',
            day: 20191005,
            counter: {
              SUCCESS: 4.0,
              FAILURE: 3.0,
              CANCELLED: 2.0,
              TIMEOUT: 6.0,
            }
          },
          {
            flowId: '1',
            type: 'CI_JOB_STATUS',
            day: 20191006,
            counter: {
              SUCCESS: 8.0,
              FAILURE: 3.0,
              CANCELLED: 2.0,
              TIMEOUT: 6.0,
            }
          }
        ],

        chartData: {
          title: {
            text: 'Job Status Chart',
            left: 0
          },
          xAxis: {
            data: []
          },
          yAxis: {
            type: 'value'
          },
          legend: {
            data: []
          },
          dataZoom: [
            {
              type: 'inside',
              start: 50,
              end: 100
            },
            {
              show: true,
              type: 'slider',
              y: '90%',
              start: 50,
              end: 100
            }
          ],
          series: []
        }
      }
    },
    mounted() {

      let obj = this.calculate(this.structureData(this.raw))
      this.chartData.legend.data = obj.categories
      this.chartData.xAxis.data = obj.dayList
      for (let category of obj.categories) {
        this.chartData.series.push({
          name: category,
          data: obj.data[category],
          type: 'line',
          smooth: false,
          lineStyle: {
            normal: {opacity: 0.5}
          }
        })
      }
      echarts.init(document.getElementById('job-chart')).setOption(this.chartData)

    },
    computed: {
      ...mapState({
        flow: state => state.flows.selected.obj,
      }),
      name() {
        return this.$route.params.id
      }
    },
    watch: {
      name(after) {
        if (after !== this.flow.name) {
          this.$store.dispatch(actions.flows.select, after).then()
        }
      }
    },
    methods: {
      structureData(raw) {
        let dataPerDay = {} // {20191001: {xxx}}
        let categories = {} // {PASSED: 0}

        for (let i = 0; i < raw.length; i++) {
          const item = raw[i]
          const day = item.day
          const counter = item.counter

          dataPerDay[day] = item
          for (const category of Object.keys(counter)) {
            categories[category] = 0
          }
        }
        return {
          dataPerDay,
          categories: Object.keys(categories) // [SUCCESS, FAILURE, TIMEOUT, xxx]
        }
      },

      calculate({dataPerDay, categories}) {
        let dayList = []
        let data = {} // counter key with array, {PASSED: [0.1, 0.2, 0.3], xxxx}
        let fromDay = 20191001
        let toDay = 20191007

        // create empty data
        const empty = {counter: {}}
        for (const category of categories) {
          empty.counter[category] = 0.0
        }

        for (let day = fromDay; day <= toDay; day++) {
          let item = dataPerDay[day]
          dayList.push(day)

          // no data, find previous day data
          if (!item) {
            for (let i = day; i >= fromDay; i--) {
              let previousVal = dataPerDay[i]
              if (previousVal) {
                item = previousVal
                break
              }
            }
          }

          // create category and calculate sum
          let sumPerDay = 0.0
          let counter = item.counter

          for (const category of Object.keys(counter)) {
            data[category] = data[category] || []
            sumPerDay += counter[category]
          }

          // create category and calculate sum
          for (const category of Object.keys(counter)) {
            const percent = counter[category] / sumPerDay
            data[category].push(percent)
          }
        }

        return {dayList, data, categories}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flow-statistic {
    .chart {
      width: 100%;
      min-height: 400px;
    }
  }
</style>