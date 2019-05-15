<template>
  <v-stepper non-linear alt-labels>
    <v-stepper-header>

      <!-- for default step, otherwise v-stepper will be occur an error -->
      <v-stepper-step
          v-if="steps.length === 0"
          step="loading"
      >
        Loading..
      </v-stepper-step>

      <!-- for job steps -->
      <template v-for="n in steps">
        <v-stepper-step
            editable
            :key="`${n.id}-step`"
            :step="n.id"
        >
          {{ n.id }}
        </v-stepper-step>

        <v-divider
            v-if="n !== steps"
            :key="n.id"
        ></v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <template v-for="n in steps">
        <v-stepper-content
            :key="`${n.id}-content`"
            :step="n.id"
        >
          Step {{ n.id }}
        </v-stepper-content>
      </template>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    name: 'JobDetailLogs',
    data () {
      return {
      }
    },
    props: {
      steps: {
        required: true,
        type: Array
      }
    }
  }
</script>

<style scoped>

</style>
