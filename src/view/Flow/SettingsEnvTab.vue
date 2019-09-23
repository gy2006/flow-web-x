<template>
  <v-container>
    <v-flex xs11 class="mb-4">
      <span class="font-weight-light title">From Web
        <v-btn icon
               @click="onAddLocalVar"
        >
          <v-icon class="font-weight-bold">add</v-icon>
        </v-btn>
      </span>
      <v-divider></v-divider>
    </v-flex>

    <env-item :edit="false"
              :flow="flow"
              v-for="obj in localVars"
              :key="obj.name"
              :item="obj"
              :editable="true"
              :onSaved="onVarSaved"
              :onRemoved="onVarRemoved"
    ></env-item>

    <v-flex xs11 class="mt-4 mb-4">
      <span class="font-weight-light title">From YAML</span>
      <v-divider></v-divider>
    </v-flex>

    <env-item :edit="false"
              :flow="flow"
              v-for="obj in ymlVars"
              :key="obj.name"
              :item="obj"
              :editable="false"
    ></env-item>
  </v-container>
</template>

<script>
  import EnvItem from '@/components/Flow/EnvItem'

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
        edit: true
      },

      localVars: []
    }),
    computed: {
      ymlVars () {
        return this.toVarObjectList(this.flow.variables, false)
      }
    },
    watch: {
      flow () {
        if (!this.flow.locally || Object.keys(this.flow.locally).length === 0) {
          const copy = Object.assign({}, this.empty)
          this.localVars = [ copy ]
          return
        }

        this.localVars = this.toVarObjectList(this.flow.locally, false)
      }
    },
    methods: {
      toVarObjectList (varsMap, edit) {
        let list = []

        for (let name in varsMap) {
          let value = varsMap[ name ]

          if (typeof (value) === 'string') {
            list.push({
              name: name,
              value: value,
              type: 'STRING',
              edit: edit
            })
          }

          if (typeof (value) === 'object') {
            list.push({
              name: name,
              value: value.data,
              type: value.type,
              edit: edit
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

        const copy = Object.assign({}, this.empty)
        this.localVars.push(copy)
      },

      onVarSaved (oldVal, newVal) {

      },

      onVarRemoved (val) {
        for (let i = 0; i < this.localVars.length; i++) {
          if (this.localVars[i].name === val.name) {
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
