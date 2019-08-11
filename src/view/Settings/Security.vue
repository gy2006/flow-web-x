<template>
  <v-card>
    <v-card-title class="pb-0 bottom-border">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>
    <v-card-text class="pt-0">
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingsSecurity',
    data () {
      return {
        navs: [{
          text: 'Security'
        }]
      }
    }
  }
</script>

<style scoped>

</style>
