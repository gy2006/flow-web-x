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
              v-for="obj in localVars"
              :key="obj.name"
              :item="obj"
              :editable="true"
    ></env-item>

    <v-flex xs11 class="mt-4 mb-4">
      <span class="font-weight-light title">From YAML</span>
      <v-divider></v-divider>
    </v-flex>

    <env-item :edit="false"
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
        editable: true
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

        this.localVars = this.toVarObjectList(this.flow.locally, true)
      }
    },
    methods: {
      toVarObjectList (varsMap, edit) {
        let list = []

        for (let name in varsMap) {
          let value = varsMap[ name ]
          list.push({
            name: name,
            value: value,
            type: 'STRING',
            edit: edit
          })
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
      }
    }
  }
</script>

<style scoped>

</style>
