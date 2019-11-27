<template>
  <v-card
      raised
      class="mx-auto"
  >
    <div :class="['title', wrapper.latestJob.status.bg]">
      <v-card-title>
        {{ wrapper.name }}
      </v-card-title>
    </div>

    <v-card-text class="text--secondary">
      <v-row>
        <v-col cols="6" class="pa-0 pl-2 pt-2">
          <div>{{ wrapper.latestJob.status.text }}</div>
          <div>{{ wrapper.latestJob.branch }}</div>
          <div>{{ wrapper.latestJob.triggerBy }}</div>
          <div>{{ wrapper.successRate }}</div>
        </v-col>

        <v-col cols="6" class="pa-0 pl-2">
          <div class="ElementSuccess">
            <div class="InsideCircle">
              <div class="Percent" data-autofield="{SuccessPercent100}%">82%</div>
              <div class="Label" data-l="Success">Success</div>
            </div>
            <svg class="Circle" width="100" height="100" viewBox="0 0 32 32">
              <circle r="15.915" cx="16" cy="16"
                      data-autoattribute-stroke-dasharray="{SuccessPercent100}, 100"
                      stroke-dasharray="82, 100"/>
            </svg>
          </div>
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

<style lang="scss" scoped>
  .title {
    background-color: #0E9A00;
    min-height: 100px;
    color: #ffffff;
  }

  .title div {
    opacity: 1 !important;
    font-weight: bold;
  }

  .ElementSuccess {
    stroke: #48da7f;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    height: 100px;
    width: 100px;
    padding: 0;
    margin: 0 2rem;
    border: none;
  }

  .InsideCircle {
    position: absolute;
    display: block;
    margin: 5px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    overflow: hidden;
  }

  .Circle {
    fill: transparent;
    stroke-width: 3px;
    transform: rotate(-90deg);
  }

  .Percent {
    margin-top: 24px;
    right: 0;
    left: 0;
    text-align: center;
    font-size: 20px;
  }

  .Label {
    text-align: center;
    font-size: 14px;
    color: #707479;
    margin-left: -5px;
  }
</style>
