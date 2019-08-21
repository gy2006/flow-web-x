<template>
  <v-layout>
    <v-flex xs8 class="ml-4">
      <v-card flat>
        <v-card-title>
          <v-autocomplete
              v-model="idListFromSearch"
              :items="searchResult"
              :search-input.sync="searchText"
              hide-no-data
              item-text="email"
              item-value="id"
              label="Search email to add member to flow"
              append-outer-icon="search"
          ></v-autocomplete>
        </v-card-title>

        <v-data-table
            hide-headers
            hide-actions
            :items="flowUsers"
            class="user-table"
        >
          <template v-slot:items="props">
            <td>
              <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
              ></v-checkbox>
            </td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td>{{ props.item.role }}</td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ searchText }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapState} from 'vuex'
  import actions from '@/store/actions'

  export default {
    name: 'SettingsUserTab',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        searchText: '',
        searchResult: [],
        idListFromSearch: []
      }
    },
    computed: {
      ...mapState({
        flowUsers: state => state.flows.users,
        allUsers: state => state.users.items,
      }),

      notInFlowUsers () {
        if (this.flowUsers.length === 0 || this.allUsers.length === 0) {
          return []
        }

        return this.allUsers.filter(x => this.flowUsers.some(y => x.id !== y.id))
      }
    },
    mounted () {
      this.$store.dispatch(actions.flows.users.list, this.flow.name).catch(() => {
      })
      this.$store.dispatch(actions.users.listAll, {page: 1, size: 99999}).catch(() => {
      })
    },
    watch: {
      searchText (val) {
        this.searchResult = this.notInFlowUsers.filter(x => x.email.includes(val))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-table {
    td:first-child {
      width: 10%;
    }
  }
</style>
