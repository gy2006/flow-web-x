<template>
  <v-layout row wrap>
    <v-flex xs7>
      <v-form ref="userForm" lazy-validation>
        <v-text-field label="Email"
                      readonly
                      v-model="userObj.email"
        ></v-text-field>
        <v-select
            :items="['Admin', 'Developer']"
            label="Role"
            v-model="userObj.role"
        ></v-select>
      </v-form>
    </v-flex>

    <v-flex xs7 d-flex>
      <v-btn outline color="warning" @click="onBackClick">{{ $t('back') }}</v-btn>
      <v-btn color="primary" @click="onSaveClick">{{ $t('save') }}</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Edit',
    props: {
      userObj: {
        type: Object,
        required: false,
        default () {
          return {
            email: '',
            role: '',
            default: true
          }
        }
      }
    },
    mounted () {
      if (this.userObj.default) {
        this.onBackClick()
        return
      }

      this.$emit('onConfigNav', {
        navs: [
          {
            text: 'Users',
            href: '#/settings/users'
          },
          {
            text: 'Edit'
          },
          {
            text: this.userObj.email
          }
        ],
        showAddBtn: false
      })
    },
    methods: {
      onBackClick () {
        this.$router.replace({name: 'SettingsUsersHome'})
      },

      onSaveClick () {

      }
    }
  }
</script>

<style scoped>

</style>
