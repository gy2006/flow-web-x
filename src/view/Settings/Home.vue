<template>
  <v-layout>
    <v-flex d-flex xs3>
      <settings-fun-list></settings-fun-list>
    </v-flex>

    <v-flex d-flex xs9 class="ml-2">
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
  import SettingsFunList from './FunList'

  export default {
    name: 'SettingsHome',
    components: {
      SettingsFunList
    }
  }
</script>

<style scoped>

</style>
