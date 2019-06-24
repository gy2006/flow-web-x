<template>
  <div id="app">
    <v-app id="inspire">

      <!--notification-->
      <notifications group="appInfo"
                     type="info"
                     position="bottom right">
      </notifications>

      <!--flow list-->
      <flow-menu
          ref="flowList">
      </flow-menu>

      <!--toolbar-->
      <v-toolbar color="grey lighten-4" dense app fixed clipped-left>
        <v-toolbar-side-icon @click.native="refs('flowList').click()"></v-toolbar-side-icon>
        <v-toolbar-title>
          <v-icon class="black--text">flow-icon-logo</v-icon>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <agent-menu></agent-menu>
        <admin-menu></admin-menu>
      </v-toolbar>

      <v-content>
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
  import FlowMenu from '@/components/Flows/Menu'
  import AgentMenu from '@/components/Common/AgentMenu'
  import AdminMenu from '@/components/Common/AdminMenu'

  export default {
    name: 'App',
    components: {
      FlowMenu,
      AgentMenu,
      AdminMenu
    },
    data () {
      return {

      }
    },
    methods: {
      refs (name) {
        return this.$refs[name]
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
