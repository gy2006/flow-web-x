<template>
  <v-card class="full-size">
    <v-card-title>
      <v-row>
        <v-col cols="3">
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

        <v-col cols="3"></v-col>

        <!-- flow and job actions-->
        <v-col cols="6" v-if="showFlowAction">
          <v-row>
            <v-col cols="2">
              <v-btn
                  text
                  color="blue-grey"
                  class="white--text"
              >
                <v-icon class="mr-1">mdi-trending-up</v-icon>
                {{ $t('flow.statistic') }}
              </v-btn>
            </v-col>

            <v-col cols="2">
              <v-btn
                  text
                  color="blue-grey"
                  class="white--text"
              >
                <v-icon class="mr-1">mdi-settings</v-icon>
                {{ $t('flow.settings') }}
              </v-btn>
            </v-col>

            <v-col cols="2">
              <v-btn
                  text
                  color="success"
              >
                <v-icon class="mr-1">mdi-play</v-icon>
                {{ $t('job.run') }}:
              </v-btn>
              <Dialog :dialog="dialog"
                      :content="$t('job.hint.missing_agent')"
              ></Dialog>
            </v-col>

            <v-col cols="3">
              <v-combobox dense
                          outlined
                          prepend-icon="mdi-source-branch"
                          label="branch:">
              </v-combobox>
            </v-col>
          </v-row>
        </v-col>
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

        let flowName = route.params.id
        let flowItem = {text: flowName, href: '#' + route.path}

        if (route.name === 'Jobs') {
          items = [ this.baseItem, flowItem ]
        }

        if (route.name === 'Settings') {
          items = [ this.baseItem, flowItem, {text: 'settings', href: '#' + route.path} ]
        }

        if (route.name === 'Statistic') {
          items = [ this.baseItem, flowItem, {text: 'statistic', href: '#' + route.path} ]
        }

        return items
      },

      showFlowAction () {
        return this.$route.name === 'Jobs'
      }
    }
  }
</script>

<style scoped>

</style>
