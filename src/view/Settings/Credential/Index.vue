<template>
  <v-data-table
      :items="credentials"
      :loading="loading"
      hide-default-footer
      hide-default-headers>
    <template v-slot:item="{item}">
      <tr>
        <td>
          <v-row align="center">
            <v-col cols="3">
              {{ item.name }}
            </v-col>
            <v-col cols="3">
              {{ item.category }}
            </v-col>
            <v-col cols="4">
            </v-col>
            <v-col cols="1">
              <v-btn icon class="ma-0" @click="onEditClick(item)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </td>
      </tr>
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
        loading: false,
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

      this.loading = true
      this.$store.dispatch(actions.credentials.list).then(() => {
        this.loading = false
      })
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
        this.$router.push({
          name: 'SettingsCredentialEdit',
          params: {
            credentialObj: credential
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
