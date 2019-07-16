<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-data-table
          :items="agents"
          hide-actions
          hide-headers>

        <template slot="items" slot-scope="props">
          <td>
            <v-layout row>
              <v-flex xs2>
                {{ props.item.name }}
              </v-flex>
              <v-flex xs2>
                <v-icon small>flow-icon-linux</v-icon>
              </v-flex>
              <v-flex xs2>
                tags..
              </v-flex>
              <v-flex xs2>
                Tokens: xxx
              </v-flex>
              <v-flex xs2>
              </v-flex>
              <v-flex xs2>
                <a>Edit</a>
              </v-flex>
            </v-layout>
          </td>
        </template>

        <template slot="no-data">
          <v-alert :value="true" color="primary" icon="warning">
            Click to create new agent
          </v-alert>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingsAgent',
    data () {
      return {
        items: [
          {
            text: 'Agents'
          }
        ],
        agents: [
          {
            name: 'Agent-01'
          },
          {
            name: 'Agent-02'
          }
        ]
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
