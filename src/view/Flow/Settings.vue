<template>
  <v-card class="full-size">
    <v-card-title>
      <Nav
          :items="[name, 'settings']"
          :links="['jobs', 'settings']"
      ></Nav>
    </v-card-title>

    <v-card-text class="pt-0 tab-wrapper">
      <v-tabs left class="full-size">
        <v-tab href="#tab-yml">
          YML
        </v-tab>
        <v-tab href="#tab-options">
          Options
        </v-tab>
        <v-tab href="#tab-users">
          Members
        </v-tab>

        <v-tab-item value="tab-yml">
          <settings-yml-tab :flow="flow"></settings-yml-tab>
        </v-tab-item>
        <v-tab-item value="tab-options">
          <settings-option-tab :flow="flow"></settings-option-tab>
        </v-tab-item>
        <v-tab-item value="tab-users">
          <settings-member-tab :flow="flow"></settings-member-tab>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import Nav from '@/components/Common/Nav'
  import SettingsYmlTab from '@/view/Flow/SettingsYMLTab'
  import SettingsOptionTab from '@/view/Flow/SettingsOptionTab'
  import SettingsMemberTab from '@/view/Flow/SettingsMemberTab'

  export default {
    name: 'FlowSettings',
    components: {
      Nav,
      SettingsYmlTab,
      SettingsOptionTab,
      SettingsMemberTab
    },
    mounted () {
      this.$store.dispatch(actions.flows.select, this.name).then()
    },
    computed: {
      ...mapState({
        flow: state => state.flows.selected.obj,
      }),
      name () {
        return this.$route.params.id
      }
    },
    watch: {
      name (after) {
        this.$store.dispatch(actions.flows.select, after).then()
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
