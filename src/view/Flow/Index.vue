<template>
  <v-card class="full-size">
    <v-card-title class="py-0">
      <v-row>
        <v-col cols="4">
          <v-breadcrumbs :items="navItems">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>

            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                  :href="item.href"
                  class="headline font-weight-bold"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-col>

        <v-col cols="2"></v-col>

        <!-- flow and job actions-->
        <v-col cols="6" v-if="showFlowAction">
          <v-toolbar elevation="0" bottom>
            <v-toolbar-items class="align-baseline">
              <v-btn
                  text
                  color="blue-grey"
                  class="white--text"
                  @click="onStatisticClick"
              >
                <v-icon class="mr-1">mdi-trending-up</v-icon>
                {{ $t('flow.statistic') }}
              </v-btn>

              <v-btn
                  text
                  color="blue-grey"
                  class="white--text"
                  @click="onSettingsClick"
              >
                <v-icon class="mr-1">mdi-settings</v-icon>
                {{ $t('flow.settings') }}
              </v-btn>

              <v-btn
                  text
                  color="success"
              >
                <v-icon class="mr-1">mdi-play</v-icon>
                {{ $t('job.run') }}:
              </v-btn>

              <v-combobox dense
                          outlined
                          prepend-icon="mdi-source-branch"
                          label="branch:">
              </v-combobox>
            </v-toolbar-items>
          </v-toolbar>
        </v-col>

        <Dialog :dialog="dialog"
                :content="$t('job.hint.missing_agent')"
        ></Dialog>
      </v-row>
    </v-card-title>
    <v-card-text class="fill-height">
      <router-view></router-view>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'FlowHome',
    data () {
      return {
        dialog: false,
        baseItem: {text: 'flows', href: '#/flows'}
      }
    },
    computed: {
      navItems () {
        let route = this.$route
        let items = []

        if (route.name === 'Overview') {
          items = [ this.baseItem ]
        }

        let href = '#' + route.path
        let flowItem = {text: this.flowName, href}

        if (route.name === 'Jobs') {
          items = [ this.baseItem, flowItem ]
        }

        if (route.name === 'Settings') {
          flowItem.href = `#/flows/${this.flowName}/jobs`
          items = [ this.baseItem, flowItem, {text: 'settings', href} ]
        }

        if (route.name === 'Statistic') {
          flowItem.href = `#/flows/${this.flowName}/jobs`
          items = [ this.baseItem, flowItem, {text: 'statistic', href} ]
        }

        if (route.name === 'JobDetail') {
          let number = route.params.num
          flowItem.href = `#/flows/${this.flowName}/jobs`
          items = [ this.baseItem, flowItem, {text: '#' + number, href} ]
        }

        return items
      },

      showFlowAction () {
        return this.$route.name === 'Jobs'
      },

      flowName () {
        return this.$route.params.id
      }
    },
    methods: {
      onSettingsClick () {
        this.$router.push(`/flows/${this.flowName}/settings`)
      },

      onStatisticClick () {
        this.$router.push(`/flows/${this.flowName}/statistic`)
      },
    }
  }
</script>

<style scoped>

</style>
