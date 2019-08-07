<template>
  <div id="app">
    <v-app id="inspire">

      <!--notification-->
      <notifications group="appInfo"
                     type="info"
                     position="bottom right">
      </notifications>

      <!--flow list-->
      <flow-menu ref="flowList" v-if="!isLogin"></flow-menu>

      <!--toolbar-->
      <v-toolbar color="grey lighten-4" dense app fixed clipped-left>
        <v-toolbar-side-icon @click.native="onFlowMenuClick"></v-toolbar-side-icon>
        <v-toolbar-title>
          <v-icon class="black--text">flow-icon-logo</v-icon>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <agent-menu v-if="!isLogin"></agent-menu>
        <profile-menu v-if="!isLogin"></profile-menu>
      </v-toolbar>

      <v-content fluid>
        <v-container fill-height class="pa-2">
          <router-view></router-view>
        </v-container>
      </v-content>

      <!--footer-->
      <v-footer class="caption" app>
        <div class="ml-4">
          感谢使用 flow.ci 进行构建
        </div>
        <div class="ml-4">
          <a href='https://github.com/FlowCI/flow-web/issues'
             target='_blank' rel='noopener'>社区</a>
        </div>
        <div class="ml-4">
          <a href='https://docs.flow.ci'
             target='_blank' rel='noopener'>文档</a>
        </div>
        <v-spacer/>
        <div class="mr-4">
          Version 1.0 beta
        </div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  import FlowMenu from '@/view/Flow/Menu'
  import AgentMenu from '@/view/Common/AgentMenu'
  import ProfileMenu from '@/view/Common/ProfileMenu'

  export default {
    name: 'App',
    components: {
      FlowMenu,
      AgentMenu,
      ProfileMenu
    },
    data () {
      return {}
    },
    computed: {
      isLogin () {
        return this.$route.name === 'Login'
      }
    },
    methods: {
      refs (name) {
        return this.$refs[ name ]
      },

      onFlowMenuClick () {
        if (!this.isLogin) {
          this.refs('flowList').click()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn--floating .icon {
    height: unset !important;
    width: unset !important;
  }
</style>
