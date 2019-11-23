<template>
  <v-card class="full-size flow-statistic">
    <v-card-title>
      <Nav
          :items="['flows', name, 'statistic']"
          :links="['#/flows', `#/flows/${name}/jobs`, `#/flows/${name}/statistic`]"
      ></Nav>
    </v-card-title>

    <v-card-text class="pt-0 tab-wrapper">
      <!-- header that includes data selection -->
      <v-row>
        <v-col cols="3">
        </v-col>
        <v-col cols="2" class="align-self-center title">
          <span>{{ $t('flow.stats_date_select') }}</span>
        </v-col>
        <v-col cols="2">
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
                  v-model="formattedFromDate"
                  label="From Day"
                  persistent-hint
                  prepend-icon="mdi-calendar  "
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="formattedFromDate"
                           no-title
                           :min="min"
                           :max="max"
                           @input="fromDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="2">
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
                  v-model="formattedToDate"
                  label="To Day"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="formattedToDate"
                           no-title
                           :min="min"
                           :max="max"
                           @input="toDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="2">
          <v-btn outlined
                 color="indigo"
                 class="ml-4 mt-2"
                 @click="onConfirmClicked"
          >{{ $t('confirm') }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- chart list for every type -->
      <v-row>
        <v-col cols="10"
               class="mb-4"
               v-for="type in metaTypeList"
               :key="type.name">
          <div :id="type.name" class="chart"></div>
        </v-col>
      </v-row>
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
      Nav
    },
    data () {
      return {
        echartsInstances: {},
        min: this.momentToString(moment().subtract(31, 'days')),
        max: this.momentToString(moment()),
        fromDate: moment().subtract(7, 'days'),
        fromDateMenu: false,
        toDate: moment(),
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
      formattedFromDate: {
        get () {
          return this.momentToString(this.fromDate)
        },

        set (newVal) {
          this.fromDate = moment(newVal)
        }
      },
      formattedToDate: {
        get () {
          return this.momentToString(this.toDate)
        },

        set (newVal) {
          this.toDate = moment(newVal)
        }
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
      toIntDay (d) {
        return parseInt(moment(d).format('YYYYMMDD'), 10)
      },

      momentToString (m) {
        return m.format('YYYY-MM-DD')
      },

      onConfirmClicked () {
        if (this.fromDate.isAfter(this.toDate)) {
          this.showSnackBar(this.$t('flow.hint.stats_invalid_date'), 'error')
          return
        }

        this.load()
      },

      load () {
        this.$store.dispatch(actions.stats.metaTypeList, this.flow.name).then(() => {
          for (const t of this.metaTypeList) {
            let instance = this.echartsInstances[ t.name ]

            if (!instance) {
              instance = this.echartsInstances[ t.name ] = echarts.init(document.getElementById(t.name))
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
          from: this.toIntDay(this.fromDate),
          to: this.toIntDay(this.toDate)
        }

        // load statistic data list
        this.$store.dispatch(actions.stats.list, params).then(() => {
          // make data to map
          const structured = this.structureData(this.statsList)

          // calculate percentage
          const calculated = this.calculate({structured, fields, fromDay: this.fromDate, toDay: this.toDate})

          const chartOpt = _.cloneDeep(this.defaultChartOption)
          chartOpt.title.text = metaType.desc
          chartOpt.legend.data = calculated.fields
          chartOpt.xAxis.data = calculated.dayList

          for (let category of calculated.fields) {
            chartOpt.series.push({
              name: category,
              data: calculated.data[ category ],
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

        for (let day = moment(fromDay); day.isSameOrBefore(toDay); day = day.add(1, 'd')) {
          let item = structured[ this.toIntDay(day) ]
          dayList.push(this.momentToString(day))

          // no data, find previous day data
          if (!item) {
            for (let i = moment(day); i.isSameOrAfter(fromDay); i = i.subtract(1, 'd')) {
              let previousVal = structured[ this.toIntDay(i) ]
              if (previousVal) {
                item = previousVal
                break
              }
            }
          }

          // not available anymore
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
            data[ category ].push(percent.toFixed(2) || 0.0)
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
