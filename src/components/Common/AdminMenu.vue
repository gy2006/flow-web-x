<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-toolbar-title v-on="on">
        <v-icon>account_circle</v-icon>
      </v-toolbar-title>
    </template>

    <v-list>
      <v-list-tile
          v-for="item in items"
          :key="item.title"
          avatar
      >
        <v-list-tile-avatar>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="mr-3">
            {{ $t(item.title) }}
          </v-list-tile-title>
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
        items: [
          {title: 'menu_profile', icon: 'account_circle'},
          {title: 'menu_system_admin', icon: 'settings'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
