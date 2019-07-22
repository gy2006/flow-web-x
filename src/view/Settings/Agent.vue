<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
      <v-btn flat
             color="blue-grey"
             class="white--text"
             @click="onNewAgentClick"
      >
        <v-icon>add_box</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-data-table
          :items="agents"
          hide-actions
          hide-headers>

        <template slot="items" slot-scope="props">
          <td>
            <v-layout row align-center>
              <v-flex xs2>
                {{ props.item.name }}
              </v-flex>
              <v-flex xs2>
                <v-icon small>{{ props.item.icon }}</v-icon>
              </v-flex>
              <v-flex xs6>
                <v-chip v-for="tag in props.item.tags"
                        :key="tag"
                        class="my-0"
                        outline
                        small
                        label
                >{{ tag }}</v-chip>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon class="ma-0" @click="onDownloadClick(props.item)">
                  <v-icon small>vertical_align_bottom</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs1>
                <a @click="onEditClick(props.item)">Edit</a>
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
  import {mapState} from 'vuex'
  import actions from '@/store/actions'
  import {util} from '@/util/agents'

  export default {
    name: 'SettingsAgent',
    data () {
      return {
        items: [],
        navs: [
          {
            text: 'Agents'
          }
        ],
      }
    },
    mounted () {
      this.$store.dispatch(actions.agents.list).then()
    },
    computed: {
      ...mapState({
        agents: state => state.agents.items
      }),
    },
    watch: {
      agents (after) {
        this.items = util.convert(after)
      },
    },
    methods: {
      onNewAgentClick() {

      },

      onDownloadClick(wrapper) {

      },

      onEditClick(wrapper) {

      }
    }
  }
</script>

<style scoped>

</style>
