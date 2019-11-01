<template>
  <v-list class="pa-0 func-list full-size">
    <v-list-item class="grey lighten-2">
      <v-list-item-title class="font-weight-bold">
        Settings
      </v-list-item-title>
    </v-list-item>

    <v-list-item v-for="item in items"
                 :key="item.path"
                 :class="['blue--text', item.path === current ? 'selected' : '']"
                 @click="onMenuItemClick(item.path)">
      <v-list-item-title>
        {{ $t(`${item.i18n}`) }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
  export default {
    name: 'SettingsFunList',
    data() {
      return {
        items: [
          {
            i18n: 'settings.li.profile',
            path: 'profile'
          },
          {
            i18n: 'settings.li.users',
            path: 'users'
          },
          {
            i18n: 'settings.li.agent',
            path: 'agents'
          },
          {
            i18n: 'settings.li.credential',
            path: 'credentials'
          }
        ]
      }
    },
    computed: {
      current() {
        return this.$route.path.split('/')[2]
      }
    },
    methods: {
      onMenuItemClick(path) {
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
