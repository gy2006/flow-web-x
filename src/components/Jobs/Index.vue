<template>
    <v-card height='100%' width="100%">
        <v-card-title>
            <h2>name : {{this.$route.params.id}}</h2>
            <v-chip label color="orange" outline text-color="galy" @click="yml">
                <v-icon left>settings</v-icon>工作流设置
            </v-chip>
        </v-card-title>
    </v-card>
</template>

<script>

  import { mapState } from 'vuex'
  export default {
    name: 'Jobs',
    data () {
      return {
        jobs: []
      }
    },
    methods: {
      yml () {
        this.$router.push({path: `/flows/${this.$route.params.id}/yml`})
      }
    },
    computed: {
      ...mapState({
        name: state => state.flows.name
      })
    },
    mounted () {
      this.$http.get(`http://47.94.156.230:8080/jobs/${this.$route.params.id}`).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          return err
      })
    },
    watch: {
      $route (to, form) {
        this.$http.get(`http://47.94.156.230:8080/jobs/${this.$route.params.id}`).then(
          (res) => {
            console.log(res.data.data)
          },
          (err) => {
            return err
        })
      }
    }
  }
</script>

<style>

</style>
