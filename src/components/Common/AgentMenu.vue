<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-toolbar-title v-on="on">
        <v-icon>dvr</v-icon>
      </v-toolbar-title>
    </template>
    <v-card>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon small class="grey--text rotate">flow-icon-loading1</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Online List</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon small class="grey--text">flow-icon-loading1</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Offline List</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    name: 'AgentMenu'
  }
</script>

<style scoped>

</style>
