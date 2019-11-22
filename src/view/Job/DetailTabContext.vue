<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-card v-for="(value, key) in contextData"
            :key="key"
            class="mb-2 elevation-1">
      <v-card-title class="pb-1" v-if="value.show">
        {{ value.name }}
      </v-card-title>

      <v-card-text class="pt-0" v-if="value.show">
        <v-data-table
            :items="value.data"
            hide-default-footer
            hide-default-header>

          <template v-slot:item="{ item }">
            <tr>
              <td>
                <v-row>
                  <v-col cols="3">
                    {{ item.key }}
                  </v-col>
                  <v-col>
                    <a v-if="item.link" :href="item.link" target="_blank">{{ item.value }}</a>
                    <span v-if="!item.link">{{ item.value }}</span>
                  </v-col>
                </v-row>
              </td>
            </tr>
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
      return {}
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
            show: this.wrapper.isPushTrigger || this.wrapper.hasGitCommitInfo,
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
            key: 'Commits',
            value: this.wrapper.commitNum
          },
          {
            key: 'Last Commit ID',
            value: this.wrapper.commitId,
            link: this.wrapper.commitUrl
          },
          {
            key: 'Last Commit Message',
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
