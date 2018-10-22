<template>
    <v-card class="ml-3" width="100%">
        <v-card-title class="blue lighten-4">
          <h4>RSA证书</h4>
          <v-spacer/>
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-btn
              slot="activator"
              color="green lighten-2"
              dark
            >
              添加 Credential
            </v-btn>

            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                名称
              </v-card-title>

              <v-card-text>
                <name-input init-value="" v-on:input="onNameInput"/>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="credentialsCreate()"
                >
                  生成
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <div class="text-xs-center mt-5" v-if="!credentials.data">
          <v-progress-circular
          indeterminate
          color="purple"
          ></v-progress-circular>
        </div>
        <v-data-table
          :headers="headers"
          :items="credentials.data"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">--</td>
            <td class="text-xs-left">{{ props.item.createdAt | datefmt('YYYY-MM-DD HH:mm:ss') }}</td>
            <td class="text-xs-left text--primary key">
              <v-list-tile-content style="width:50px">
                <v-list-tile-title>
                  {{props.item.publicKey}}
                  {{props.item.privateKey}}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-btn color="info"  small @click="look(props.item.publicKey, props.item.privateKey)">查看</v-btn>
            </td>
            <td class="text-xs-left">
                <v-icon
                    small
                    @click="deleteItem(props.item)"
                >
                    delete
                </v-icon>
            </td>
          </template>
        </v-data-table>
        <v-dialog v-model="lookKey" width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">公钥/私钥</span>
            </v-card-title>
            <v-card-text>
              <h3>公钥</h3>
              <p class="a">{{key.publicKey}}</p>
              <br>
              <h3>私钥</h3>
              <p class="a">{{key.privateKey}}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="lookKey = false">关闭</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
  import NameInput from '@/components/CreateFlow/NameInput'
  import { createCredentials, getCredentials } from '@/api/axios/api'
  export default {
    data () {
      return {
        dialog: false,
        lookKey: false,
        key: {
          publicKey: '',
          privateKey: ''
        },
        credentials: {
          name: '',
          data: []
        },
        headers: [
          {
            text: '名称',
            align: 'left',
            sortable: false
          },
          { text: '创建人', sortable: false },
          { text: '创建时间', sortable: false },
          { text: 'Fingerprint', sortable: false },
          { text: '', sortable: false }
        ]
      }
    },
    created () {
      this.credentialsGet()
    },
    methods: {
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
      credentialsCreate () {
        createCredentials(this.credentials.name).then(res => {
          this.dialog = false
          if (res.data) {
            this.credentialsGet()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      credentialsGet () {
        getCredentials().then(res => {
          this.credentials.data = res.data
        })
      },
      onNameInput (name, errors) {
        this.credentials.name = name
      },
      look (publicKey, privateKey) {
        this.key.publicKey = publicKey
        this.key.privateKey = privateKey
        this.lookKey = true
      }
    },
    components: {
      NameInput
    }
  }
</script>

<style>
.key {
  display: flex;
  align-items: center;
  justify-content: center;
}
.a {
  word-wrap : break-word;
}
</style>
