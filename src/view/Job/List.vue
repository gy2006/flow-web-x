<template>
  <v-card width="100%" height="100%">
    <v-card-title>
      <span class="pr-2 font-weight-bold headline">
        <v-icon>layers</v-icon>
        {{ name }}
      </span>

      <v-spacer></v-spacer>

      <v-btn
          color="blue-grey"
          class="white--text"
          @click="onSettingsClick">
        {{ $t('flow.settings') }}
        <v-icon small>settings</v-icon>
      </v-btn>

      <v-btn
          :loading="loading"
          :disabled="loading"
          color="success"
          @click.native="onRunClick">
        {{ $t('job.run') }}
      </v-btn>
    </v-card-title>

    <v-card-text>
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
  import JobListItem from '@/components/Jobs/ListItem'
  import actions from '@/store/actions'
  import { subscribeTopic } from '@/store/subscribe'

  export default {
    name: 'JobList',
    data () {
      return {
        loading: false,
        alert: false
      }
    },
    components: {
      JobListItem
    },
    mounted () {
      subscribeTopic.jobs(this.$store)
      this.reload()
    },
    computed: {
      ...mapState({
        pagination: state => state.jobs.pagination,
        jobs: state => state.jobs.items
      }),

      name () {
        return this.$route.params.id
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
      },

      onItemClick (job) {
        this.$router.push({path: `/flows/${this.name}/jobs/${job.buildNumber}`})
      },

      onRunClick () {
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
  .alert {
    position: absolute;
    width: 100%;
    z-index: 1000;
  }
</style>
