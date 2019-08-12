<template>
  <v-card>
    <v-card-title class="pb-0 bottom-border">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>

    <v-card-text class="pt-0">
      <v-layout row wrap>
        <v-flex xs6>
          <text-box title="E-Mail"
                    :data="user.email"
                    readonly
          ></text-box>
          <text-box title="Role"
                    :data="user.role"
                    readonly
          ></text-box>
        </v-flex>

        <v-flex xs5 class="mt-2 ml-4">
          <div class="subheading font-weight-medium">Profile picture here</div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  import TextBox from '@/components/Common/TextBox'

  export default {
    name: 'SettingsProfile',
    components: {
      TextBox
    },
    data () {
      return {
        navs: [ {
          text: 'Profile'
        }]
      }
    }
  }
</script>

<style scoped>

</style>
