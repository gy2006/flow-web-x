<template>
  <div>
    <span class="caption grey--text text--darken-1">{{ `Flow Name (${vars.flow.name})` }}</span>

    <div class="d-flex">
      <v-text-field
          class="pt-1"
          :rule="flowNameRules"
          v-model="flow.name"
          readonly
      ></v-text-field>

      <v-btn
          small
          outlined
          class="mt-3"
          color="indigo"
          disabled
      >Rename
      </v-btn>
    </div>
  </div>
</template>

<script>
  import vars from '@/util/vars'
  import { flowNameRules } from '@/util/rules'

  export default {
    name: 'OptionFlowName',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        vars: vars,
        flowNameRules: flowNameRules(this)
      }
    }
  }
</script>

<style scoped>

</style>
