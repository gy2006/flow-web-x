<template>
  <v-layout class="align-center justify-center fill-height row">
    <v-flex xs12 sm6>
      <v-flex>
        <v-text-field
            v-model="email"
            label="E-mail"
            required
        ></v-text-field>
      </v-flex>

      <v-flex>
        <v-text-field
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            :label="$t('password')"
            v-model="password"
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-flex>

      <v-flex>
        <v-btn color="primary" class="float-right" @click="onLoginClick">{{ $t('login') }}</v-btn>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        showPassword: false
      }
    },
    methods: {
      onLoginClick () {

      }
    }
  }
</script>

<style scoped>
  .float-right {
    float: right;
  }
</style>
