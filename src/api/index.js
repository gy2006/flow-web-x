import Vue from 'vue'
import Vuex from 'vuex'
import flow from './flows'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    flow
  }
})
