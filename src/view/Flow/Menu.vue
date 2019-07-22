<template>
  <v-navigation-drawer v-model="drawer" fixed clipped app>
    <v-list dense>
      <v-list-tile class="mt-3">
        <v-text-field
            :placeholder="$t('flow.search')"
            single-line
            append-icon="search"
            v-model="searchVal"/>
      </v-list-tile>
      <div class="text-xs-center mt-5" v-if="loading">
        <v-progress-circular
            indeterminate
            color="purple"
        ></v-progress-circular>
      </div>
      <template v-for="item in items">
        <v-list-tile @click="onItemClick(item)"
                     :key="item.id"
                     :class="['ml-2', 'mr-2', item.name === current ? 'grey lighten-2' : '']">
          <v-list-tile-action>
            <v-icon small :class="item.iconClass">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <!-- button to create-->
      <v-list-tile>
        <v-list-tile-content class="btn-create">
          <flow-create-dialog></flow-create-dialog>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { FlowWrapper } from '@/util/flows'
  import { mapState } from 'vuex'
  import FlowCreateDialog from './CreateDialog'
  import actions from '@/store/actions'

  export default {
    name: 'FlowMenu',
    components: {
      FlowCreateDialog
    },
    data () {
      return {
        drawer: true,
        searchVal: '',
        loading: false,
        items: []
      }
    },
    mounted () {
      this.$store.dispatch(actions.flows.list).then()
    },
    computed: {
      ...mapState({
        flows: state => state.flows.items,
        // to receive job updated event and show latest job status on flow list
        updatedJob: state => state.jobs.updated
      }),

      // current flow name
      current () {
        return this.$route.params.id
      }
    },
    methods: {
      click () {
        this.drawer = !this.drawer
      },

      onItemClick (flow) {
        this.$router.push({path: `/flows/${flow.name}/jobs`})
      },

      querySelections (v) {
        this.items = this.toWrapperItems(this.flows.filter(e => {
          return (e.name || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        }))
      },

      fetchLatestStatus (items) {
        items.forEach((wrapper) => {
          this.$store.dispatch(actions.jobs.get, {flow: wrapper.name, buildNumberOrLatest: 'latest'}).then()
        })
      },

      toWrapperItems (flows) {
        let list = []
        for (let flow of flows) {
          list.push(new FlowWrapper(flow))
        }
        return list
      }
    },
    watch: {
      flows (after) {
        this.items = this.toWrapperItems(after)
        this.fetchLatestStatus(this.items)
      },

      searchVal (after) {
        this.querySelections(after)
      },

      updatedJob (job) {
        for (let wrapper of this.items) {
          if (wrapper.id !== job.flowId) {
            continue
          }

          wrapper.job = job
          break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn-create {
    align-items: center;
  }
</style>