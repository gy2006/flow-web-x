<template>
  <v-card class="full-size">
    <v-card-title>
      <span class="pr-2 font-weight-bold headline">
        <v-icon>layers</v-icon>
        {{ name }}
      </span>

      <v-spacer></v-spacer>

      <v-btn color="warning" @click="onBackClick">
        <v-icon small class="mr-1">arrow_back</v-icon>
        <span>{{ $t('back') }}</span>
      </v-btn>
    </v-card-title>

    <v-card-text class="pt-0 tab-wrapper">
      <v-tabs left class="full-size">
        <v-tab href="#tab-yml">
          YML
        </v-tab>
        <v-tab href="#tab-options">
          Options
        </v-tab>

        <v-tab-item value="tab-yml">
          <settings-yml-tab></settings-yml-tab>
        </v-tab-item>
        <v-tab-item value="tab-options">
          options
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
  import SettingsYmlTab from '@/components/Flows/SettingsYMLTab'

  export default {
    name: 'FlowSettings',
    components: {
      SettingsYmlTab
    },
    computed: {
      name () {
        return this.$route.params.id
      }
    },
    methods: {
      onBackClick () {
        this.$router.push({path: `/flows/${this.name}/jobs`})
      }
    }
  }
</script>

<style lang="scss">
  .tab-wrapper {
    height: 80%;
  }

  .tab-wrapper .v-window,
  .tab-wrapper .v-window__container,
  .tab-wrapper .v-window-item {
    height: 100%;
  }
</style>
