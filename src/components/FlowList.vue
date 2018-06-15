<template>
  <v-navigation-drawer v-model="drawer" fixed clipped app>
    <v-list dense>
      <v-list-tile class="mt-3">
        <v-text-field
          :placeholder="$t('flow_search_text')"
          single-line
          append-icon="search"/>
      </v-list-tile>

      <v-list-tile @click="onItemClick">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="onItemClick">
        <v-list-tile-action>
          <i class="flow-icon flow-icon-agents"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Contact</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'FlowList',
    props: {
      drawer: Boolean
    },
    data () {
      return {}
    },
    methods: {
      onItemClick (item) {
        console.log(item)
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
