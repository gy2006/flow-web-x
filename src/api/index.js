import Vue from 'vue'
import Vuex from 'vuex'
import { Store as FlowStore } from './flows'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    'flows': FlowStore
  }
})
