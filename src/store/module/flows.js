import http from '../http'

const state = {
  items: [],
  name: '',
  editor: '',
  selected: {}
}

const mutations = {
  select (state, flow) {
    state.selected = flow
  },

  list (state, items) {
    state.items = items
  },

  name (state, res) {
    state.name = res
  },

  editor (state, res) {
    state.editor = res
  }
}

const actions = {
  select (context, flow) {
    context.commit('select', flow)
  },

  list ({commit}) {
    http.get('flows', (list) => {
        commit('list', list)
      }
    )
  },

  editor ({commit}, args) {
    commit('editor', args)
  },

  name ({commit}, args) {
    commit('name', args)
  }
}

/**
 * Export action in text
 */
export const Actions = {
  'List': 'flows/list',
  'Name': 'flows/name',
  'Editor': 'flows/editor'
}

/**
 * Export Vuex store object
 */
export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
