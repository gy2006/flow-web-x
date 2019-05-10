import http from '../http'

const state = {
  name: '', // flow name
  items: [],
  pagination: {
    page: 1,
    numberOfElements: 10,
    totalPages: 0,
    totalElements: 0
  },
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
      numberOfElements: page.numberOfElements,
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
  list({commit, state}, flow) {
    commit('setName', flow)

    http.get('jobs/' + flow,
      (page) => {
        commit('list', page)
      },
      (error) => {
        console.error(error)
      },
      {
        page: state.pagination.page - 1,
        size: state.pagination.numberOfElements
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
