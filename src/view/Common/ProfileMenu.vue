<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
        <v-btn flat v-on="on" small class="mx-0 px-0">
          <v-icon>account_circle</v-icon>
        </v-btn>
    </template>

    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile @click="onSettingsClick">
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ $t('menu.settings') }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile @click="onLogoutClick">
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ $t('menu.logout') }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'AdminMenu',
    data () {
      return {

      }
    },

    methods: {
      onSettingsClick () {
        this.$router.push('/settings/profile')
      },

      onLogoutClick () {

      }
    }
  }
</script>

<style scoped>

</style>
