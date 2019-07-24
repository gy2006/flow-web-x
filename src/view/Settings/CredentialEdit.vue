<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>
    <v-card-text>
      {{ name }}
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'SettingsCredentialEdit',
    computed: {
      ...mapState({
        loaded: state => state.credentials.loaded
      }),

      navs () {
        return [
          {
            text: 'Credentials',
            href: '#/settings/credentials'
          },
          {
            text: this.name
          }
        ]
      },

      name () {
        return this.$route.params.name
      }
    }
  }
</script>

<style scoped>

</style>