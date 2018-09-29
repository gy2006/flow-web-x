<template>
<v-expansion-panel>
  <v-expansion-panel-content v-for="(item, index) in 2" :key="index">
    <template slot="header">{{item}}</template>
    <div class="wrapper">
      <Scroll
        :data="manageList[index]"
        :pullup="pullup"
        @scrollEnd="scrollEnd(index)"
      >
      <div>
        <p v-for="(item, i) in manageList[index]" :key="i">{{item}}</p>
      </div>
      </Scroll>
    </div>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
  import Scroll from '@/components/iScroll/Index'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        pullup: true,
        manageList: [
          ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
          ['2', '2', '2', '2', '2', '2']]
      }
    },
    components: {
      Scroll
    },
    methods: {
      scrollEnd (index) {
        console.log('滚动到底部了')
        this.manageList[index].push('2')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    height: 200px;
    width: 200px;
    position: relative;
    overflow: hidden;
    background: sandybrown;
  }
</style>
