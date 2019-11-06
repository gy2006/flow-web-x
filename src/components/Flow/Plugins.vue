<template>
  <div class="full-size">
    <v-row>
      <v-col class="py-1">
        Plugins
      </v-col>
    </v-row>

    <v-row class="full-height">
      <v-col cols="2" class="py-1">
        <v-list dense>
          <v-list-item-group v-model="selected" color="primary">
            <v-list-item v-for="plugin in plugins"
                         :key="plugin.id"
                         @click="getReadMe(plugin)"
            >
              <v-list-item-icon>
                <v-icon v-if="isDefaultIcon(plugin)" small>mdi-view-grid-plus-outline</v-icon>
                <v-img v-if="isHttpLinkIcon(plugin)"
                       :src="plugin.icon"
                       max-height="24"
                       max-width="16"
                ></v-img>
                <img v-if="isRepoSrcIcon(plugin)"
                     class="plugin-icon"
                     :id="plugin.id"
                     alt=""
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ plugin.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col class="pa-0">
        <iframe id="markdown" class="markdown"></iframe>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import actions from '@/store/actions'
  import http from '@/store/http'
  import marked from 'marked'

  export default {
    name: 'Plugins',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    data() {
      return {
        selected: 0,
      }
    },
    mounted() {
      this.$store.dispatch(actions.plugins.list).then(() => {
        let plugin = this.plugins[this.selected]
        if (plugin) {
          this.getReadMe(plugin.name)
        }

        for (let p of this.plugins) {
          this.setSrcIcon(p)
        }
      })
    },
    computed: {
      ...mapState({
        plugins: state => state.plugins.items,
        readmeCache: state => state.plugins.readme,
        iconCache: state => state.plugins.icon
      }),
    },
    methods: {
      getReadMe(plugin) {
        let name = plugin.name
        let loaded = this.readmeCache[name]

        if (loaded) {
          this.setMarkdown(loaded)
          return
        }

        this.$store.dispatch(actions.plugins.readme, name)
          .then(() => {
            this.setMarkdown(this.readmeCache[name])
          })
          .catch(() => {
          })
      },

      isDefaultIcon(plugin) {
        return !plugin.icon
      },

      isHttpLinkIcon(plugin) {
        const pathOrLink = plugin.icon
        if (!pathOrLink) {
          return false
        }

        return pathOrLink.startsWith('http') || pathOrLink.startsWith('https')
      },

      isRepoSrcIcon(plugin) {
        const pathOrLink = plugin.icon
        if (!pathOrLink) {
          return false
        }

        return !this.isHttpLinkIcon(plugin)
      },

      setMarkdown(raw) {
        let element = document.getElementById('markdown')
        let doc = element.contentWindow.document
        const css =
          `<style type="text/css">
            body {
              margin: 0;
              padding: 0px;
              font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
              height: 100%;
            }
          </style>`

        doc.body.innerHTML =
          `<html>
            <head>${css}</head>
            <body>${marked(raw)}</body>
          </html>`
      },

      setSrcIcon(plugin) {
        const element = document.getElementById(plugin.id)
        if (!element) {
          return
        }

        this.$store.dispatch(actions.plugins.icon, plugin.name).then(() => {
          const b64 = this.iconCache[plugin.name]
          element.src = `data:${this.getMediaType(plugin)};base64,${b64}`
        })
      },

      getMediaType(plugin) {
        if (!plugin.icon) {
          return 'image/svg+xml'
        }

        const dotIndex = plugin.icon.lastIndexOf('.')
        if (dotIndex < 0) {
          return 'image/svg+xml'
        }

        const suffix = plugin.icon.substring(dotIndex + 1)

        if (suffix === 'jpg' || suffix === 'jpeg') {
          return 'image/jpeg'
        }

        if (suffix === 'gif') {
          return 'image/gif'
        }

        if (suffix === 'png') {
          return 'image/png'
        }

        return 'image/svg+xml'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .plugin-icon {
    max-height: 24px;
    max-width: 16px;
  }

  .markdown {
    width: 100%;
    height: 100%;
    border: 0;
    background: #fbfbfb;
  }
</style>
