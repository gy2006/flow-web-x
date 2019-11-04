<template>
  <div class="full-size">
    <v-row>
      <v-col>
        Plugins
      </v-col>
    </v-row>

    <v-row class="full-height">
      <v-col cols="2">
        List
      </v-col>

      <v-col>
        Content
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'Plugins',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
  }
</script>

<style scoped>

</style>