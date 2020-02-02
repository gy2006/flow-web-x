<template>
  <v-btn color="info"
         outlined
         @click="onClick"
         :loading="loading"
  >
    {{ $t('test') }}

    <v-icon small :class="['ml-2', statusClass]">{{ statusIcon }}</v-icon>

    <template v-slot:loader>
        <span class="custom-loader">
          <v-icon small light>flow-icon-loading1</v-icon>
        </span>
    </template>
  </v-btn>
</template>

<script>
  import actions from '@/store/actions'
  import { subscribeTopic } from '@/store/subscribe'
  import { HOST_STATUS_CONNECTED, HOST_STATUS_DISCONNECTED } from '@/util/hosts'
  import { mapState } from 'vuex'

  export default {
    name: 'HostTestBtn',
    props: {
      wrapper: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        loading: false,
        statusData: {
          [ HOST_STATUS_CONNECTED ]: {
            icon: 'mdi-checkbox-blank-circle',
            class: 'green--text'
          },

          [ HOST_STATUS_DISCONNECTED ]: {
            icon: 'mdi-checkbox-blank-circle',
            class: 'grey--text'
          }
        }
      }
    },
    computed: {
      ...mapState({
        updated: state => state.hosts.updated
      }),

      statusIcon () {
        const meta = this.statusData[ this.wrapper.status ]
        return meta ? meta.icon : 'mdi-checkbox-blank-circle'
      },

      statusClass () {
        const meta = this.statusData[ this.wrapper.status ]
        return meta ? meta.class : 'grey--text'
      }
    },
    watch: {
      updated(val) {
        if (val.id === this.wrapper.id) {
          this.loading = false
        }
      }
    },
    methods: {
      onClick () {
        subscribeTopic.hosts(this.$store)
        this.loading = true

        setTimeout(() => {
          this.$store.dispatch(actions.hosts.test, this.wrapper.name).then()
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>