<template>
    <div>{{this.$route.params.id}}</div>
</template>

<script>

  import { mapState } from 'vuex'
  export default {
    name: 'Yml',
    computed: {
      ...mapState({
        name: state => state.flows.name
      })
    }
  }
</script>

<style>

</style>
