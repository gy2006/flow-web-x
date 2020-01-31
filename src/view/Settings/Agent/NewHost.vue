<template>
  <div>
    <v-row>
      <v-col>
        <div>New Agent Host</div>
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

    <v-row>
      <v-col cols="8">
        <v-select
            :items="[HOST_TYPE_SSH]"
            label="Host Types"
            v-model="type"
            dense
        ></v-select>
      </v-col>
    </v-row>

    <v-form ref="sshSettingsForm" lazy-validation>
      <v-row v-if="type === HOST_TYPE_SSH">
        <v-col cols="8">
          <div>SSH Host Settings</div>
        </v-col>
        <v-col cols="8">
          <v-select dense
                    v-model="wrapper.credential"
                    :items="names"
                    :rules="rules.required"
                    label="Select Credential"
          ></v-select>
        </v-col>
        <v-col cols="8">
          <v-text-field dense
                        v-model="wrapper.user"
                        :rules="rules.required"
                        label="Host User"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-text-field dense
                        v-model="wrapper.ip"
                        :rules="rules.required"
                        label="Host IP"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-text-field dense
                        max="50"
                        min="1"
                        step="1"
                        type="number"
                        label="Max Pool Size"
                        v-model="wrapper.maxSize"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-text-field dense
                        max="120"
                        min="5"
                        step="5"
                        type="number"
                        label="Stop agent if it has idle after minutes"
                        v-model="wrapper.maxIdle"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-text-field dense
                        max="120"
                        min="5"
                        step="5"
                        type="number"
                        label="Remove agent if it has been offline after xx minutes"
                        v-model="wrapper.maxOffline"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col>
        <v-btn class="mx-1" outlined @click="onTestClick">{{ $t('test') }}</v-btn>
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
  import actions from '@/store/actions'
  import { mapState } from 'vuex'
  import { CATEGORY_SSH_RSA } from '@/util/credentials'

  export default {
    name: 'SettingsAgentNew',
    components: {
      TagEditor
    },
    data () {
      return {
        HOST_TYPE_SSH,
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
            text: 'New Agent Host',
            href: ''
          }
        ],
        showAddBtn: false
      })

      this.$store.dispatch(actions.credentials.listNameOnly, CATEGORY_SSH_RSA).then()
    },
    computed: {
      ...mapState({
        credentials: state => state.credentials.items
      }),

      names () {
        const nameList = []
        for (let c of this.credentials) {
          nameList.push(c.name)
        }
        return nameList
      },
    },
    methods: {
      onTestClick () {

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