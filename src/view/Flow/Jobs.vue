<template>
  <v-container fluid class="elevation-1 pa-2 full-height">
    <!-- header -->
    <v-layout row class="pa-1">
      <v-flex xs6 class="header">
        <h2 class="pr-4">
          <v-icon>layers</v-icon>
          {{ this.name }}
        </h2>

        <v-chip label color="" outline text-color="black" @click="onSettingsClick">
          <v-icon left>settings</v-icon>
          {{ $t('flow_settings') }}
        </v-chip>
      </v-flex>
    </v-layout>

    <!-- tool bar -->
    <v-layout row justify-end>
      <v-flex xs12>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-btn
              :loading="loading"
              :disabled="loading"
              color="success"
              @click.native="onRunClick">
            {{ $t('job_run_manual') }}
          </v-btn>
        </v-toolbar>
      </v-flex>
    </v-layout>

    <!-- list -->
    <v-layout row justify-center class="body">
      <v-flex xs12>
        <v-data-table
            :items="jobs"
            hide-actions
            hide-headers>

          <template slot="items" slot-scope="props">
            <td @click="onItemClick(props.item)">
              <job-list-item :job="props.item"></job-list-item>
            </td>
          </template>

          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
             Start the first build :)
            </v-alert>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <!-- pagination -->
    <v-layout row justify-center align-end class="footer">
      <v-flex xs12 class="text-xs-center">
        <v-pagination
            v-model="pagination.page"
            @input="onPageChange"
            :length="pagination.totalPages"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import JobListItem from '@/components/Jobs/ListItem'
  import actions from '@/store/actions'
  import { subsribeTopic } from '@/store/subscribe'

  export default {
    name: 'FlowJobs',
    data () {
      return {
        name: '', // flow name
        loading: false,
        alert: false,
      }
    },
    components: {
      JobListItem
    },
    mounted () {
      this.name = this.$route.params.id
      this.$store.dispatch(actions.flows.select, this.name).then()
      this.$store.dispatch(actions.jobs.list, {flow: this.name, page: this.pagination.page}).then()
      subsribeTopic.jobs(this.$store)
    },
    computed: {
      ...mapState({
        pagination: state => state.jobs.pagination,
        jobs: state => state.jobs.items,
        jobsStatus: state => state.jobs.JobsStatus
      }),
    },
    methods: {
      onItemClick (job) {
        this.$router.push({path: `/flows/${this.name}/jobs/${job.buildNumber}`})
      },

      onRunClick() {
        this.$store.dispatch(actions.jobs.start).then()
      },

      onSettingsClick () {
        this.$router.push({path: `/flows/${this.name}/settings`})
      },

      onPageChange (page) {
        this.$store.dispatch(actions.jobs.list, {flow: this.name, page: page}).then()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
  }

  .body {
    height: 78%;
  }

  .alert {
    position: absolute;
    width: 100%;
    z-index: 1000;
  }

  .footer {
    height: 8%;
  }

</style>
