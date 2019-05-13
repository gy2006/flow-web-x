<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid class="elevation-1 pa-2 full-height">

    <v-layout row>
      <v-flex>

      </v-flex>
    </v-layout>

    <!-- context variables -->
    <v-layout row>
      <v-flex xs12>
        <v-data-table
            :items="context"
            hide-headers
            hide-actions>

          <template v-slot:items="props">
            <td>
              {{ props.item.key }}
            </td>
            <td>
              {{ props.item.value }}
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import vars from '@/util/vars'
  import moment from 'moment'

  export default {
    name: 'JobDetailInfo',
    data () {
      return {}
    },
    props: {
      job: {
        required: true,
        type: Object
      }
    },
    computed: {
      context () {
        const context = this.job.context

        const contextAsPairList = []

        Object.keys(context).forEach(key => {
          contextAsPairList.push({key: key, value: context[key]})
        })

        return contextAsPairList
      },

      buildNumber () {
        return this.job.buildNumber
      },

      branch () {
        return this.job.context[vars.git.branch]
      },

      commitId () {
        return this.job.context[vars.git.commit.id]
      },

      commitMsg () {
        return this.job.context[vars.git.commit.message]
      },

      fromNow() {
        return moment(this.job.createdAt).fromNow()
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
