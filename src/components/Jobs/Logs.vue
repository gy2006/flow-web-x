<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-timeline
      align-top
      dense>

    <!-- start status -->
    <v-timeline-item small color="grey" fill-dot>
      <v-layout pt-1>
        <v-flex xs10>
          <!-- empty expansion panel as placeholder -->
          <v-expansion-panel class="elevation-0" disabled>
            <v-expansion-panel-content hide-actions>
              <template v-slot:header>
                <div></div>
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-timeline-item>

    <v-timeline-item
        color=""
        small
        v-for="n in items"
        :key="n.id"
        :icon="n.status.icon"
    >

      <v-layout pt-1>
        <v-flex xs10>
          <v-expansion-panel class="elevation-0">
            <v-expansion-panel-content>
              <template v-slot:header>
                <strong>{{ n.name }}</strong>
              </template>
              <v-card>
                <v-card-text>
                  placeholder
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>

    </v-timeline-item>

    <!-- end status -->
    <v-timeline-item small color="grey"></v-timeline-item>
  </v-timeline>
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
