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
      <Editor :editor="editor" @onCodeChange="onCodeChange"></Editor>
    </v-card-text>
    <v-card-actions>
      <v-btn
      :loading="loading"
      :disabled="disabled"
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
  import { setYml, getYml } from '@/api/axios/api'
  export default {
    data () {
      return {
        loading: false,
        editor: '',
        disabled: true
      }
    },
    components: {
      Editor
    },
    created () {
      getYml(this.$route.params.id).then(res => {
        this.editor = res.data
      }).catch(() => {
        this.editor = `envs:
  FLOW_WORKSPACE: "echo hello"
  FLOW_VERSION: "echo version"

steps:
- envs:
    FLOW_WORKSPACE: "echo step"
    FLOW_VERSION: "echo step version"
  allowFailure: true
  script: |
    echo hello

- name: step2
  allowFailure: false
  script: "echo 2"`
      })
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
      onCodeChange (val) {
        this.disabled = false
        this.editor = val
      },
      goback () {
        this.$router.push({path: `/flows/${this.$route.params.id}/jobs`})
      }
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
