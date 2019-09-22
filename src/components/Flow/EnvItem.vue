<template>
  <v-layout row class="env-item">
    <v-flex xs3>
      <v-text-field
          :label="$t('flow.var_name')"
          :readonly="!edit"
          v-model="obj.name"
          solo
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-text-field
          class="ml-2"
          :label="$t('flow.var_value')"
          :readonly="!edit"
          v-model="obj.value"
          solo
      ></v-text-field>
    </v-flex>

    <!--  show type while editing  -->
    <v-flex xs2 v-if="edit">
      <v-select
          :items="types"
          :label="$t('flow.var_type')"
          v-model="obj.type"
          class="ml-2"
          solo
      ></v-select>
    </v-flex>

    <v-flex xs2>
      <v-btn icon
             v-if="editable && !edit"
             class="mt-0 mr-2 mr-0"
             @click="edit = !edit"
      >
        <v-icon small>edit</v-icon>
      </v-btn>

      <!--  show save and remove button while editing  -->
      <div v-if="edit">
        <v-btn icon
               class="mt-0 mx-0"
               @click="onSaveClick"
        >
          <v-icon class="light-green--text" small>done</v-icon>
        </v-btn>
        <v-btn icon
               class="mt-0 mx-0"
               @click="onRemoveClick"
        >
          <v-icon class="red--text" small>delete</v-icon>
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import { VarTypes } from '@/util/vars'

  export default {
    name: 'EnvItem',
    props: {
      /**
       * {
       *   name: 'xxxx',
       *   value: 'xxxx',
       *   type: 'xxxx',
       * }
       */
      item: {
        type: Object,
        required: true
      },

      editable: {
        type: Boolean,
        required: true
      }
    },
    data: () => ({
      types: VarTypes,
      edit: false,
      obj: {}
    }),
    mounted () {
      Object.assign(this.obj, this.item)
    },
    methods: {
      onSaveClick () {
        this.edit = false
      },

      onRemoveClick () {
        this.edit = false
      }
    }
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
