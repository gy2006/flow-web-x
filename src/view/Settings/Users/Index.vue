<template>
  <v-card>
    <v-card-title class="pb-0 bottom-border">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
      <v-btn flat
             color="blue-grey"
             class="white--text"
             @click="onNewUserClick"
      >
        <v-icon>add_box</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-data-table
          :headers="headers"
          :items="users"
          :pagination.sync="pagination"
          :total-items="total"
          :search="searchText"
      >
        <template v-slot:items="props">
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.role }}</td>
          <td>{{ props.item.createdAt }}</td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ searchText }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import actions from '@/store/actions'
  import { mapState } from 'vuex'

  export default {
    name: 'SettingsUsersHome',
    data () {
      return {
        navs: [
          {
            text: 'Users'
          }
        ],
        searchText: '',
        pagination: {
          page: 1,
          rowsPerPage: 5
        },
        headers: [
          {
            text: 'Email',
            align: 'left',
            sortable: true,
            value: 'email'
          },
          {text: 'Role', value: 'role'},
          {text: 'Created At', value: 'createdAt'}
        ]
      }
    },
    mounted () {
      this.load()
    },
    computed: {
      ...mapState({
        users: state => state.users.items,
        total: state => state.users.total
      })
    },
    watch: {
      pagination () {
        this.load()
      }
    },
    methods: {
      load () {
        // const { sortBy, descending, page, rowsPerPage } = this.pagination
        const { page, rowsPerPage } = this.pagination
        this.$store.dispatch(actions.users.listAll, {page: page, size: rowsPerPage}).catch((err) => {})
      },

      onNewUserClick () {

      }
    }
  }
</script>

<style scoped>

</style>
