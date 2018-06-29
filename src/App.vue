<template>
  <v-app id="inspire">

    <!--flow list-->
    <flow-list v-bind:drawer="isShowFlowList"/>

    <!--toolbar-->
    <v-toolbar color="grey lighten-4" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="isShowFlowList = !isShowFlowList"></v-toolbar-side-icon>
      <v-toolbar-title>
        <i class="flow-icon flow-icon-logo"/>
      </v-toolbar-title>
    </v-toolbar>

    <!--content-->
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>

    <!--btn for add flow-->
    <v-fab-transition>
      <v-btn
        v-show="isShowFlowList"
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click.native="isOpenCreateFlow = !isOpenCreateFlow"
        class="btn-add-flow">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-layout row justify-center>
      <create-flow :show="isOpenCreateFlow" v-bind:onCancel="onCancelCreateFlow"></create-flow>
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
  import CreateFlow from '@/components/CreateFlow'

  export default {
    name: 'App',
    components: {
      CreateFlow,
      FlowList
    },
    data () {
      return {
        isShowFlowList: true,
        isOpenCreateFlow: false
      }
    },
    methods: {
      onCancelCreateFlow () {
        this.isOpenCreateFlow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn--floating .icon {
    height: unset !important;
    width: unset !important;
  }

  .btn-add-flow {
    margin-bottom: 2%;
  }
</style>
