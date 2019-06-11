<template>
  <div>
    <v-layout>
      <v-flex xs12 sm6>
        <v-form
            v-model="valid"
            lazy-validation
        >
          <v-text-field
              solo
              clearable
              v-model="name"
              :rules="nameRules"
          ></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    <v-btn color="primary" @click="handleNextClick">{{ $t('next') }}</v-btn>
    <v-btn flat @click="onCancelClick">{{ $t('cancel') }}</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'CreateFlowName',
    props: {
      onNextClick: {
        required: true,
        type: Function
      },
      onCancelClick: {
        required: true,
        type: Function
      }
    },
    data () {
      return {
        valid: true,
        name: '',
        nameRules: [
          v => !!v || this.$t('flow.hint.name_required'),
          v => (/^[A-Za-z0-9_-]+$/g.test(v)) || this.$t('flow.hint.name_rule'),
          v => (v.length >= 1 && v.length <= 20) || this.$t('flow.hint.name_size'),
        ]
      }
    },
    methods: {
      handleNextClick () {
        if (this.valid) {
          this.onNextClick()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>