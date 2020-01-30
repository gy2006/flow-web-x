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
  </div>
</template>

<script>
  import { HostWrapper } from '@/util/hosts'
  export default {
    name: 'SettingsAgentNew',
    data () {
      return {
        wrapper: new HostWrapper()
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
  }
</script>

<style scoped>

</style>