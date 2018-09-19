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
        <v-list-tile @click="onItemClick" :key="index">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item }}</v-list-tile-title>
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
            this.items = this.arr()
          })
        }
      },
      onItemClick () {
        console.log('')
      },
      querySelections (v) {
        this.items = this.arr().filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
      },
      arr () {
        var arr = []
        for (var i = 0; i < this.flows.length; i++) {
          arr.push(this.flows[i].name)
        }
        return arr
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
