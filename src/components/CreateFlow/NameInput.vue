<template>
  <v-layout row>
    <v-flex xs8>
      <v-text-field
        :rules="[nameRules.required, nameRules.counter, nameRules.format]"
        v-model="textVal"
        single-line
        hint="Give a name for flow"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'NameInput',
    props: {
      initValue: String
    },
    methods: {
      hasError (val) {
        if (typeof val === 'string') {
          return true
        }

        if (typeof val === 'boolean') {
          return false
        }

        return true
      }
    },
    data () {
      return {
        textVal: this.initValue,
        nameRules: {
          required: (value) => {
            return !!value || 'Name is required'
          },
          counter: (value) => {
            return (value.length >= 4 && value.length <= 20) || 'Length between 4 and 20'
          },
          format: (value) => {
            const nameReg = /^[a-zA-Z_]+$/i
            return nameReg.test(value) ? true : 'Incorrect name format'
          }
        }
      }
    },
    watch: {
      textVal (val) {
        let errors = 0
        let rules = this.nameRules
        let hasError = this.hasError

        Object.keys(rules).forEach(function (key) {
          errors = hasError(rules[key](val)) ? (errors + 1) : errors
        })

        this.$emit('input', val, errors)
      }
    }
  }
</script>

<style scoped>

</style>
