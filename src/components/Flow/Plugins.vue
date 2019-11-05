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
                         @click="getReadMe(plugin.name)"
            >
              <v-list-item-content>
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
    computed: {
      ...mapState({
        plugins: state => state.plugins.items,
        readmes: state => state.plugins.readme
      }),
    },
    mounted() {
      this.$store.dispatch(actions.plugins.list).then(() => {
        let plugin = this.plugins[this.selected]
        if (plugin) {
          this.getReadMe(plugin.name)
        }
      })
    },
    methods: {
      getReadMe(name) {
        let loaded = this.readmes[name]

        if (loaded) {
          this.currentReadMe = loaded
          return
        }

        this.$store.dispatch(actions.plugins.readme, name)
          .then(() => {
            this.currentReadMe = this.readmes[name]
          })
          .catch(() => {})
      }
    }
  }
</script>

<style scoped>

</style>
