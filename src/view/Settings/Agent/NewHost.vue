<template>
  <div>
    <v-row>
      <v-col>
        <div>New Agent Host</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-text-field
            dense
            label="Name"
            v-model="wrapper.name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <tag-editor :tags="wrapper.tags"></tag-editor>
      </v-col>
    </v-row>

    <v-row>
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="1">
          <v-btn outlined color="warning" @click="onBackClick">{{ $t('back') }}</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="primary" @click="onSaveClick">{{ $t('save') }}</v-btn>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
  import { HostWrapper } from '@/util/hosts'
  import TagEditor from '@/components/Common/TagEditor'

  export default {
    name: 'SettingsAgentNew',
    components: {
      TagEditor
    },
    data () {
      return {
        wrapper: new HostWrapper(),
        tagInput: []
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
    },
    computed: {

    },
    methods: {
      onBackClick () {
        this.$router.push('/settings/agents')
      },

      onSaveClick () {
        console.log(this.wrapper)
      }
    }
  }
</script>

<style scoped>

</style>