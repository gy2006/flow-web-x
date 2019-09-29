<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-card v-for="(value, key) in contextData"
            :key="key"
            class="mb-2">
      <v-card-title class="pb-1" v-if="value.show">
        {{ value.name }}
      </v-card-title>

      <v-card-text class="pt-0" v-if="value.show">
        <v-data-table
            :items="value.data"
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
      </v-card-text>
    </v-card>
  </div>

</template>

<script>
  export default {
    name: 'JobDetailInfo',
    data () {
      return {
      }
    },
    props: {
      wrapper: {
        required: true,
        type: Object
      }
    },
    computed: {
      contextData () {
        return {
          commit: {
            name: 'Git Commit Info',
              show: this.isPushOrTag,
              data: this.getCommitData()
          },

          pr: {
            name: 'Git Pull Request Info',
              show: this.isPr,
              data: this.getPrData()
          },

          variables: {
            name: 'Variables',
              show: true,
              data: this.wrapper.customVarList
          }
        }
      }
    },
    methods: {
      getCommitData () {
        return [
          {
            key: 'Branch',
            value: this.wrapper.branch
          },
          {
            key: 'Commit ID',
            value: this.wrapper.commitId
          },
          {
            key: 'Commit Message',
            value: this.wrapper.commitMsg
          },
          {
            key: 'Commit URL',
            value: this.wrapper.commitUrl
          },
        ]
      },

      getPrData () {
        return [
          {
            key: 'Title',
            value: this.wrapper.prTitle
          },
          {
            key: 'Message',
            value: this.wrapper.prMessage
          },
          {
            key: 'PR URL',
            value: this.wrapper.prUrl
          },
          {
            key: 'PR Number',
            value: this.wrapper.prNumber
          },
          {
            key: 'PR Head Repo/Branch',
            value: this.wrapper.prHeadRepo + ' / ' + this.wrapper.prHeadBranch
          },
          {
            key: 'PR Base Repo/Branch',
            value: this.wrapper.prBaseRepo + ' / ' + this.wrapper.prBaseBranch
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text-center {
    text-align: center
  }
</style>
