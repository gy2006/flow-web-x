
const state = {
  JobsStatus: {}
}

const mutations = {
  JobsStatus (state, res) {
    state.JobsStatus = res
  }
}

const actions = {
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
