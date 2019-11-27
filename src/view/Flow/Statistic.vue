<template>
  <div class="flow-statistic">
    <v-banner single-line>
      {{ $t('flow.stats_date_select') }}

      <template v-slot:actions>
        <!-- from date-->
        <v-menu
            v-model="fromDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
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

        <!-- to date-->
        <v-menu
            v-model="toDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
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

        <v-btn small
               outlined
               color="indigo"
               @click="onConfirmClicked"
        >{{ $t('confirm') }}
        </v-btn>
      </template>
    </v-banner>

    <!-- chart list for every type -->
    <v-row>
      <v-col cols="10"
             class="mb-4"
             v-for="type in metaTypeList"
             :key="type.name">
        <div :id="type.name" class="chart"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import * as echarts from 'echarts'
  import moment from 'moment'
  import { defaultChartOption } from '@/util/stats'
  import _ from 'lodash'

  export default {
    name: 'FlowStatistic',
    data () {
      return {
        echartsInstances: {},
        min: moment().subtract(31, 'days').format('YYYY-MM-DD'),
        max: moment().format('YYYY-MM-DD'),
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
        statsList: state => state.stats.statsList,
        statsTotal: state => state.stats.statsTotal
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
      '$route' (to, from) {
        console.log(to)
      },

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
        // load all stats type
        let name = this.flow.name

        this.$store.dispatch(actions.stats.metaTypeList, name).then(() => {

          for (const t of this.metaTypeList) {

            // load stats in total
            let payload = {name, metaType: t.name}
            this.$store.dispatch(actions.stats.total, payload).then(() => {
              // init echart instance
              let instance = this.echartsInstances[ t.name ]
              if (!instance) {
                instance = this.echartsInstances[ t.name ] = echarts.init(document.getElementById(t.name))
              }

              // fill in data
              this.setChartData(t, instance, this.statsTotal)
            })
          }
        })
      },

      setChartData (metaType, echartInstance, total) {
        const fields = metaType.fields

        let name = this.flow.name
        let params = {
          name,
          metaType: metaType.name,
          from: this.toIntDay(this.fromDate),
          to: this.toIntDay(this.toDate),
        }

        // load statistic data list
        this.$store.dispatch(actions.stats.list, params).then(() => {
          // make data to map
          const structured = this.structureData(this.statsList)

          // calculate percentage
          const calculated = this.calculate({
            structured,
            fields,
            fromDay: this.fromDate,
            toDay: this.toDate,
            total
          })

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

      calculate ({structured, fields, fromDay, toDay, total}) {
        let dayList = []
        let data = {} // counter key with array, {PASSED: [0.1, 0.2, 0.3], xxxx}

        // create empty data
        const empty = {counter: {}}
        for (const category of fields) {
          empty.counter[ category ] = 0.0
        }

        // sum total
        let sumTotal = 0.0
        for (const category of Object.keys(total.counter)) {
          sumTotal += total.counter[ category ]
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

          let counter = item.counter

          // calculate percentage
          for (const category of Object.keys(counter)) {
            const percent = (counter[ category ] / sumTotal) * 100
            data[ category ] = data[ category ] || []
            data[ category ].push(percent.toFixed(2) || 0.0)
          }
        }

        return {dayList, data, fields}
      }
    }
  }
</script>

<style lang="scss">
  .flow-statistic {
    .chart {
      width: 100%;
      min-height: 400px;
    }

    .v-banner__actions {
      margin-right: 5% !important;
    }
  }
</style>
