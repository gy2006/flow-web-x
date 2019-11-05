<template>
  <div class="full-size">
    <v-row>
      <v-col>
        Plugins
      </v-col>
    </v-row>

    <v-row class="full-height">
      <v-col cols="2">
        <v-list>
          <v-list-item-group v-model="selected">
            <v-list-item v-for="plugin in plugins"
                         :key="plugin.id"
                         @click="getReadMe(plugin)"
            >
              <v-list-item-content>
                <v-list-item-icon>
                  <v-icon v-if="isDefaultIcon(plugin)">mdi-plus</v-icon>
                  <v-img v-if="isHttpLinkIcon(plugin)" :src="plugin.icon"></v-img>
                  <img v-if="isRepoSrcIcon(plugin)" :id="plugin.id" alt="">
                </v-list-item-icon>
                <v-list-item-subtitle>
                  {{ plugin.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col>
        {{ currentReadMe }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'
  import http from '@/store/http'

  export default {
    name: 'Plugins',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        selected: 0,
        currentReadMe: ''
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
          this.currentReadMe = loaded
          return
        }

        this.$store.dispatch(actions.plugins.readme, name)
          .then(() => {
            this.currentReadMe = this.readmeCache[name]
          })
          .catch(() => {})
      },

      isDefaultIcon(plugin) {
        return !plugin.icon
      },

      isHttpLinkIcon(plugin) {
        const pathOrLink = plugin.icon
        if (!pathOrLink) {
          return false
        }

        return pathOrLink.startsWith("http") || pathOrLink.startsWith("https")
      },

      isRepoSrcIcon(plugin) {
        const pathOrLink = plugin.icon
        if (!pathOrLink) {
          return false
        }

        return !this.isHttpLinkIcon(plugin)
      },

      setSrcIcon(plugin) {
        const element = document.getElementById(plugin.id)
        if (!element) {
          console.log(plugin.id)
          return
        }

        this.$store.dispatch(actions.plugins.icon, plugin.name).then(() => {
          const b64 = this.iconCache[plugin.name]
          element.src = "data:image/svg+xml;base64," + b64
        })
      }
    }
  }
</script>

<style scoped>

</style>
