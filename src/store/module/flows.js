import http from '../http'

const state = {
  items: [],
  editor: '',
  selected: {
    name: undefined,
    yml: ''
  }
}

const mutations = {
  select (state, name) {
    state.selected.name = name
  },

  setYml(state, yml) {
    state.selected.yml = yml
  },

  list (state, items) {
    state.items = items
  },

  editor (state, res) {
    state.editor = res
  }
}

const actions = {
  select (context, flow) {
    context.commit('select', flow.name)
  },

  list ({commit}) {
    http.get('flows', (list) => {
        commit('list', list)
      }
    )
  },

  yml ({commit, state}, name) {
    if (!name) {
      return
    }

    http.get('flows/' + name + '/yml', (yml) => {
      commit('setYml', yml)
    })
  },

  editor ({commit}, args) {
    commit('editor', args)
  },
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
