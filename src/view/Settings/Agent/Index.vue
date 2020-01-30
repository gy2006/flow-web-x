<template>
  <v-treeview hoverable dense :items="items">
    <template v-slot:prepend="{ item }">
      <v-icon small>{{ item.icon }}</v-icon>
    </template>
    <template v-slot:label="{ item }">
      <span>{{ item.name }}</span>

      <v-icon x-small
              :class="[item.color, 'mx-2']"
              v-if="item.isAgent"
      >mdi-checkbox-blank-circle
      </v-icon>

      <v-chip v-for="tag in item.tags"
              :key="tag"
              class="my-0 mr-1"
              outlined
              x-small
              label
      >{{ tag }}
      </v-chip>
    </template>
    <template v-slot:append="{ item }">
      <div v-if="item.isAgent && !item.hostId">
        <v-btn icon class="ma-0" @click="onTokenCopyClick(item)">
          <v-icon small>flow-icon-file_copy</v-icon>
        </v-btn>
        <v-btn icon class="ma-0" @click="onEditClick(item)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </template>
  </v-treeview>
</template>

<script>
  import {mapState} from 'vuex'
  import actions from '@/store/actions'
  import {AgentWrapper} from '@/util/agents'
  import {HostWrapper} from '@/util/hosts'

  export default {
    name: 'SettingsAgentHome',
    data() {
      return {
        hostMap: {},
        items: [
          {
            id: 1,
            name: 'Agents:',
            children: []
          },
          {
            id: 2,
            name: 'Hosts:',
            children: []
          }
        ]
      }
    },
    mounted() {
      this.$emit('onConfigNav', {
        navs: [
          {
            text: 'Agents'
          }
        ],
        showAddBtn: true
      })

      this.$store.dispatch(actions.hosts.list).then(() => {
        this.$store.dispatch(actions.agents.list).then()
      })
    },
    computed: {
      ...mapState({
        hosts: state => state.hosts.items,
        agents: state => state.agents.items
      }),
    },
    watch: {
      hosts(newVal) {
        let hosts = this.items[1]
        hosts.children = []
        this.hostMap = {}

        for (let host of newVal) {
          let wrapper = new HostWrapper(host)
          hosts.children.push(wrapper)
          this.hostMap[wrapper.id] = wrapper
        }
      },

      agents(newVal) {
        let agents = this.items[0]
        agents.children = []

        Object.values(this.hostMap).forEach(value => {
          value.children = []
        })

        for (let agent of newVal) {
          if (agent.hostId) {
            this.hostMap[agent.hostId].children.push(new AgentWrapper(agent))
            continue
          }

          agents.children.push(new AgentWrapper(agent))
        }
      }
    },
    methods: {
      onAddBtnClick() {
        this.$router.push('/settings/agents/new')
      },

      onTokenCopyClick(wrapper) {
        this.$copyText(wrapper.token)
          .then((e) => {
            const text = 'Token ' + e.text + ' is copied'
            this.showSnackBar(text, 'info')
          })
          .catch((e) => {

          })
      },

      onEditClick(wrapper) {
        this.$router.push('/settings/agents/edit/' + wrapper.name)
      }
    }
  }
</script>

<style scoped>
</style>
