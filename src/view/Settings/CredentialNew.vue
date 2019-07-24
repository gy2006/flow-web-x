<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>
    <v-card-text>
      {{ category }}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingsCredentialNew',
    computed: {
      navs () {
        return [
          {
            text: 'Credentials',
            href: '#/settings/credentials'
          },
          {
            text: 'New - ' + this.category
          }
        ]
      },

      category () {
        return this.$route.params.category
      }
    }
  }
</script>

<style scoped>

</style>