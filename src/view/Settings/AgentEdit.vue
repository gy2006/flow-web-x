<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-breadcrumbs :items="navs" divider=">"></v-breadcrumbs>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-layout row wrap>
        <v-flex xs8>
          <v-text-field
              label="Name"
              v-model="wrapper.name"
          ></v-text-field>
          <v-combobox multiple
                      label="Tags"
                      hide-selected
                      small-chips
                      persistent-hint
                      v-model="wrapper.tags"
          ></v-combobox>
        </v-flex>

        <v-flex xs8 class="my-3" v-if="isEditMode">
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs8 v-if="isEditMode">
          <v-text-field label="Token"
                        readonly
                        value="xxx-xx-xxx-xxx"
          ></v-text-field>
          <v-text-field label="Host"
                        readonly
                        value="172.16.3.1"
                        append-icon="flow-icon-appleinc"
          ></v-text-field>
        </v-flex>

        <v-flex xs2 offset-xs5 d-flex>
          <v-btn color="warning" @click="onBackClick">Back</v-btn>
          <v-btn color="primary" @click="onSaveClick">Save</v-btn>
        </v-flex>
      </v-layout>

    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  import { AgentWrapper } from '@/util/agents'

  export default {
    name: 'SettingsAgentEdit',
    data () {
      return {
        wrapper: new AgentWrapper( {
          name: '',
          tags: []
        })
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

    watch: {
      selected (after) {
        this.wrapper = new AgentWrapper(after)
      }
    },

    methods: {
      onBackClick () {
        this.$router.push('/settings/agents')
      },

      onSaveClick () {

      }
    }
  }
</script>

<style scoped>

</style>
