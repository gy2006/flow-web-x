<template>
  <v-layout class="align-center justify-center fill-height row">
    <v-flex xs12 sm6>
      <v-card>
        <v-card-title class="pb-0">
          <span class="title font-weight-bold">{{ $t('login') }}</span>
        </v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <span class="error--text caption">{{ error }}</span>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onLoginClick">{{ $t('login') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import actions from '@/store/actions'

  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        showPassword: false,
        error: ''
      }
    },
    methods: {
      onLoginClick () {
        let data = {username: this.email, password: this.password}
        this.$store.dispatch(actions.auth.login, data)
          .then(() => {
            this.$router.replace('/')
          })
          .catch((error) => {
            this.error = error.message
          })
      }
    }
  }
</script>

<style scoped>

</style>
