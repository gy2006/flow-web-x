<template>
  <v-card class="func-list">
    <v-list class="pa-0">
      <v-list-tile class="grey lighten-2">
        <v-list-tile-title class="font-weight-bold">
          Settings
        </v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-for="item in items"
                   :key="item.path"
                   :class="['blue--text', item.path === current ? 'selected' : '']"
                   @click="onMenuItemClick(item.path)">
        <v-list-tile-title>
          {{ $t(`${item.i18n}`) }}
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
          {
            i18n: 'settings.li.profile',
            path: 'profile'
          },
          {
            i18n: 'settings.li.agent',
            path: 'agent'
          },
          {
            i18n: 'settings.li.credential',
            path: 'credential'
          }
        ]
      }
    },
    computed: {
      current () {
        return this.$route.path.split('/')[ 2 ]
      }
    },
    methods: {
      onMenuItemClick (path) {
        this.$router.push(`/settings/${path}`)
      }
    }
  }
</script>

<style lang="scss">
  .func-list {
    font-size: 1px !important;

    div[role="listitem"].selected > a {
      font-weight: bold;
    }

    div[role="listitem"].selected > a::before {
      background-color: #e36209;
      bottom: 0;
      content: "";
      left: 0;
      position: absolute;
      top: 0;
      width: 2px;
    }

    .v-list__tile {
      font-size: 12px;
      border-bottom: 1px solid #e1e4e8;
    }
  }
</style>
