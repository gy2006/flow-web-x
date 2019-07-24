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
  import {mapState} from 'vuex'
  import actions from '@/store/actions'

  export default {
    name: 'CredentialEdit',
    computed: {
      ...mapState({
        loaded: state => state.credentials.loaded
      }),

      navs () {
        let items = [
          {
            text: 'Credentials',
            href: '#/settings/credentials'
          }
        ]

        if (this.isEditMode) {
          items.push({text: this.name, href: ''})
        }

        else if (this.isNewMode) {
          items.push({text: 'New', href: ''})
        }

        return items
      },

      /**
       * new | edit
       */
      category () {
        return this.$route.params.category
      },

      name () {
        return this.$route.params.name
      },

      isNewMode () {
        return this.category === 'new'
      },

      isEditMode () {
        return this.category === 'edit'
      }
    }
  }
</script>

<style scoped>

</style>