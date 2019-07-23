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
                v-model="nameInput"
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

        <v-flex xs2 offset-xs5 d-flex>
          <v-btn color="warning" @click="onBackClick">{{ $t('back') }}</v-btn>
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
      }
    },
    computed: {
      ...mapState({
        selected: state => state.agents.selected
      }),

      navs () {
        return [
          {
            text: 'Agents',
            href: '#/settings/agents'
          },
          {
            text: this.category.charAt(0).toUpperCase() + this.category.slice(1)
          }
        ]
      },

      wrapper () {
        return new AgentWrapper(this.selected)
      },

      nameInput () {
        return this.isNewMode ? '' : this.wrapper.name
      },

      tagRaw () {
        if (this.isNewMode) {
          return []
        }

        const raw = []
        for (let tag of this.wrapper.tags) {
          raw.push({text: tag, enabled: true})
        }

        return raw
      },

      /**
       * new | edit
       */
      category () {
        return this.$route.params.category
      },

      isNewMode () {
        return this.category === 'new'
      },

      isEditMode () {
        return this.category === 'edit'
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

        if (this.isNewMode) {
          this.$store.dispatch(actions.agents.create, {name: this.nameInput, tags: tags}).then(() => {
            this.$router.push('/settings/agents')
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
