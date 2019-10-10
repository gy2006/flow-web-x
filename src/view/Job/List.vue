<template>
  <v-card class="full-size job-list">
    <v-card-title>
      <v-flex xs2>
        <Nav
            :items="[name]"
            :links="['jobs']"
        ></Nav>
      </v-flex>

      <v-flex xs4></v-flex>

      <v-flex xs2 d-flex>
        <v-btn
            flat
            color="blue-grey"
            class="white--text"
            @click="onStatisticClick">
          <v-icon small class="mr-1">trending_up</v-icon>
          {{ $t('flow.statistic') }}
        </v-btn>

        <v-btn
            flat
            color="blue-grey"
            class="white--text"
            @click="onSettingsClick">
          <v-icon small class="mr-1">settings</v-icon>
          {{ $t('flow.settings') }}
        </v-btn>
      </v-flex>

      <v-flex xs1 class="ml-4">
        <v-btn
            flat
            :loading="loading"
            :disabled="loading"
            color="success"
            @click.native="onRunClick(true)">
          <v-icon class="mr-1">play_arrow</v-icon>
          {{ $t('job.run') }}:
        </v-btn>
        <Dialog :dialog="dialog"
                :content="$t('job.hint.missing_agent')"
                :confirmBtn="confirmBtn"
                :cancelBtn="cancelBtn"
        ></Dialog>
      </v-flex>

      <v-flex xs2 class="ml-4">
        <v-select
            solo
            small-chips
            deletable-chips
            class="fix-height"
            v-model="selectedBranch"
            :items="gitBranches"
            label="branch: none"
        ></v-select>
      </v-flex>
    </v-card-title>

    <v-card-text class="pt-0">
      <v-data-table
          hide-headers
          :items="jobs"
          :pagination.sync="pagination"
          :total-items="total"
          :rows-per-page-items="[10, 25, 50]">

        <template slot="items" slot-scope="props">
          <td @click="onItemClick(props.item)">
            <job-list-item :job="props.item"></job-list-item>
          </td>
        </template>

        <template slot="no-data">
          <v-alert :value="true" color="white">
            <span class="light-blue--text">Click to start the first build</span>
            <v-btn
                flat
                icon
                color="success"
                @click.native="onRunClick">
              <v-icon>play_arrow</v-icon>
            </v-btn>
          </v-alert>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import equal from 'fast-deep-equal'
  import { mapState } from 'vuex'
  import Nav from '@/components/Common/Nav'
  import Dialog from '@/components/Common/Dialog'
  import JobListItem from '@/components/Jobs/ListItem'
  import actions from '@/store/actions'
  import { subscribeTopic } from '@/store/subscribe'

  export default {
    name: 'JobList',
    data () {
      return {
        dialog: false,
        loading: false,
        alert: false,
        selectedBranch: null,
        pagination: {
          descending: false,
          page: 1,
          rowsPerPage: 10,
          sortBy: null,
          totalItems: 0
        },
        confirmBtn: {
          text: 'Run',
          action: () => {
            this.dialog = false
            this.onRunClick(false)
          },
          color: 'success'
        },
        cancelBtn: {
          text: 'Cancel',
          action: () => {
            this.dialog = false
          },
          color: 'error'
        }
      }
    },
    components: {
      Nav,
      Dialog,
      JobListItem
    },
    mounted () {
      subscribeTopic.jobs(this.$store)
      this.reload()
    },
    computed: {
      ...mapState({
        flow: state => state.flows.selected.obj,
        gitBranches: state => state.flows.gitBranches,
        jobs: state => state.jobs.items,
        total: state => state.jobs.pagination.total,
        agents: state => state.agents.items
      }),

      name () {
        return this.$route.params.id
      },

      path () {
        return [
          {
            text: this.name,
            disabled: false
          }
        ]
      }
    },
    watch: {
      name () {
        this.reload()
      },

      pagination (newVal, oldVal) {
        if (!equal(newVal, oldVal)) {
          this.loadJobList()
        }
      }
    },
    methods: {
      reload () {
        this.$store.dispatch(actions.flows.select, this.name).then()
        this.$store.dispatch(actions.flows.gitBranches, this.name).catch(() => {})
        this.loadJobList()
      },

      onItemClick (job) {
        this.$router.push({path: `/flows/${this.name}/jobs/${job.buildNumber}`})
      },

      onRunClick (check) {
        if (check && this.agents.length === 0) {
          this.dialog = true
          return
        }

        this.$store.dispatch(actions.jobs.start, {
          flow: this.name,
          branch: this.selectedBranch
        }).then()
      },

      onSettingsClick () {
        this.$router.push({path: `/flows/${this.name}/settings`})
      },

      onStatisticClick () {
        this.$router.push({path: `/flows/${this.name}/statistic`})
      },

      loadJobList () {
        const { page, rowsPerPage } = this.pagination
        this.$store.dispatch(actions.jobs.list, {flow: this.name, page, size: rowsPerPage}).catch(() => {})
      }
    }
  }
</script>

<style lang="scss">
  .job-list {
    .fix-height {
      max-height: 32px;
    }

    .v-text-field.v-text-field--solo .v-input__control {
      min-height: 32px;
    }
  }
</style>
