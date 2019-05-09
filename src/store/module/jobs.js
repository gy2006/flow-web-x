import http from '../http'
import mock from '../mock/job'

const state = {
  name: '', // flow name
  items: [],
  pageable: {
    page: 0,
    size: 10,
    total: 0
  },
  JobsStatus: {}
}

const mutations = {
  setName(state, flow) {
    state.name = flow
  },
  list(state, jobs, total) {
    state.items = jobs
    state.pageable.total = total
  },
  JobsStatus (state, res) {
    state.JobsStatus = res
  }
}

const actions = {

  /**
   * Load job list by flow name
   */
  list({commit, state}, flow) {
    commit('setName', flow)
    commit('list', mock.data.content, 1)

    // http.get('jobs/' + flow,
    //   (page) => {
    //     commit('list', page.content, page.totalPages)
    //   },
    //   (error) => {
    //     console.error(error)
    //   },
    //   {
    //     page: state.pageable.page,
    //     size: state.pageable.size
    //   }
    // )
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
