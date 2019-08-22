<template>
  <v-layout>
    <v-flex xs6 class="ml-4">
      <v-card flat>
        <v-card-title>
          <v-autocomplete
              v-model="model"
              :items="searchResult"
              :search-input.sync="searchText"
              hide-no-data
              item-text="email"
              label="Search email to add member to flow"
              prepend-inner-icon="search"
          >
            <template v-slot:item="{ item }">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.email"></v-list-tile-title>
                <v-list-tile-sub-title v-text="item.role"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="onAddClick(item)">
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-list-tile-action>
            </template>
          </v-autocomplete>
        </v-card-title>

        <v-card-text>
          <v-divider></v-divider>
          <v-data-table
              hide-headers
              hide-actions
              :items="flowUsers"
              class="user-table"
          >
            <template v-slot:items="props">
              <td>avatar</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td>{{ props.item.role }}</td>
              <td class="text-xs-right">
                <v-btn flat icon class="ma-0" @click="onRemoveClick(props.item)">
                  <v-icon small>delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ searchText }}" found no results.
              </v-alert>
            </template>
          </v-data-table>
        </v-card-text>
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
        model: null,
        searchText: '',
        searchResult: [],
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

        return this.allUsers.filter(x => !this.flowUsers.some(y => x.id === y.id))
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
    },
    methods: {
      onAddClick (user) {
        let payload = {name: this.flow.name, userId: user.id}
        this.$store.dispatch(actions.flows.users.add, payload).catch((err) => {})
        this.searchText = ''
      },

      onRemoveClick (user) {
        let payload = {name: this.flow.name, userId: user.id}
        this.$store.dispatch(actions.flows.users.remove, payload).catch((err) => {})
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
