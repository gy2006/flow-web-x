<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn flat v-on="on" small class="mx-0 px-0">
        <v-icon>dvr</v-icon>
      </v-btn>
    </template>
    <v-list class="pa-0 agent-list">
      <v-list-tile avatar
                   v-for="agent in items"
                   :key="agent.id"
                   @click="onAgentItemClick"
      >
        <div :class="[agent.color, 'state']"></div>
        <div class="icon">
          <v-icon small>{{ agent.icon }}</v-icon>
        </div>
        <div class="title">
          <v-list-tile-title>{{ agent.name }}</v-list-tile-title>
        </div>
        <v-list-tile-action>
          <!--          <v-chip small light :color="agent.color" text-color="white">{{ $t(agent.text) }}</v-chip>-->
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
    import actions from '@/store/actions'
    import {subscribeTopic} from '@/store/subscribe'
    import {AgentWrapper, util} from '@/util/agents'
    import {mapState} from 'vuex'

    export default {
        name: 'AgentMenu',
        data() {
            return {
                items: []
            }
        },
        mounted() {
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
            agents(after) {
                this.items = util.convert(after)
            },

            updated(after) {
                let wrapper = new AgentWrapper(after)
                this.$notify({
                    group: 'appInfo',
                    text: `Agent '${wrapper.name}' ${this.$t(wrapper.text)}`,
                    duration: 5000
                })
            }
        },
        methods: {
            onAgentItemClick() {
                // do nothing
            }
        }
    }
</script>

<style lang="scss">
  .agent-list {
    min-width: 200px;

    .state {
      height: 100%;
      width: 5%;
    }

    .icon {
      margin-left: 5px;
      margin-right: 5px;
      width: 10%;
    }

    .title {
      width: 50%;
    }

    .v-list__tile {
      padding: 0 !important;
    }

    .agent-name {
      min-width: 100px !important;
    }
  }
</style>
