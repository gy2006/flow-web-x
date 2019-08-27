<template>
  <div>
    <div class="subheading font-weight-medium my-1">{{ title }}</div>
    <v-text-field
        solo
        :readonly="readonly"
        v-model="model.data"
        :rules="rules"
        :type="password ? 'password' : 'text'"
        class="text-box"
    ></v-text-field>
  </div>
</template>

<script>
  export default {
    name: 'TextBox',
    props: {
      title: {
        type: String,
        required: true
      },
      model: {
        type: Object,
        default () {
          return {
            data: ''
          }
        }
      },
      readonly: {
        type: Boolean,
        required: false,
        default: false
      },
      rules: {
        type: Array,
        default () {
          return []
        }
      },
      password: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss">
  .text-box {
    .v-input__control {
      min-height: 34px !important;
    }
    .v-input__slot {
      background: #fafbfc !important;
      font-size: 14px !important;
    }
  }
</style>
