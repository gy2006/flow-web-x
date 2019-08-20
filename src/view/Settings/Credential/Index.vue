<template>
  <v-data-table
      :items="credentials"
      hide-actions
      hide-headers>
    <template slot="items" slot-scope="props">
      <td>
        <v-layout row align-center>
          <v-flex xs2>
            {{ props.item.name }}
          </v-flex>
          <v-flex xs1>
            {{ props.item.category }}
          </v-flex>
          <v-flex xs8>
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
        Click button to create credential
      </v-alert>
    </template>
  </v-data-table>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import { CATEGORY_SSH_RSA_PATH } from '@/util/credentials'

  export default {
    name: 'SettingsCredentialHome',
    data () {
      return {
        category: {
          sshrsa: CATEGORY_SSH_RSA_PATH
        }
      }
    },
    mounted () {
      this.$emit('onConfigNav', {
        navs: [
          {
            text: 'Credentials'
          }
        ],
        showAddBtn: true
      })
      this.$store.dispatch(actions.credentials.list).then()
    },
    computed: {
      ...mapState({
        credentials: state => state.credentials.items
      })
    },
    methods: {
      onAddBtnClick () {
        this.$router.push({
          name: 'SettingsCredentialNew',
          params: {
            category: this.category.sshrsa.toUpperCase()
          }
        })
      },

      onEditClick (credential) {
        this.$router.push('/settings/credentials/edit/' + credential.name)
      }
    }
  }
</script>

<style scoped>

</style>
