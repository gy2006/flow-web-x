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
      <div class="text-xs-center mt-5"  v-if="!flows">
        <v-progress-circular
        indeterminate
        color="purple"
        ></v-progress-circular>
      </div>
      <template v-else v-for="(item, index) in items">
        <v-list-tile @click="onItemClick(item)" :key="index">
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
  import Actions from '@/api/actions'
  import { mapState } from 'vuex'

  export default {
    name: 'FlowList',
    data () {
      return {
        drawer: false,
        searchVal: '',
        items: []
      }
    },
    computed: {
      ...mapState({
        flows: state => state.flows.items
      })
    },
    methods: {
      click () {
        this.drawer = !this.drawer
        if (this.drawer === true) {
          this.$store.dispatch(Actions.Flows.List).then(() => {
            this.items = this.flows
          })
        }
      },
      onItemClick (item) {
        this.$router.push({path: `/flows/${item.name}/jobs`})
        this.$store.dispatch(Actions.Flows.Name, item.name)
      },
      querySelections (v) {
        this.items = this.flows.filter(e => {
          return (e.name || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
      }
    },
    created () {
      this.$store.dispatch(Actions.Flows.List)
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
