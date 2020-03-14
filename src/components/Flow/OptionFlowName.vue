<template>
  <div>
    <v-row>
      <v-col>
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
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <span class="caption grey--text text--darken-1">YAML from Git Repo</span>
        <v-row align="center">
          <v-col cols="4">
            <v-switch :label="[ flow.isLoadYamlFromRepo ? 'Git Repo' : 'Yaml Setting']"
                      v-model="flow.isLoadYamlFromRepo"></v-switch>
          </v-col>

          <v-col cols="5">
            <v-combobox dense
                        outlined
                        class="flow-branch-combo"
                        prepend-icon="mdi-source-branch"
                        :items="gitBranches"
                        :disabled="!flow.isLoadYamlFromRepo"
                        v-model="flow.yamlRepoBranch"
                        label="branch:">
            </v-combobox>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import vars from '@/util/vars'
  import { flowNameRules } from '@/util/rules'
  import { mapState } from 'vuex'

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
    },
    computed: {
      ...mapState({
        gitBranches: state => state.flows.gitBranches,
      })
    }
  }
</script>

<style lang="scss">
  .flow-branch-combo {
    .v-text-field__details {
      display: none;
    }
  }
</style>
