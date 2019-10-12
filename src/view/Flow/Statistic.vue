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
      <v-flex xs12
              v-for="type in metaTypeList"
              :key="type.name">
        <div :id="type.name" class="chart"></div>
      </v-flex>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import Nav from '@/components/Common/Nav'
  import * as echarts from 'echarts'

  export default {
    name: 'FlowStatistic',
    components: {
      Nav
    },
    data () {
      return {
        chartData: {
          title: {
            text: '',
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
    mounted () {
      if (!this.flow.id) {
        this.$store.dispatch(actions.flows.select, this.name).then()
      } else {
        this.load()
      }
    },
    updated () {
      for (const t of this.metaTypeList) {
        const instance = echarts.init(document.getElementById(t.name))
        this.setChartData(t, instance)
      }
    },
    computed: {
      ...mapState({
        flow: state => state.flows.selected.obj,
        metaTypeList: state => state.stats.metaTypeList,
        statsList: state => state.stats.statsList
      }),
      name () {
        return this.$route.params.id
      }
    },
    watch: {
      flow () {
        this.load()
      },

      name (after) {
        if (after !== this.flow.name) {
          this.$store.dispatch(actions.flows.select, after).then()
        }
      }
    },
    methods: {
      load () {
        this.$store.dispatch(actions.stats.metaTypeList).then()
      },

      setChartData (metaType, echartInstance) {
        const fields = metaType.fields

        let flowId = this.flow.id
        const params = {
          flowId: flowId,
          metaType: metaType.name,
          from: 20191001,
          to: 20191011
        }

        // load statistic data list
        this.$store.dispatch(actions.stats.list, params).then(() => {
          // make data to map
          const structured = this.structureData(this.statsList)

          // calculate percentage
          const calculated = this.calculate({structured, fields})

          const chartOpt = Object.assign({}, this.chartData)
          chartOpt.title.text = metaType.name
          chartOpt.legend.data = calculated.fields
          chartOpt.xAxis.data = calculated.dayList

          for (let category of calculated.fields) {
            this.chartData.series.push({
              name: category,
              data: calculated.data[category],
              type: 'line',
              smooth: false,
              lineStyle: {
                normal: {opacity: 0.5}
              }
            })
          }

          echartInstance.setOption(chartOpt)
        })
      },

      structureData (raw) {
        let dataPerDay = {} // {20191001: {xxx}}

        for (let i = 0; i < raw.length; i++) {
          const item = raw[ i ]
          const day = item.day
          dataPerDay[ day ] = item
        }
        return dataPerDay
      },

      calculate ({structured, fields}) {
        let dayList = []
        let data = {} // counter key with array, {PASSED: [0.1, 0.2, 0.3], xxxx}
        let fromDay = 20191001
        let toDay = 20191007

        // create empty data
        const empty = {counter: {}}
        for (const category of fields) {
          empty.counter[ category ] = 0.0
        }

        for (let day = fromDay; day <= toDay; day++) {
          let item = structured[ day ]
          dayList.push(day)

          // no data, find previous day data
          if (!item) {
            for (let i = day; i >= fromDay; i--) {
              let previousVal = structured[ i ]
              if (previousVal) {
                item = previousVal
                break
              }
            }
          }

          // no available anymore
          if (!item) {
            item = Object.assign({}, empty)
          }

          let sumPerDay = 0.0
          let counter = item.counter

          // calculate sum
          for (const category of Object.keys(counter)) {
            data[ category ] = data[ category ] || []
            sumPerDay += counter[ category ]
          }

          // calculate percentage
          for (const category of Object.keys(counter)) {
            const percent = counter[ category ] / sumPerDay
            data[ category ].push(percent || 0.0)
          }
        }

        return {dayList, data, fields}
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
