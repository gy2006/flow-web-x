<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-layout>
      <v-flex xs12 sm6>
        <v-form
            ref="form"
            lazy-validation
        >
          <v-text-field
              v-model="webhook"
              label="Webhook"
              readonly
              append-icon="help"
              @click:append="onHelpClick('hook')"
          ></v-text-field>

          <v-text-field
              v-model="gitUrl"
              label="Git URL"
              required
              append-icon="help"
              :rules="gitUrlRules"
              @click:append="onHelpClick('url')"
          ></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    <v-btn color="primary" @click="handleNextClick">{{ $t('next') }}</v-btn>
    <v-btn flat @click="onBackClick">{{ $t('back') }}</v-btn>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn flat @click="onSkipClick" v-on="on">{{ $t('skip') }}</v-btn>
      </template>
      <span>{{ $t('flow.hint.git_skip') }}</span>
    </v-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'CreateConfigGit',
    props: {
      webhook: {
        required: true,
        type: String
      },
      onBackClick: {
        required: true,
        type: Function
      },
      onNextClick: {
        required: true,
        type: Function
      },
      onSkipClick: {
        required: true,
        type: Function
      }
    },
    data () {
      return {
        gitUrl: '',
        gitUrlRules: [
          v => !!v || this.$t('flow.hint.git_url_required'),
          v => (/(^(http|https):\/\/)|(^git@)/g.test(v)) || this.$t('flow.hint.git_url_format')
        ]
      }
    },
    methods: {
      handleNextClick () {
        if (this.$refs.form.validate()) {
          this.onNextClick(this.gitUrl)
        }
      },
    }
  }
</script>

<style scoped>

</style>
