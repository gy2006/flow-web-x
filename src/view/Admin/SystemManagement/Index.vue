<template>
    <v-layout align-start>
        <v-btn-toggle v-model="toggle_exclusive">
            <v-btn flat to="/admin/systemmanagement/credentials">
                <v-icon>format_align_left</v-icon>
                <span class="ml-3">Credentials</span>
            </v-btn>
        </v-btn-toggle>
        <router-view></router-view>
    </v-layout>
</template>

<script>
  export default {
    name: 'SystemMangement',
    data () {
      return {
        toggle_exclusive: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-btn-toggle {
    flex-flow: column;
  }
</style>
