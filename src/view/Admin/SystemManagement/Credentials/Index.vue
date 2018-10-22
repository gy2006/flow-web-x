<template>
    <v-flex class="ml-3 xs8">
        <p>
            <span>
                RSA证书
            </span>
            <span>
                IOS证书
            </span>
        </p>
        <v-data-table
            :headers="headers"
            :items="desserts"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.calories }}</td>
                <td class="text-xs-left">{{ props.item.fat }}</td>
                <td class="text-xs-left">{{ props.item.carbs }}</td>
                <td class="text-xs-left">
                    <v-icon
                        small
                        @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>
    </v-flex>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: '名称',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: '创建人', value: 'calories', sortable: false },
          { text: '创建时间', value: 'fat', sortable: false },
          { text: 'Fingerprint', value: 'carbs', sortable: false },
          { text: '', value: 'name', sortable: false }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37
          }
        ]
      }
    },
    methods: {
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      }
    }
  }
</script>

<style>

</style>
