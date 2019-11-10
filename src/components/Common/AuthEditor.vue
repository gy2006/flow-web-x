<template>
  <div>
    <v-row>
      <v-col>
        <span class="body-2 grey--text">Auth Username & Password</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
            label="Username"
            v-model="model.username"
            :rules="authFormRules"
            :readonly="isReadOnly"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="model.password"
            :type="showPassword ? 'text' : 'password'"
            :rules="authFormRules"
            :readonly="isReadOnly"
            @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { authFormRules } from '@/util/rules'

  export default {
    name: 'AuthEditor',
    props: {
      /**
       * Ex: {
       *   username: 'xxx',
       *   password: 'xxx'
       * }
       */
      model: {
        type: Object,
        required: true
      },
      isReadOnly: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    data () {
      return {
        showPassword: false,
        authFormRules: authFormRules(this)
      }
    }
  }
</script>

<style scoped>

</style>
