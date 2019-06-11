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
          ></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    <v-btn color="primary" @click="handleNextClick">{{ $t('next') }}</v-btn>
  </div>
</template>

<script>
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
        nameRules: [
          v => !!v || this.$t('flow.hint.name_required'),
          v => (/^[A-Za-z0-9_-]+$/g.test(v)) || this.$t('flow.hint.name_rule'),
          v => (v.length >= 1 && v.length <= 20) || this.$t('flow.hint.name_size'),
        ]
      }
    },
    methods: {
      handleNextClick () {
        if (this.$refs.form.validate()) {
          this.onNextClick()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
