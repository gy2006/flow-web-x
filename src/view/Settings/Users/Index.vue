<template>
  <v-card>
    <v-card-title class="pb-0 bottom-border">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
      <v-btn flat
             color="blue-grey"
             class="white--text"
             @click="onNewUserClick"
      >
        <v-icon>add_box</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="pt-0">
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingsUsersHome',
    data () {
      return {
        navs: [
          {
            text: 'Users'
          }
        ]
      }
    },
    methods: {
      onNewUserClick () {

      }
    }
  }
</script>

<style scoped>

</style>
