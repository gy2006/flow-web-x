import http from '../http'

const numOfElements = 10

const state = {
  name: '', // flow name
  items: [],
  pagination: {
    page: 1,
  },
  JobsStatus: {}
}

const mutations = {
  add(state, job) {
    if (state.items.length >= numOfElements) {
      state.items.pop()
    }

    state.items.unshift(job)
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

  updateStatus(state, {id, status, context}) {
    state.items.forEach((job) => {
      if (job.id !== id) {
        return
      }

      // assign new status
      job.status = status

      // merge context
      Object.assign(job.context, context);
    })
  },

  JobsStatus (state, res) {
    state.JobsStatus = res
  }
}

const actions = {

  /**
   * Start a new job
   */
  start({commit, state}) {
    http.post('jobs/run',
      (newJob) => {
        // do nothing since new job will push via websocket
      },
      {
        flow: state.name
      },
    )
  },

  /**
   * Add a job instance to current job list
   */
  create({commit, state}, job) {
    if (state.page > 1) {
      return;
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
      {
        page: page - 1,
        size: numOfElements
      }
    )
  },

  /**
   * Update job status
   */
  statusUpdate({commit, state}, jobWithNewStatus) {
    commit('updateStatus', jobWithNewStatus)
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
