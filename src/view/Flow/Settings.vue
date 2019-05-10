<template>
  <v-container fluid class="elevation-1 pa-2 full-height">
    <!-- header -->
    <v-layout row class="pa-1">
      <v-flex xs6 class="header">
        <h2 class="pr-4">
          <v-icon>layers</v-icon>
          {{ this.name }}
        </h2>
      </v-flex>
    </v-layout>

    <v-layout row justify-center class="body">
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4>{{ $t('flow_config_yml') }}</h4>
            <v-spacer/>
            <v-btn small color="warning" @click="goback">
              <v-icon small class="mr-1">arrow_back</v-icon>
              <span>{{ $t('back') }}</span>
            </v-btn>
          </v-card-title>
          <v-card-text>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" blod @click.native="save">
              <b>{{ $t('save') }}</b>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'FlowSettings',
    data () {
      return {
        name: '' // flow name
      }
    },
    mounted () {
      this.name = this.$route.params.id
    }
  }
</script>

<style lang="scss" scoped>
  .body {
    height: 100%;
    margin: 1%;
  }
</style>
