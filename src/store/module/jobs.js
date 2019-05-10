import http from '../http'

const numOfElements = 10

const state = {
  name: '', // flow name
  items: [],
  pagination: {},
  JobsStatus: {}
}

const mutations = {
  add(state, job) {
    state.items.unshift(job)
  },

  remove(state) {
    state.items.pop()
  },

  setName(state, flow) {
    state.name = flow
  },

  list(state, page) {
    state.items = page.content

    state.pagination = {
      page: page.number + 1,
      numberOfElements: numOfElements,
      totalElements: page.totalElements,
      totalPages: page.totalPages
    }
  },

  JobsStatus (state, res) {
    state.JobsStatus = res
  }
}

const actions = {

  create({commit, state}, job) {
    if (state.page > 1) {
      return;
    }

    if (state.items.length >= state.pagination.size) {
      commit('remove')
    }

    commit('add', job)
  },

  /**
   * Load job list by flow name
   */
  list({commit, state}, {flow, page}) {
    commit('setName', flow)

    http.get('jobs/' + flow,
      (page) => {
        commit('list', page)
      },
      (error) => {
        console.error(error)
      },
      {
        page: page - 1,
        size: numOfElements
      }
    )
  },

  JobsStatus ({commit}, args) {
    commit('JobsStatus', args)
  }
}

/**
 * Export action in text
 */
export const Actions = {
  'JobsStatus': 'jobs/JobsStatus'
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
