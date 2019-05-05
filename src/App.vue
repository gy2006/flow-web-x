<template>
  <v-app id="inspire">

    <!--flow list-->
    <flow-list ref="flowList"/>

    <!--toolbar-->
    <v-toolbar color="grey lighten-4" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="refs('flowList').click()"></v-toolbar-side-icon>
      <v-toolbar-title>
        <i class="flow-icon flow-icon-logo"/>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <i class="material-icons">dvr</i>
      </v-btn>
      <v-menu offset-y>
        <v-btn
          slot="activator"
          icon
        >
          <v-icon class="material-icons">account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            @click="settings(item.title)"
          >
            <v-icon small class="material-icons mr-4">{{item.icon}}</v-icon>
            <v-list-tile-title class="caption font-weight-regular">{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <!--content-->
    <v-content class="main-content">
      <v-container fluid fill-height class="pa-2">
        <router-view/>
      </v-container>
    </v-content>

    <!--btn for add flow-->
    <v-fab-transition>
      <v-btn
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click.native="openCreateFlow"
        class="mb-3">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-layout row justify-center>
      <create-flow ref="createFlow"></create-flow>
    </v-layout>

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
</template>

<script>
  import FlowList from '@/components/FlowList'
  import CreateFlow from '@/components/CreateFlow/Index'

  export default {
    name: 'App',
    components: {
      CreateFlow,
      FlowList
    },
    data () {
      return {
        items: [
          { title: '个人设置', icon: 'account_circle' },
          { title: '系统管理', icon: 'settings' }
        ]
      }
    },
    methods: {
      openCreateFlow () {
        this.refs('createFlow').open()
      },
      refs (name) {
        return this.$refs[name]
      },
      settings (title) {
        if (title === '个人设置') {
          this.$router.push({path: '/admin/personalsetting'})
        } else if (title === '系统管理') {
          this.$router.push({path: '/admin/systemmanagement'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-content {
    height: 100%;
  }

  .btn--floating .icon {
    height: unset !important;
    width: unset !important;
  }
</style>
