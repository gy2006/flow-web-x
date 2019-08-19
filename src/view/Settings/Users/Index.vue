<template>
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
</template>

<script>
  import actions from '@/store/actions'
  import { mapState } from 'vuex'

  export default {
    name: 'SettingsUsersHome',
    data () {
      return {
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
      this.$emit('onConfigNav', {
        navs: [
          {
            text: 'Users'
          }
        ],
        showAddBtn: true
      })
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

      onAddBtnClick () {
        console.log('click......')
      }
    }
  }
</script>

<style scoped>

</style>
