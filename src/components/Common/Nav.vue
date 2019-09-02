<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-breadcrumbs divider=">" class="pa-0 pl-3 nav-link">
    <v-breadcrumbs-item
        v-for="data in itemsObjArray"
        :key="data.text"
        :href="data.href"
        :disabled="data.disabled"
        class="headline font-weight-bold">
      {{ data.text }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
  export default {
    name: 'Nav',
    props: {
      items: {
        required: true,
        type: Array
      },
      links: {
        required: true,
        type: Array
      }
    },
    computed: {
      itemsObjArray () {
        let data = []
        const linkPrefix = '#/flows/' + this.items[0] + '/'

        for (let i = 0; i < this.items.length; i++) {
          const text = this.items[i]
          const link = this.links[i]

          data.push({
            text: text,
            disabled: false,
            href: linkPrefix + link
          })
        }

        return data
      }
    }
  }
</script>

<style>

</style>
