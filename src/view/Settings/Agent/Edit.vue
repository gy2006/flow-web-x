<template>
  <div>
    <v-row>
      <v-col cols="8">
        <v-form ref="agentNameForm"
                lazy-validation>
          <v-text-field
              label="Name"
              :rules="nameRules"
              v-model="wrapper.name"
          ></v-text-field>
        </v-form>

        <v-form ref="agentTagForm"
                lazy-validation>
          <v-text-field
              label="Tags"
              :rules="tagRules"
              v-model="tagInput"
              append-icon="mdi-plus-box"
              @click:append="onTagAddClick"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8" class="py-0">
        <v-chip
            close
            label
            v-for="(tag, index) in tagRaw"
            v-model="tag.enabled"
            :key="tag.text"
            @input="onTagRemoveClick(index)"
        >{{ tag.text }}
        </v-chip>
      </v-col>
    </v-row>

    <v-row v-if="isEditMode">
      <v-col cols="8" class="my-3">
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row v-if="isEditMode">
      <v-col cols="8">
        <v-text-field label="Token"
                      readonly
                      v-model="wrapper.token"
        ></v-text-field>
        <v-text-field label="Host"
                      readonly
                      v-model="wrapper.host"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="2">
        <v-dialog
            v-model="dialog"
            width="500"
            v-if="isEditMode"
        >
          <template v-slot:activator="{ on }">
            <v-btn
                outlined
                color="error"
                v-on="on"
            >{{ $t('delete') }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title
                class="error--text"
                primary-title
            >Delete Agent {{ name }}?
            </v-card-title>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="dialog = false">{{ $t('cancel') }}</v-btn>
              <v-btn outlined color="error" @click="onDeleteClick">{{ $t('delete') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="1">
        <v-btn outlined color="warning" @click="onBackClick">{{ $t('back') }}</v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn color="primary" @click="onSaveClick">{{ $t('save') }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import { AgentWrapper } from '@/util/agents'
  import { agentNameRules, agentTagRules } from '@/util/rules'

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
        this.$store.dispatch(actions.agents.get, this.name).then(() => {
          this.$emit('onConfigNav', {
            navs: this.navs,
            showAddBtn: false
          })
        })
        return
      }

      this.$emit('onConfigNav', {
        navs: this.navs,
        showAddBtn: false
      })
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
