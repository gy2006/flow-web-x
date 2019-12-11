<template>
  <v-data-table :items="artifacts"
                :loading="loading"
                :headers="headers"
                hide-default-footer>
    <template v-slot:item="{item}">
      <tr>
        <td class="name-col">
          <v-icon>
            {{ files[item.file] || 'mdi-application' }}
          </v-icon>
          <span class="ml-1">{{ item.fileName }}</span>
        </td>
        <td class="size-col">
          {{ item.contentSize }} bytes
        </td>
        <td class="date-col">
          {{ moment(item.createdAt).format('YYYY/MM/DD hh:mm A') }}
        </td>
        <td>
          <v-btn icon
                 @click="onDownloadClick(item)">
            <v-icon small>mdi-download</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
  import moment from 'moment'
  import actions from '@/store/actions'
  import {mapState} from 'vuex'

  export default {
    name: 'DetailTabArtifact',
    props: {
      flow: {
        type: String,
        required: true
      },
      buildNumber: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        moment,
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'Name',
          },
          {
            text: 'Size',
            align: 'left',
            sortable: true,
            value: 'Size',
          },
          {
            text: 'Uploaded at',
            align: 'left',
            sortable: false,
            value: 'date',
          },
          {

          }
        ],
        files: {
          html: 'mdi-language-html5',
          js: 'mdi-nodejs',
          json: 'mdi-json',
          md: 'mdi-markdown',
          pdf: 'mdi-file-pdf',
          png: 'mdi-file-image',
          txt: 'mdi-file-document-outline',
          xls: 'mdi-file-excel',
          zip: 'mdi-zip-box',
          jar: 'mdi-zip-box',
          java: 'mdi-language-java'
        },
        loading: false
      }
    },
    computed: {
      ...mapState({
        artifacts: state => state.jobs.artifacts
      }),

      items() {
        let list = []
        for (let artifact of this.artifacts) {
          let file = artifact.fileName
          list.push({
            name: artifact.fileName,
            file: file.split('.').pop()
          })
        }
        return list
      }
    },
    mounted() {
      this.loading = true
      let payload = {flow: this.flow, buildNumber: this.buildNumber}
      this.$store.dispatch(actions.jobs.artifacts.list, payload)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    methods: {
      onDownloadClick (artifact) {
        let payload = {flow: this.flow, buildNumber: this.buildNumber, artifactId: artifact.id}
        this.$store.dispatch(actions.jobs.artifacts.download, payload).then()
      }
    }
  }
</script>

<style scoped>
  .name-col {
    width: 60%;
  }

  .size-col {
   width: 15%;
  }

  .date-col {
    width: 15%;
  }
</style>