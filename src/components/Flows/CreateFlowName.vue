<template>
  <div>
    <v-layout>
      <v-flex xs12 sm6>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-text-field
              required
              :counter="20"
              v-model="flow.name"
              :rules="nameRules"
              :error-messages="errorMsg"
          ></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    <v-btn color="primary" @click="handleNextClick">{{ $t('next') }}</v-btn>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import actions from '@/store/actions'

  export default {
    name: 'CreateFlowName',
    props: {
      flow: {
        required: true,
        type: Object
      },
      onNextClick: {
        required: true,
        type: Function
      }
    },
    data () {
      return {
        valid: true,
        errorMsg: [],
        nameRules: [
          v => !!v || this.$t('flow.hint.name_required'),
          v => (/^[A-Za-z0-9_-]+$/g.test(v)) || this.$t('flow.hint.name_rule'),
          v => (v.length >= 1 && v.length <= 20) || this.$t('flow.hint.name_size'),
        ]
      }
    },
    computed: {
      ...mapState({
        isExist: state => state.flows.isExist
      })
    },
    methods: {
      handleNextClick () {
        if (!this.$refs.form.validate()) {
          return
        }

        this.errorMsg.length = 0
        this.$store.dispatch(actions.flows.exist, this.flow.name).then()
      }
    },

    watch: {
      isExist(after) {
        if (after === undefined) {
          return
        }

        if (after === false) {
          this.errorMsg.length = 0
          this.onNextClick()
          this.$store.dispatch(actions.flows.reset).then()
          return
        }

        this.errorMsg.push(this.$t('flow.hint.name_duplicate'))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
