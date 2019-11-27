<template>
  <v-card
      raised
      class="mx-auto flow-summary"
  >
    <div :class="['title', wrapper.latestJob.status.bg]">
      <v-card-title>
        {{ wrapper.name }}
      </v-card-title>
    </div>

    <v-card-text class="text--secondary">
      <v-row>
        <v-col cols="6" class="text-left pl-3">
          <div>{{ wrapper.latestJob.status.text }}</div>
          <div>{{ wrapper.latestJob.branch }}</div>
          <div>{{ wrapper.latestJob.triggerBy }}</div>
        </v-col>

        <v-col cols="6" class="text-center">
          <v-progress-circular
              rotate="90"
              size="100"
              width="6"
              :value="wrapper.successRate"
              color="#48da7f"
          >
            <div class="rate">{{ wrapper.successRate }} %</div>
            <div class="rate-desc">Success Rate</div>
          </v-progress-circular>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'FlowSummaryCard',
    props: {
      wrapper: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .flow-summary {
    .title {
      background-color: #0E9A00;
      min-height: 100px;
      color: #ffffff;
    }

    .title div {
      opacity: 1 !important;
      font-weight: bold;
    }

    .rate {
      font-size: large;
      color: #707479;
    }

    .rate-desc {
      font-size: x-small;
      color: #707479;
    }

    .v-progress-circular__info {
      display: block;
    }
  }
</style>
