<template>
  <v-card height='100%' width="100%">
    <v-card-title>
      yml 设置
    </v-card-title>
    <v-card-text>
      <Editor :codes=codes></Editor>
    </v-card-text>
    <v-card-actions>
      <v-btn
      :loading="loading"
      :disabled="loading"
      color="info"
      @click.native="save"
      >
        保存
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import Editor from './Editor'
  import { mapState } from 'vuex'
  import Actions from '@/api/actions'
  import { getYml, setYml } from '@/api/axios/api'
  export default {
    data () {
      return {
        loader: null,
        loading: false,
        codes: ''
      }
    },
    components: {
      Editor
    },
    created () {
      getYml(this.$route.params.id).then(res => {
        this.$store.dispatch(Actions.Flows.Editor, res.data)
      }).catch(() => {
        this.$store.dispatch(Actions.Flows.Editor, 'aaaaa')
      })
    },
    methods: {
      save () {
        // this.loader = 'loading',
        setYml(this.$route.params.id, this.editor).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    computed: {
      ...mapState({
        editor: state => state.flows.editor
      })
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    }
  }
</script>

<style scoped>
  .card__text {
    height: 500px !important;
  }
  .card__actions {
    padding: 16px;
  }
</style>
