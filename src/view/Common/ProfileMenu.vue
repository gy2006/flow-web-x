<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
        <v-btn text v-on="on" small class="mx-0 px-0">
          <v-icon>account_circle</v-icon>
        </v-btn>
    </template>

    <v-list nav dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ user.email }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item @click="onSettingsClick">
        <v-list-item-content>
          <v-list-item-title>{{ $t('menu.settings') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="onLogoutClick">
        <v-list-item-content>
          <v-list-item-title>{{ $t('menu.logout') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-menu>
</template>

<script>
  import actions from '@/store/actions'

  export default {
    name: 'AdminMenu',
    data () {
      return {

      }
    },

    methods: {
      onSettingsClick () {
        this.$router.push('/settings/profile')
      },

      onLogoutClick () {
        this.$store.dispatch(actions.auth.logout).then(() => {
          this.$router.replace('/login')
        })
      }
    }
  }
</script>

<style scoped>

</style>
