<template>
  <v-dialog v-model="show" persistent max-width="80%" min-width="80%">
    <v-card>
      <v-card-title>
        <span class="headline">Create A Flow</span>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <name-input init-value="" v-on:input="onNameInput"/>
        <v-btn color="primary" @click.native="flowsCreate" :disabled="hasError">Next</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  // import Envs from '@/api/envs'
  import NameInput from './NameInput'
  import GitConfig from './GitConfig'
  import { createFlow } from '@/api/axios/api'
  export default {
    name: 'CreateFlow',
    components: {GitConfig, NameInput},
    methods: {
      open () {
        this.show = true
      },
      close () {
        this.show = false
      },
      onSave () {
        console.log('save flow')
      },
      onNameInput (name, errors) {
        this.hasError = errors > 0
        this.flow.name = name
      },
      flowsCreate () {
        createFlow(this.flow.name).then(res => {
          return res
        }).catch(err => {
          return err
        })
        this.show = false
      }
    },
    data () {
      return {
        show: false,
        hasError: true,
        flow: {
          name: '',
          envs: {}
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
