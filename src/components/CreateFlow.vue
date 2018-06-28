<template>
  <div class="create-flow">
    <v-stepper>
      <v-stepper-header>
        <v-stepper-step step="1" complete editable>Select campaign settings</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" complete>Create an ad group</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Create an ad</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script>
  export default {
    name: 'CreateFlow'
  }
</script>

<style lang="scss" scoped>
  .create-flow {
    width: 100%;
    height: 100%;
  }
</style>
