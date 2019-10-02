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
              <v-layout row>
                <v-flex xs3>
                  {{ props.item.key }}
                </v-flex>
                <v-flex>
                  <a v-if="props.item.link" :href="props.item.link" target="_blank">{{ props.item.value }}</a>
                  <span v-if="!props.item.link">{{ props.item.value }}</span>
                </v-flex>
              </v-layout>
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
          push: {
            name: 'Git Push Info',
              show: this.wrapper.isPushTrigger,
              data: this.getPushData()
          },

          tag: {
            name: 'Git Tag Info',
            show: this.wrapper.isTagTrigger,
            data: this.getTagData()
          },

          pr: {
            name: 'Git Pull Request Info',
              show: this.wrapper.isPrOpenedTrigger || this.wrapper.isPrClosedTrigger,
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
      getPushData () {
        return [
          {
            key: 'Branch',
            value: this.wrapper.branch
          },
          {
            key: 'Commit ID',
            value: this.wrapper.commitId,
            link: this.wrapper.commitUrl
          },
          {
            key: 'Commit Message',
            value: this.wrapper.commitMsg
          }
        ]
      },

      getTagData () {
        return [
          {
            key: 'Tag',
            value: this.wrapper.branch
          },
          {
            key: 'Commit ID',
            value: this.wrapper.commitId,
            link: this.wrapper.commitUrl
          },
          {
            key: 'Commit Message',
            value: this.wrapper.commitMsg
          }
        ]
      },

      getPrData () {
        return [
          {
            key: 'Title',
            value: this.wrapper.prTitle
          },
          {
            key: 'Status',
            value: this.wrapper.isPrOpenedTrigger ? 'Opened' : (this.wrapper.isPrMergedTrigger ? 'Merged' : '-')
          },
          {
            key: 'Message',
            value: this.wrapper.prMessage
          },
          {
            key: 'PR Number',
            value: this.wrapper.prNumber,
            link: this.wrapper.prUrl
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
