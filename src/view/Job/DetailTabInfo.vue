<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid class="elevation-1 pa-2 full-height">

    <v-layout row>
      <v-flex>

      </v-flex>
    </v-layout>

    <!-- context variables -->
    <v-layout row>
      <v-flex xs12>
        <v-data-table
            :items="wrapper.contextAsList"
            hide-headers
            hide-actions>

          <template v-slot:items="props">
            <td>
              {{ props.item.key }}
            </td>
            <td>
              {{ props.item.value }}
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'JobDetailInfo',
    data () {
      return {}
    },
    props: {
      wrapper: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
