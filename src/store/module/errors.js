const state = {
  items: [],
};

const mutations = {
  addError: (state, error) => state.items.unshift(error),
  popError: state => state.items.pop(),
};

const actions = {
  populateErrors ({ commit }, error) {
    commit('addError', error);
    setTimeout(() => commit('popError'), 3000);
  },
};

export const Store = {
  state,
  mutations,
  actions,
};
