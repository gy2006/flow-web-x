<template>
  <div>
    <v-row>
      <v-col cols="8">
        <v-form ref="agentNameForm"
                lazy-validation>
          <v-text-field
              dense
              label="Name"
              :rules="nameRules"
              v-model="wrapper.name"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-form ref="agentTagForm"
                lazy-validation>
          <v-text-field
              dense
              label="Tags"
              :rules="tagRules"
              v-model="tagInput"
              append-icon="mdi-plus-box"
              @click:append="onTagAddClick"
          ></v-text-field>
        </v-form>
      </v-col>

      <v-col cols="8" class="py-0">
        <v-chip
            close
            label
            class="mr-1"
            v-for="(tag, index) in tagRaw"
            v-model="tag.enabled"
            :key="tag.text"
            @input="onTagRemoveClick(index)"
        >{{ tag.text }}
        </v-chip>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6"></v-col>
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
  import actions from '@/store/actions'
  import { AgentWrapper } from '@/util/agents'
  import { agentNameRules, agentTagRules } from '@/util/rules'

  export default {
    name: 'SettingsAgentNew',
    data () {
      return {
        nameRules: agentNameRules(this),
        tagInput: '',
        tagRules: agentTagRules(this),
        dialog: false
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
            text: 'New',
            href: ''
          }
        ],
        showAddBtn: false
      })
    },
    computed: {
      wrapper () {
        return new AgentWrapper()
      },

      tagRaw: {
        get () {
          const raw = []
          for (let tag of this.wrapper.tags) {
            raw.push({text: tag, enabled: true})
          }

          return raw
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