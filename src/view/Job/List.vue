<template>
  <v-card class="full-size job-list">
    <v-card-title>
      <v-flex xs2>
        <Nav
            :items="[name]"
            :links="['jobs']"
        ></Nav>
      </v-flex>

      <v-flex xs5></v-flex>

      <v-flex xs1>
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
            @click.native="onRunClick">
          <v-icon class="mr-1">play_arrow</v-icon>
          {{ $t('job.run') }}:
        </v-btn>
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
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-pagination
          v-model="pagination.page"
          @input="onPageChange"
          :length="pagination.totalPages"/>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  import Nav from '@/components/Common/Nav'
  import JobListItem from '@/components/Jobs/ListItem'
  import actions from '@/store/actions'
  import { subscribeTopic } from '@/store/subscribe'

  export default {
    name: 'JobList',
    data () {
      return {
        loading: false,
        alert: false,
        selectedBranch: null
      }
    },
    components: {
      Nav,
      JobListItem
    },
    mounted () {
      subscribeTopic.jobs(this.$store)
      this.reload()
    },
    computed: {
      ...mapState({
        gitBranches: state => state.flows.gitBranches,
        pagination: state => state.jobs.pagination,
        jobs: state => state.jobs.items
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
      }
    },
    methods: {
      reload () {
        this.$store.dispatch(actions.flows.select, this.name).then()
        this.$store.dispatch(actions.jobs.list, {flow: this.name, page: this.pagination.page}).then()
        this.$store.dispatch(actions.flows.gitBranches, this.name).then()
      },

      onItemClick (job) {
        this.$router.push({path: `/flows/${this.name}/jobs/${job.buildNumber}`})
      },

      onRunClick () {
        this.$store.dispatch(actions.jobs.start, {
          flow: this.name,
          branch: this.selectedBranch
        }).then()
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
