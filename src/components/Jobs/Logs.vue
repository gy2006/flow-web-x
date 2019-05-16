<template>
  <v-stepper non-linear>
    <v-stepper-header>

      <!-- for default step, otherwise v-stepper will be occur an error -->
      <v-stepper-step
          v-if="items.length === 0"
          step="loading"
          complete
          complete-icon="flow-icon-running rotate grey--text"
          color=""
      >
        Loading..
      </v-stepper-step>

      <!-- for job steps -->
      <template v-for="n in items">
        <v-stepper-step
            complete
            editable
            :edit-icon="n.status.icon"
            :key="`${n.id}-step`"
            :step="n.index"
            color=""
        >
          {{ n.name }}
        </v-stepper-step>

        <v-divider
            v-if="n !== items"
            :key="n.id"
        ></v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <template v-for="n in items">
        <v-stepper-content
            :key="`${n.id}-content`"
            :step="n.index"
        >
          Step {{ n.name }}
        </v-stepper-content>
      </template>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import { StepWrapper } from '@/util/steps'

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
    },
    computed: {
      items () {
        const wrapperList = []

        this.steps.forEach((s, index) => {
          wrapperList.push(new StepWrapper(s, index))
        })

        return wrapperList
      }
    }
  }
</script>

<style lang="scss">
  .v-stepper__step__step {
    .v-icon {
      color: inherit;
    }
  }
</style>
