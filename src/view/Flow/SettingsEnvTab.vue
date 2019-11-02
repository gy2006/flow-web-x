<template>
  <v-col cols="10">

    <v-row align="center">
      <v-col class="mb-4">
      <span class="font-weight-light title">Variables
        <v-btn icon
               @click="onAddLocalVar"
        >
          <v-icon class="font-weight-bold">mdi-plus</v-icon>
        </v-btn>
      </span>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <env-item :edit="false"
              :flow="flow"
              :item="obj"
              v-for="obj in localVars"
              :key="`local-${obj.name}`"
              :editable="obj.editable"
              :onSaved="onVarSaved"
              :onRemoved="onVarRemoved"
    ></env-item>

    <v-row>
      <v-col>
        <span class="font-weight-light title">YAML</span>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <env-item :edit="false"
              :flow="flow"
              v-for="obj in ymlVars"
              :key="`yml-${obj.name}`"
              :item="obj"
              :editable="obj.editable"
    ></env-item>

  </v-col>
</template>

<script>
  import EnvItem from '@/components/Flow/EnvItem'
  import _ from 'lodash'

  export default {
    name: 'SettingsEnvTab',
    components: {
      EnvItem
    },
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    data: () => ({
      empty: {
        name: '',
        value: '',
        type: 'STRING',
        edit: true,
        editable: true
      },

      localVars: []
    }),
    mounted () {
      this.loadLocalVars(this.flow)
    },
    computed: {
      ymlVars () {
        return this.toVarObjectList(this.flow.variables, false)
      }
    },
    watch: {
      flow (after) {
        this.loadLocalVars(after)
      }
    },
    methods: {
      loadLocalVars (flow) {
        if (!flow.locally || Object.keys(flow.locally).length === 0) {
          const copy = _.cloneDeep(this.empty)
          this.localVars = [ copy ]
          return
        }

        this.localVars = this.toVarObjectList(flow.locally, false)
      },

      toVarObjectList (varsMap, edit) {
        let list = []

        for (let name in varsMap) {
          let value = varsMap[ name ]

          if (typeof (value) === 'string') {
            list.push({
              name: name,
              value: value,
              type: 'STRING',
              edit: false,
              editable: false
            })
          }

          if (typeof (value) === 'object') {
            list.push({
              name: name,
              value: value.data,
              type: value.type,
              edit: edit,
              editable: value.editable
            })
          }
        }

        return list
      },

      onAddLocalVar () {
        // return if has empty name
        for (let item of this.localVars) {
          if (item.name === '') {
            return
          }
        }

        const copy = _.cloneDeep(this.empty)
        this.localVars.push(copy)
      },

      onVarSaved (oldVal, newVal) {

      },

      onVarRemoved (val) {
        for (let i = 0; i < this.localVars.length; i++) {
          if (this.localVars[ i ].name === val.name) {
            this.localVars.splice(i, 1)
            break
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
