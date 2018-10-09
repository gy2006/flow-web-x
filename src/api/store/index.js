import Vue from 'vue'
import Vuex from 'vuex'
import { Store as FlowStore } from './module/flows'
import { Store as SocketStore } from './module/socket'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    'flows': FlowStore,
    'socket': SocketStore
  }
})