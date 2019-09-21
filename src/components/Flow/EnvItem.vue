<template>
  <v-layout row class="env-item">
    <v-flex xs4>
      <v-text-field
          :label="$t('flow.var_name')"
          :readonly="!obj.edit"
          v-model="obj.name"
          solo
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-text-field
          class="ml-2"
          :label="$t('flow.var_value')"
          :readonly="!obj.edit"
          v-model="obj.value"
          solo
      ></v-text-field>
    </v-flex>
    <v-flex xs2>
      <v-select
          v-if="obj.edit"
          :items="types"
          :label="$t('flow.var_type')"
          v-model="obj.type"
          class="ml-2"
          solo
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
  import { VarTypes } from '@/util/vars'

  export default {
    name: 'EnvItem',
    props: {
      /**
       * Obj Type:
       * {
       *   name: 'xxxx',
       *   value: 'xxxx',
       *   type: 'xxxx',
       *   edit: 'true | false'
       * }
       */
      obj: {
        type: Object,
        required: true,
      }
    },
    data: () => ({
      types: VarTypes
    })
  }
</script>

<style lang="scss">
  .env-item {
    .v-input__control {
      min-height: 34px !important;
    }
    .v-input__slot {
      font-size: 12px !important;
    }
  }
</style>
