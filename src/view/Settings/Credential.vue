<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
      <v-btn flat
             color="blue-grey"
             class="white--text"
             @click="onNewClick"
      >
        <v-icon>add_box</v-icon>
      </v-btn>
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

  export default {
    name: 'SettingsCredential',
    data () {
      return {
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
      onNewClick () {
        this.$router.push('/settings/credentials/new')
      },

      onEditClick (credential) {
        this.$router.push('/settings/credentials/edit/' + credential.name)
      }
    }
  }
</script>

<style scoped>

</style>
