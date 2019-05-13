<template>
  <v-navigation-drawer v-model="drawer" fixed clipped app>
    <v-list dense>
      <v-list-tile class="mt-3">
        <v-text-field
          :placeholder="$t('flow_search_text')"
          single-line
          append-icon="search"
          v-model="searchVal"/>
      </v-list-tile>
      <div class="text-xs-center mt-5"  v-if="loading">
        <v-progress-circular
        indeterminate
        color="purple"
        ></v-progress-circular>
      </div>
      <template v-else v-for="(item, index) in items">
        <v-list-tile @click="onItemClick(item)"
                     :key="index"
                     v-bind:class="['ml-2', 'mr-2', item.name === current ? 'grey lighten-2' : '']">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import actions from '@/store/actions'
  import { mapState } from 'vuex'

  export default {
    name: 'FlowList',
    data () {
      return {
        drawer: false,
        searchVal: '',
        items: [],
        loading: false,
        current: ''
      }
    },
    mounted () {
      this.current = this.$route.params.id

      this.$store.dispatch(actions.flows.list).then(() => {
        this.items = this.flows
      })
    },
    computed: {
      ...mapState({
        flows: state => state.flows.items
      })
    },
    methods: {
      click () {
        this.drawer = !this.drawer
        this.items = this.flows
      },
      onItemClick (flow) {
        this.$router.push({path: `/flows/${flow.name}/jobs`})
      },
      querySelections (v) {
        this.items = this.flows.filter(e => {
          return (e.name || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
      }
    },
    watch: {
      searchVal (val) {
        this.querySelections(val)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
