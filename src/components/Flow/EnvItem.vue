<template>
  <v-layout row class="env-item">
    <v-flex xs3>
      <v-text-field
          :label="$t('flow.var_name')"
          :readonly="!isNew"
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
  import actions from '@/store/actions'

  export default {
    name: 'EnvItem',
    props: {
      flow: {
        required: true,
        type: Object
      },

      /**
       * {
       *   name: 'xxxx',
       *   value: 'xxxx',
       *   type: 'xxxx',
       *   edit: true | false (option)
       * }
       */
      item: {
        type: Object,
        required: true
      },

      editable: {
        type: Boolean,
        required: true
      },

      onSaved: {
        type: Function,
        required: false
      },

      onRemoved: {
        type: Function,
        required: false
      }
    },
    data: () => ({
      types: VarTypes,
      edit: false,
      obj: {}
    }),
    mounted () {
      this.obj = Object.assign({}, this.item)
      if (this.obj.edit) {
        this.edit = this.obj.edit
      }
    },
    computed: {
      isNew () {
        return this.item.name === ''
      }
    },
    methods: {
      onSaveClick () {
        let flow = this.flow
        this.$store.dispatch(actions.flows.vars.add, {flow, ...this.obj})
          .then(() => {
            if (this.onSaved) {
              this.onSaved(this.item, this.obj)
            }
            this.edit = false
          })

      },

      onRemoveClick () {
        let flow = this.flow
        this.$store.dispatch(actions.flows.vars.remove, {flow, ...this.obj})
          .then(() => {
            if (this.onRemoved) {
              this.onRemoved(this.obj)
            }
            this.edit = false
          })
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
