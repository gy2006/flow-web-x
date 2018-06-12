<template>
  <v-app>
    <v-toolbar
      color="grey"
      dark
      fixed
      app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        drawer: false
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
