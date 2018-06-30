<template>
  <v-navigation-drawer v-model="drawer" fixed clipped app>
    <v-list dense>
      <v-list-tile class="mt-3">
        <v-text-field
          :placeholder="$t('flow_search_text')"
          single-line
          append-icon="search"/>
      </v-list-tile>

      <template v-for="(item, index) in flows">
        <v-list-tile @click="onItemClick" :key="index">
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
        drawer: true
      }
    },
    computed: mapState({
      flows: state => state.flows.items
    }),
    methods: {
      show () {
        this.drawer = true
      },
      close () {
        this.drawer = false
      },
      click () {
        this.drawer = !this.drawer
      },
      onItemClick () {
        console.log('')
      }
    },
    created () {
      this.$store.dispatch(Actions.Flows.List)
    }
  }
</script>

<style lang="scss" scoped>
</style>
