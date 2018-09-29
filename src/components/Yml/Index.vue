<template>
  <v-card height='100%' width="100%">
    <v-card-title>
      <h4>配置 YML 工作流</h4>
      <v-spacer/>
      <v-btn color="orange darken-2" dark @click="goback">
        <v-icon dark left>arrow_back</v-icon>返回
      </v-btn>
    </v-card-title>
    <v-card-text>
      <Editor></Editor>
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
  import { setYml } from '@/api/axios/api'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        loading: false
      }
    },
    components: {
      Editor
    },
    methods: {
      save () {
        this.loading = true
        setYml(this.$route.params.id, this.editor).then(res => {
          if (res.data.code === 200) this.loading = false
          if (res.data.code === 500) this.loading = false
          alert(res.data.code)
        }).catch(err => {
          console.log(err)
        })
      },
      goback () {
        this.$router.push({path: `/flows/${this.$route.params.id}/jobs`})
      }
    },
    computed: {
      ...mapState({
        editor: state => state.flows.editor
      })
    }
  }
</script>

<style scoped>
  .v-card__text {
    height: 500px !important;
  }
  .v-card__actions {
    padding: 16px;
  }
</style>
