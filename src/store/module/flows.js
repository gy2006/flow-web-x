import config from '../config'

const state = {
  items: [],
  name: '',
  editor: '',
  selected: {}
}

const mutations = {
  select (state, name) {
    state.selected.name = name
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
  select (context) {
    context.commit('select', 'hello flow')
  },

  list ({commit}) {
    config.call.get('flows')
        .then((response) => {
          console.log(response)
          commit('list', response.data.data)
        })
        .catch((error) => {
          console.log(error)
          commit('list', [])
        })
        .finally(() => {
          console.log('Debug... get flow list...')
        })
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
