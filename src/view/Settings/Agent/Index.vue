<template>
  <v-data-table
      :items="items"
      hide-actions
      hide-headers>

    <template slot="items" slot-scope="props">
      <td>
        <v-layout row align-center>
          <v-flex xs2>
            {{ props.item.name }}
          </v-flex>
          <v-flex xs1>
            <v-icon small>{{ props.item.icon }}</v-icon>
          </v-flex>
          <v-flex xs3>
            <v-chip v-for="tag in props.item.tags"
                    :key="tag"
                    class="my-0"
                    outline
                    small
                    label
            >{{ tag }}
            </v-chip>
          </v-flex>
          <v-flex xs4 class="agent-resource">
            <div>cpu: {{ props.item.numOfCpu }}</div>
            <div>memory: {{ props.item.freeMemory }} / {{ props.item.totalMemory }} (mb)</div>
            <div>disk: {{ props.item.freeDisk }} / {{ props.item.totalDisk }} (mb)</div>
          </v-flex>
          <v-flex xs1>
            <v-btn flat icon class="ma-0" @click="onTokenCopyClick(props.item)">
              <v-icon small>flow-icon-file_copy</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn flat icon class="ma-0" @click="onDownloadClick(props.item)">
              <v-icon small>vertical_align_bottom</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn flat icon class="ma-0" @click="onEditClick(props.item)">
              <v-icon small>edit</v-icon>
            </v-btn>
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
        this.snackbarShow = true

        this.$copyText(wrapper.token)
          .then((e) => {
            const text = 'Token ' + e.text + ' is copied'
            this.$store.commit(actions.app.showSnackbar, text)
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
  .agent-resource {
    font-size: 10px;
  }
</style>
