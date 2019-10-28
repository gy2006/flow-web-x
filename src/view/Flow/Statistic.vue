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
      <v-layout row wrap class="align-center">
        <v-flex xs3 class="text-xs-center">
          <span class="subheading">{{ $t('flow.stats_date_select') }}</span>
        </v-flex>
        <v-flex xs3>
          <v-menu
              v-model="fromDateMenu"
              :close-on-content-click="false"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                  v-model="fromDate"
                  label="From Day"
                  persistent-hint
                  prepend-icon="event"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="fromDate"
                           no-title
                           :min="min"
                           :max="max"
                           @input="fromDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs3>
          <v-menu
              v-model="toDateMenu"
              :close-on-content-click="false"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                  v-model="toDate"
                  label="To Day"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="toDate"
                           no-title
                           :min="min"
                           :max="max"
                           @input="toDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs2>
          <v-btn outline
                 color="indigo"
                 class="ml-4 mt-2"
                 @click="onConfirmClicked"
          >{{ $t('confirm') }}</v-btn>
        </v-flex>
        <v-flex xs1>
        </v-flex>
      </v-layout>

      <!-- chart list for every type -->
      <v-layout row wrap class="mt-4">
        <v-flex xs12
                v-for="type in metaTypeList"
                :key="type.name">
          <div :id="type.name" class="chart"></div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import Nav from '@/components/Common/Nav'
  import * as echarts from 'echarts'
  import moment from 'moment'
  import { defaultChartOption } from '@/util/stats'
  import _ from 'lodash'

  export default {
    name: 'FlowStatistic',
    components: {
      Nav,
    },
    data () {
      return {
        echartsInstances: {},
        min: moment().subtract(31, 'days').format('YYYY-MM-DD'),
        max: moment().format('YYYY-MM-DD'),
        fromDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
        fromDateMenu: false,
        toDate: moment().format('YYYY-MM-DD'),
        toDateMenu: false,
        defaultChartOption
      }
    },
    mounted () {
      if (!this.flow.id) {
        this.$store.dispatch(actions.flows.select, this.name).then()
      } else {
        this.load()
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
      },

      intFromDate () {
        return parseInt(moment(this.fromDate).format('YYYYMMDD'), 10)
      },

      intToDate () {
        return parseInt(moment(this.toDate).format('YYYYMMDD'), 10)
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
      onConfirmClicked() {
        if (this.intFromDate > this.intToDate) {
          this.showSnackBar(this.$t('flow.hint.stats_invalid_date'), 'error')
          return
        }

        this.load()
      },

      load () {
        this.$store.dispatch(actions.stats.metaTypeList, this.flow.name).then(() => {
          for (const t of this.metaTypeList) {
            let instance = this.echartsInstances[t.name]

            if (!instance) {
              instance = this.echartsInstances[t.name] = echarts.init(document.getElementById(t.name))
            }

            this.setChartData(t, instance)
          }
        })
      },

      setChartData (metaType, echartInstance) {
        const fields = metaType.fields

        let name = this.flow.name
        let params = {
          name,
          metaType: metaType.name,
          from: this.intFromDate,
          to: this.intToDate
        }

        // load statistic data list
        this.$store.dispatch(actions.stats.list, params).then(() => {
          // make data to map
          const structured = this.structureData(this.statsList)

          // calculate percentage
          const calculated = this.calculate({structured, fields, fromDay: params.from, toDay: params.to})

          const chartOpt = _.cloneDeep(this.defaultChartOption)
          chartOpt.title.text = metaType.desc
          chartOpt.legend.data = calculated.fields
          chartOpt.xAxis.data = calculated.dayList

          for (let category of calculated.fields) {
            chartOpt.series.push({
              name: category,
              data: calculated.data[category],
              type: 'line',
              smooth: false,
              lineStyle: {
                normal: {opacity: 0.5}
              }
            })
          }

          echartInstance.clear()
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

      calculate ({structured, fields, fromDay, toDay}) {
        let dayList = []
        let data = {} // counter key with array, {PASSED: [0.1, 0.2, 0.3], xxxx}

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
            item = _.cloneDeep(empty)
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
            const percent = (counter[ category ] / sumPerDay) * 100
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
