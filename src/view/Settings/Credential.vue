<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat
                 color="blue-grey"
                 class="white--text"
                 v-on="on"
          >
            <v-icon>add_box</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="onNewClick(category.sshrsa)">
            ssh-rsa
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-card-title>
    <v-card-text class="pt-0">
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
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import { CATEGORY_SSH_RSA_PATH }  from '@/util/credentials'

  export default {
    name: 'SettingsCredential',
    data () {
      return {
        category: {
          sshrsa: CATEGORY_SSH_RSA_PATH
        },
        navs: [
          {
            text: 'Credentials'
          }
        ]
      }
    },
    mounted () {
      this.$store.dispatch(actions.credentials.list).then()
    },
    computed: {
      ...mapState({
        credentials: state => state.credentials.items
      }),
    },
    methods: {
      onNewClick (category) {
        this.$router.push('/settings/credentials/new/' + category)
      },

      onEditClick (credential) {
        this.$router.push('/settings/credentials/edit/' + credential.name)
      }
    }
  }
</script>

<style scoped>

</style>
