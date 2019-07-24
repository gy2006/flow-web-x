<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-layout row wrap>
        <v-flex xs8>
          <v-form ref="agentNameForm"
                  lazy-validation>
            <v-text-field
                label="Name"
                :rules="nameRules"
                v-model="this.wrapper.name"
            ></v-text-field>
          </v-form>

          <v-form ref="agentTagForm"
                  lazy-validation>
            <v-text-field
                label="Tags"
                :rules="tagRules"
                v-model="tagInput"
                append-icon="add_box"
                @click:append="onTagAddClick"
            ></v-text-field>
          </v-form>
        </v-flex>

        <v-flex xs8>
          <v-chip
              close
              label
              v-for="(tag, index) in tagRaw"
              v-model="tag.enabled"
              :key="tag.text"
              @input="onTagRemoveClick(index)"
          >{{ tag.text }}
          </v-chip>
        </v-flex>

        <v-flex xs8 class="my-3" v-if="isEditMode">
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs8 v-if="isEditMode">
          <v-text-field label="Token"
                        readonly
                        v-model="wrapper.token"
          ></v-text-field>
          <v-text-field label="Host"
                        readonly
                        v-model="wrapper.host"
          ></v-text-field>
        </v-flex>

        <v-flex xs8 d-flex>
          <v-dialog
              v-model="dialog"
              width="500"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                  outline
                  color="error"
                  v-on="on"
              >{{ $t('delete') }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title
                  class="error--text"
                  primary-title
              >Delete Agent ?
              </v-card-title>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialog = false">{{ $t('cancel') }}</v-btn>
                <v-btn outline color="error" @click="onDeleteClick">{{ $t('delete') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn outline color="warning" @click="onBackClick">{{ $t('back') }}</v-btn>
          <v-btn color="primary" @click="onSaveClick">{{ $t('save') }}</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapState} from 'vuex'
  import actions from '@/store/actions'
  import {AgentWrapper} from '@/util/agents'
  import {agentNameRules, agentTagRules} from '@/util/rules'

  export default {
    name: 'SettingsAgentEdit',
    data () {
      return {
        nameRules: agentNameRules(this),
        tagInput: '',
        tagRules: agentTagRules(this),
        dialog: false
      }
    },
    computed: {
      ...mapState({
        loaded: state => state.agents.loaded
      }),

      navs () {
        let items = [
          {
            text: 'Agents',
            href: '#/settings/agents'
          }
        ]

        if (this.isEditMode) {
          items.push({text: this.wrapper.name, href: ''})
        } else if (this.isNewMode) {
          items.push({text: 'New', href: ''})
        }

        return items
      },

      wrapper () {
        if (this.isNewMode) {
          return new AgentWrapper()
        }

        return new AgentWrapper(this.loaded)
      },

      tagRaw: {
        get () {
          const raw = []
          for (let tag of this.wrapper.tags) {
            raw.push({text: tag, enabled: true})
          }

          return raw
        }
      },

      /**
       * new | edit
       */
      category () {
        return this.$route.params.category
      },

      name () {
        return this.$route.params.name
      },

      isNewMode () {
        return this.category === 'new'
      },

      isEditMode () {
        return this.category === 'edit'
      }
    },
    mounted () {
      if (this.isEditMode) {
        this.$store.dispatch(actions.agents.get, this.name)
      }
    },
    watch: {
      name (newValue) {
        if (this.isEditMode) {
          this.$store.dispatch(actions.agents.get, newValue)
        }
      }
    },
    methods: {
      onTagAddClick () {
        if (!this.$refs.agentTagForm.validate()) {
          return
        }

        for (let tag of this.tagRaw) {
          if (tag.text === this.tagInput) {
            this.$refs.agentTagForm.reset()
            this.tagInput = ''
            return
          }
        }

        this.tagRaw.push({text: this.tagInput, enabled: true})
        this.$refs.agentTagForm.reset()
        this.tagInput = ''
      },

      onTagRemoveClick (tagIndex) {
        this.tagRaw.splice(tagIndex, 1)
      },

      onDeleteClick () {
        this.$store.dispatch(actions.agents.delete, this.wrapper.rawInstance).then(() => {
          this.$store.dispatch(actions.agents.select, {})
          this.dialog = false
          this.onBackClick()
        })
      },

      onBackClick () {
        this.$router.push('/settings/agents')
      },

      onSaveClick () {
        if (!this.$refs.agentNameForm.validate()) {
          return
        }

        const tags = []
        for (let tag of this.tagRaw) {
          tags.push(tag.text)
        }

        this.wrapper.tags = tags

        this.$store.dispatch(actions.agents.createOrUpdate, this.wrapper.rawInstance).then(() => {
          this.$router.push('/settings/agents')
        })
      }
    }
  }
</script>

<style scoped>

</style>
