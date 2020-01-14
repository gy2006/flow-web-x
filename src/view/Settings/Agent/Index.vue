<template>
  <v-data-table
      :items="items"
      hide-default-footer
      hide-default-header>

    <template v-slot:item="{item}">
      <tr>
        <td :class="[item.color, 'px-1']">
        </td>
        <td>
          <v-row align="center">
            <v-col cols="2">
              <span class="ml-2">{{ item.name }}</span>
            </v-col>
            <v-col cols="1">
              <v-icon small>{{ item.icon }}</v-icon>
            </v-col>
            <v-col cols="3">
              <v-chip v-for="tag in item.tags"
                      :key="tag"
                      class="my-0"
                      outlined
                      small
                      label
              >{{ tag }}
              </v-chip>
            </v-col>
            <v-col cols="4" class="agent-resource">
              <div>cpu: {{ item.numOfCpu }}</div>
              <div>memory: {{ item.freeMemory }} / {{ item.totalMemory }} (mb)</div>
              <div>disk: {{ item.freeDisk }} / {{ item.totalDisk }} (mb)</div>
            </v-col>
            <v-col cols="2">
              <v-btn icon class="ma-0" @click="onTokenCopyClick(item)">
                <v-icon small>flow-icon-file_copy</v-icon>
              </v-btn>
              <v-btn icon class="ma-0" @click="onDownloadClick(item)">
                <v-icon small>mdi-download</v-icon>
              </v-btn>
              <v-btn icon class="ma-0" @click="onEditClick(item)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </td>
      </tr>
    </template>

    <template slot="no-data">
      <v-alert :value="true">
        <v-icon small>mdi-alert-outline</v-icon>
        <span class="caption ml-1">Click '+' to create an agent</span>
      </v-alert>
    </template>
  </v-data-table>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import { util } from '@/util/agents'

  export default {
    name: 'SettingsAgentHome',
    mounted () {
      this.$emit('onConfigNav', {
        navs: [
          {
            text: 'Agents'
          }
        ],
        showAddBtn: true
      })
      this.$store.dispatch(actions.agents.list).then()
    },
    computed: {
      ...mapState({
        agents: state => state.agents.items
      }),

      items () {
        return util.convert(this.agents)
      }
    },
    methods: {
      onAddBtnClick () {
        this.$router.push('/settings/agents/new')
      },

      onDownloadClick (wrapper) {

      },

      onTokenCopyClick (wrapper) {
        this.$copyText(wrapper.token)
          .then((e) => {
            const text = 'Token ' + e.text + ' is copied'
            this.showSnackBar(text, 'info')
          })
          .catch((e) => {

          })
      },

      onEditClick (wrapper) {
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
