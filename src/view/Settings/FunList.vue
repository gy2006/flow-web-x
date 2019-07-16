<template>
  <v-card class="func-list">
    <v-list class="pa-0">
      <v-list-tile class="grey lighten-2">
        <v-list-tile-title class="font-weight-bold">
          Settings
        </v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-for="item in items"
                   :key="item">
        <v-list-tile-title>
          {{ $t(`${item}`) }}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingsFunList',
    data () {
      return {
        items: [
          'settings.li.profile',
          'settings.li.agent',
          'settings.li.credential'
        ]
      }
    }
  }
</script>

<style lang="scss">
  .func-list {
    font-size: 1px !important;

    .v-list__tile {
      font-size: 12px;
      border-bottom: 1px solid #e1e4e8;
    }
  }
</style>
