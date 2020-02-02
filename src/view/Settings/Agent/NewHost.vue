<template>
  <div>
    <v-row>
      <v-col>
        <div v-if="isEditMode">Edit Agent Host</div>
        <div v-else>New Agent Host</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-form ref="hostNameForm"
                lazy-validation>
          <v-text-field
              dense
              label="Name"
              :rules="rules.required"
              v-model="wrapper.name"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <tag-editor :tags="wrapper.tags"></tag-editor>
      </v-col>
    </v-row>

    <v-row v-if="!isEditMode">
      <v-col cols="8">
        <v-select
            :items="[HOST_TYPE_SSH]"
            label="Host Types"
            v-model="type"
            dense
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-form ref="sshSettingsForm" lazy-validation v-if="type === HOST_TYPE_SSH">
          <ssh-host-editor :wrapper="wrapper" :credentials="credentialNameList"></ssh-host-editor>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <host-test-btn :wrapper="wrapper" v-if="isEditMode"></host-test-btn>

        <v-btn class="mx-1"
               outlined
               color="error"
               @click="deleteDialog = true"
               v-if="isEditMode"
        >{{ $t('delete') }}</v-btn>

        <v-dialog
            v-model="deleteDialog"
            width="500"
            v-if="isEditMode">
          <v-card>
            <v-card-title
                class="error--text"
                primary-title
            >Delete agent host '{{ wrapper.name }}'?
            </v-card-title>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="deleteDialog = false">{{ $t('cancel') }}</v-btn>
              <v-btn outlined color="error" @click="onDeleteClick">{{ $t('delete') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn class="mx-1" outlined color="warning" @click="onBackClick">{{ $t('back') }}</v-btn>
        <v-btn class="mx-1" color="primary" @click="onSaveClick">{{ $t('save') }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { HostWrapper, HOST_TYPE_SSH } from '@/util/hosts'
  import { required } from '@/util/rules'
  import TagEditor from '@/components/Common/TagEditor'
  import SshHostEditor from '@/components/Settings/SshHostEditor'
  import HostTestBtn from '@/components/Settings/HostTestBtn'
  import actions from '@/store/actions'
  import { mapState } from 'vuex'
  import { CATEGORY_SSH_RSA } from '@/util/credentials'

  export default {
    name: 'SettingsAgentNew',
    components: {
      TagEditor,
      SshHostEditor,
      HostTestBtn
    },
    data () {
      return {
        HOST_TYPE_SSH,
        deleteDialog: false,
        wrapper: new HostWrapper(),
        type: 'SSH',
        tagInput: [],
        rules: {
          required: required('Required')
        }
      }
    },
    mounted () {
      this.$emit('onConfigNav', {
        navs: [
          {
            text: 'Agents',
            href: '#/settings/agents'
          },
          {
            text: this.isEditMode ? 'Edit Agent Host' : 'New Agent Host',
            href: ''
          }
        ],
        showAddBtn: false
      })

      this.$store.dispatch(actions.credentials.listNameOnly, CATEGORY_SSH_RSA).then()

      if (this.isEditMode) {
        this.$store.dispatch(actions.hosts.get, this.hostName).then(() => {
          this.wrapper = new HostWrapper(this.host)
        })
      }
    },
    computed: {
      ...mapState({
        host: state => state.hosts.loaded,
        credentials: state => state.credentials.items
      }),

      credentialNameList () {
        const nameList = []
        for (let c of this.credentials) {
          nameList.push(c.name)
        }
        return nameList
      },

      hostName () {
        return this.$route.params.name
      },

      isEditMode () {
        return this.hostName !== undefined
      }
    },
    methods: {
      onDeleteClick () {
        this.$store.dispatch(actions.hosts.delete, this.wrapper.name).then(() => {
          this.$router.push('/settings/agents')
        })
      },

      onBackClick () {
        this.$router.push('/settings/agents')
      },

      onSaveClick () {
        if (!this.$refs.hostNameForm.validate()) {
          return
        }

        if (!this.$refs.sshSettingsForm.validate()) {
          return
        }

        this.$store.dispatch(actions.hosts.createOrUpdate, this.wrapper.rawInstance).then(() => {
          this.$router.push('/settings/agents')
        })
      }
    }
  }
</script>

<style scoped>

</style>