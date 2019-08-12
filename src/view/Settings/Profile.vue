<template>
  <v-card>
    <v-card-title class="pb-0 bottom-border">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>

    <v-card-text class="pt-0">
      <v-layout row wrap>
        <v-flex xs6>
          <text-box title="E-Mail"
                    :model="{data: user.email}"
                    readonly
          ></text-box>
          <text-box title="Role"
                    :model="{data: user.role}"
                    readonly
          ></text-box>
        </v-flex>

        <v-flex xs5 class="mt-2 ml-4">
          <div class="subheading font-weight-medium">Profile picture here</div>
        </v-flex>

        <v-flex xs6>
          <div>Change Password</div>
          <v-divider class="my-2"></v-divider>

          <form>
            <text-box title="Old password"
                      password
                      :model="passwords.old"
                      :rules="notEmptyRules"
            ></text-box>
            <text-box title="New password"
                      password
                      :model="passwords.newOne"
                      :rules="notEmptyRules"
            ></text-box>
            <text-box title="Confirm New password"
                      password
                      :model="passwords.confirmed"
                      :rules="confirmedRules"
            ></text-box>
          </form>

          <v-btn color="primary" @click="onUpdatePasswordClick">Update password</v-btn>
          <v-btn color="info" outline @click="onForgotPasswordClick">I forgot my password</v-btn>
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
        navs: [
          {
            text: 'Profile'
          } ],
        passwords: {
          old: {data: ''},
          newOne: {data: ''},
          confirmed: {data: ''}
        },
        notEmptyRules: [
          v => !!v || this.$t('settings.profile.password_not_empty')
        ],
        confirmedRules: [
          v => !!v || this.$t('settings.profile.password_not_empty'),
          v => v === this.passwords.newOne.data || this.$t('settings.profile.password_not_same')
        ]
      }
    },
    methods: {
      onUpdatePasswordClick () {
        console.log(this.passwords)
      },

      onForgotPasswordClick () {

      }
    }
  }
</script>

<style scoped>

</style>
