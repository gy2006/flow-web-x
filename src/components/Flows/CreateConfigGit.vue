<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-layout>
      <v-flex xs12 sm6>
        <v-form
            ref="form"
            lazy-validation
        >
          <v-text-field
              v-model="flow.webhook"
              label="Webhook"
              readonly
              append-icon="help"
              @click:append="onHelpClick('hook')"
          ></v-text-field>

          <v-text-field
              v-model="flow.gitUrl"
              label="Git URL"
              required
              append-icon="help"
              :rules="gitUrlRules"
              @click:append="onHelpClick('url')"
          ></v-text-field>

          <v-divider></v-divider>

          <v-subheader>
            <span>SSH Public Key</span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('flow.hint.create_ssh') }}</span>
            </v-tooltip>
          </v-subheader>

          <v-textarea
              box
              append-outer-icon="help"
              @click:prepend-inner="onAddSSHClick"
              @click:append-outer="onHelpClick('ssh')"
          ></v-textarea>
        </v-form>
      </v-flex>
    </v-layout>
    <v-btn color="primary" @click="handleNextClick">{{ $t('next') }}</v-btn>
    <v-btn flat @click="onBackClick">{{ $t('back') }}</v-btn>
    <v-btn flat @click="onNextClick">{{ $t('skip') }}</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'CreateConfigGit',
    props: {
      flow: {
        required: true,
        type: Object
      },
      onBackClick: {
        required: true,
        type: Function
      },
      onNextClick: {
        required: true,
        type: Function
      }
    },
    data () {
      return {
        gitUrlRules: [
          v => !!v || 'Git URL is required',
          v => (/(^(http|https):\/\/)|(^git@)/g.test(v)) || 'Git URL must https or ssh url'
        ]
      }
    },
    methods: {
      handleNextClick () {
        if (this.$refs.form.validate()) {
          this.onNextClick()
        }
      },

      onHelpClick (item) {
        console.log(item)
      },

      onAddSSHClick () {
        console.log('add ssh')
      }
    }
  }
</script>

<style scoped>

</style>
