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
        Content
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
        selected: false
      }
    },
    computed: {
      ...mapState({
        plugins: state => state.plugins.items,
        readmes: state => state.plugins.readme
      }),
    },
    mounted() {
      this.$store.dispatch(actions.plugins.list).then()
      this.getReadMe("maven-test")
    },
    methods: {
      getReadMe(name) {
        this.$store.dispatch(actions.plugins.readme, name)
          .then()
          .catch(() => {})
      }
    }
  }
</script>

<style scoped>

</style>
