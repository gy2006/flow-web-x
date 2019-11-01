<template>
  <v-list shaped>
    <v-subheader>
      <v-text-field
          :placeholder="$t('flow.search')"
          single-line
          append-icon="mdi-magnify"
          v-model="searchVal"/>
    </v-subheader>

    <v-list-item-group v-model="selected">
      <v-list-item v-for="item in items"
                   :key="item.id"
                   :class="['ml-2', 'mr-2', item.name === current ? 'grey lighten-2' : '']"
                   @click="onItemClick(item)">
        <v-list-item-action>
          <v-icon small :class="item.iconClass">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

    <!-- button to create-->
    <v-list-item>
      <v-list-item-content class="btn-create">
        <flow-create-dialog></flow-create-dialog>
      </v-list-item-content>
    </v-list-item>
  </v-list>
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
        searchVal: '',
        items: [],
        selected: 0
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
          let body = {flow: wrapper.name, buildNumberOrLatest: 'latest'}
          this.$store.dispatch(actions.jobs.get, body).then().catch(() => {
          })
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
