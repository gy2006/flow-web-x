<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>
    <v-card-text class="pt-0">

    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingsAgentEdit',
    props: {
      wrapper: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
      }
    },
    computed: {
      navs () {
        return [
          {
            text: 'Agents',
            href: '#/settings/agents'
          },
          {
            text: this.category.charAt(0).toUpperCase() + this.category.slice(1)
          }
        ]
      },

      /**
       * new | edit
       */
      category () {
        return this.$route.params.category
      }
    }
  }
</script>

<style scoped>

</style>