<template>
  <v-container>
    <v-flex xs11 class="mb-4">
      <span class="font-weight-light title">From Web</span>
      <v-divider></v-divider>
    </v-flex>

    <env-item :edit="false"
              v-for="obj in localVars"
              :key="obj.name"
              :obj="obj"
    ></env-item>

    <v-flex xs11 class="mt-4 mb-4">
      <span class="font-weight-light title">From YAML</span>
      <v-divider></v-divider>
    </v-flex>

    <env-item :edit="false"
              v-for="obj in ymlVars"
              :key="obj.name"
              :obj="obj"
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
    data: () => ({}),
    computed: {
      localVars () {
        if (!this.flow.locally || Object.keys(this.flow.locally).length === 0) {
          return [
            {
              name: '',
              value: '',
              type: 'STRING',
              edit: true
            } ]
        }

        return this.toVarObjectList(this.flow.locally)
      },

      ymlVars () {
        return this.toVarObjectList(this.flow.variables)
      }
    },
    methods: {
      toVarObjectList (varsMap) {
        let list = []

        for (let name in varsMap) {
          let value = varsMap[ name ]
          list.push({
            name,
            value,
            type: 'STRING',
            edit: false
          })
        }

        return list
      }
    }
  }
</script>

<style scoped>

</style>
