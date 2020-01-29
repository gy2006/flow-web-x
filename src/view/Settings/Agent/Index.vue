<template>
  <!--  <v-data-table-->
  <!--      :items="items"-->
  <!--      hide-default-footer-->
  <!--      hide-default-header>-->

  <!--    <template v-slot:item="{item}">-->
  <!--      <tr>-->
  <!--        <td :class="[item.color, 'px-1']">-->
  <!--        </td>-->
  <!--        <td>-->
  <!--          <v-row align="center">-->
  <!--            <v-col cols="2">-->
  <!--              <span class="ml-2">{{ item.name }}</span>-->
  <!--            </v-col>-->
  <!--            <v-col cols="1">-->
  <!--              <v-icon small>{{ item.icon }}</v-icon>-->
  <!--            </v-col>-->
  <!--            <v-col cols="3">-->
  <!--              <v-chip v-for="tag in item.tags"-->
  <!--                      :key="tag"-->
  <!--                      class="my-0"-->
  <!--                      outlined-->
  <!--                      small-->
  <!--                      label-->
  <!--              >{{ tag }}-->
  <!--              </v-chip>-->
  <!--            </v-col>-->
  <!--            <v-col cols="4" class="agent-resource">-->
  <!--              <div>cpu: {{ item.numOfCpu }}</div>-->
  <!--              <div>memory: {{ item.freeMemory }} / {{ item.totalMemory }} (mb)</div>-->
  <!--              <div>disk: {{ item.freeDisk }} / {{ item.totalDisk }} (mb)</div>-->
  <!--            </v-col>-->
  <!--            <v-col cols="2">-->
  <!--              <v-btn icon class="ma-0" @click="onTokenCopyClick(item)">-->
  <!--                <v-icon small>flow-icon-file_copy</v-icon>-->
  <!--              </v-btn>-->
  <!--              <v-btn icon class="ma-0" @click="onDownloadClick(item)">-->
  <!--                <v-icon small>mdi-download</v-icon>-->
  <!--              </v-btn>-->
  <!--              <v-btn icon class="ma-0" @click="onEditClick(item)">-->
  <!--                <v-icon small>mdi-pencil</v-icon>-->
  <!--              </v-btn>-->
  <!--            </v-col>-->
  <!--          </v-row>-->
  <!--        </td>-->
  <!--      </tr>-->
  <!--    </template>-->

  <!--    <template slot="no-data">-->
  <!--      <v-alert :value="true">-->
  <!--        <v-icon small>mdi-alert-outline</v-icon>-->
  <!--        <span class="caption ml-1">Click '+' to create an agent</span>-->
  <!--      </v-alert>-->
  <!--    </template>-->
  <!--  </v-data-table>-->

  <v-treeview hoverable dense :items="items">
    <template v-slot:prepend="{ item }">
      <v-icon small>{{ item.icon }}</v-icon>
    </template>
    <template v-slot:append="{ item }">
      <v-chip v-for="tag in item.tags"
              :key="tag"
              class="my-0"
              outlined
              small
              label
      >{{ tag }}
      </v-chip>

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

      onDownloadClick(wrapper) {

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
  .agent-state {
    height: 100%;
    width: 5%;
  }

  .agent-resource {
    font-size: 10px;
  }
</style>
