<template>
    <v-list>
        <v-list-tile style="background: rgb(237, 237, 237);">
            <v-list-tile-title>提交信息</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
            <v-list-tile-title>提交 ID</v-list-tile-title>
            <v-list-tile-title>{{ jobdetail.id }}</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
            <v-list-tile-title>作者</v-list-tile-title>
            <v-list-tile-title></v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
            <v-list-tile-title>分支</v-list-tile-title>
            <v-list-tile-title>{{ jobdetail.context.FLOWCI_GIT_BRANCH }}</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
            <v-list-tile-title>提交说明</v-list-tile-title>
            <v-list-tile-title></v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
            <v-list-tile-title>变更对比</v-list-tile-title>
            <v-list-tile-title></v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile style="background: rgb(237, 237, 237);">
            <v-list-tile-title>Agent信息</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
            <v-list-tile-title>Agent</v-list-tile-title>
            <v-list-tile-title></v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
    </v-list>
</template>

<script>
  export default {
    name: 'Message',
    props: ['jobdetail']
  }
</script>

<style>

</style>
