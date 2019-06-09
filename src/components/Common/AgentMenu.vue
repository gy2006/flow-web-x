<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-toolbar-title v-on="on">
        <v-icon>dvr</v-icon>
      </v-toolbar-title>
    </template>
    <v-list>
      <v-list-tile avatar
                   v-for="agent in items"
                   :key="agent.id"
      >
        <v-list-tile-avatar>
          <v-icon small>{{ agent.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ agent.name }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-chip small light :color="agent.color" text-color="white">{{ $t(agent.text) }}</v-chip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  import actions from '@/store/actions'
  import { subscribeTopic } from '@/store/subscribe'
  import { AgentWrapper } from '@/util/agents'
  import { mapState } from 'vuex'

  export default {
    name: 'AgentMenu',
    data () {
      return {
        items: []
      }
    },
    mounted () {
      this.$store.dispatch(actions.agents.list).then()
      subscribeTopic.agents(this.$store)
    },
    computed: {
      ...mapState({
        agents: state => state.agents.items,
        updated: state => state.agents.updated
      })
    },
    watch: {
      agents (after) {
        let list = []
        for (let agent of after) {
          list.push(new AgentWrapper(agent))
        }
        this.items = list
      },

      updated (after) {
        let wrapper = new AgentWrapper(after)
        this.$notify({
          group: 'appInfo',
          text: `Agent '${wrapper.name}' ${this.$t(wrapper.text)}`,
          duration: 5000
        })
      }
    }
  }
</script>

<style scoped>

</style>
