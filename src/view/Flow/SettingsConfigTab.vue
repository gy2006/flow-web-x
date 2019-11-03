<template>
  <v-tabs vertical class="flow-yml-settings full-size">
    <v-tab>
      <v-icon left>mdi-account</v-icon>
      YAML
    </v-tab>
    <v-tab-item>
      <edit-yaml :flow="flow" class="mt-2"></edit-yaml>
    </v-tab-item>
  </v-tabs>
</template>

<script>
  import EditYaml from '@/components/Flow/EditYaml'

  export default {
    name: 'SettingsConfigTab',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    components: {
      EditYaml
    },
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
