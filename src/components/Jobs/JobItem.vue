<template>
  <div>
    <v-data-table
        :items="jobs"
        class="elevation-1"
        hide-actions
        hide-headers>
      <template slot="items" slot-scope="props">
        <td @click="jobdetail(props.item)">
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title v-text="props.item.status"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-content class="branch">
                <v-list-tile-title>
                  <h4>#{{ props.item.buildNumber }} {{ props.item.context.FLOWCI_GIT_BRANCH }}</h4>
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-content>
                <v-list-tile-sub-title>提交 ID -</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content>
                <v-list-tile-sub-title inset>变更对比 -</v-list-tile-sub-title>
                <v-list-tile-sub-title inset>构建于 -</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1
      }
    },
    props: {
      jobs: {
        type: Array,
        default: null
      },
      pages: {
        type: Number,
        default: 0
      }
    },
    methods: {
      jobdetail (val) {
        this.$router.push({path: `/flows/${this.$route.params.id}/jobs/${val.buildNumber}`})
      }
    },
    watch: {
      page (val) {
        this.$emit('pageChange', val)
      }
    }
  }
</script>

<style scoped>
  .v-list {
    cursor: pointer;
    background: transparent;
  }

  .v-list__tile__sub-title {
    font-size: 12px;
  }

  .branch {
    border-right: 1px solid rgb(212, 220, 227);
    margin-right: 20px;
    width: 60%;
    box-sizing: border-box;
  }
</style>
