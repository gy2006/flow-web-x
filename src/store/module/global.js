export const Store = {
  namespaced: true,
  state: {
    snackbar: {
      show: false,
      text: ''
    }
  },
  mutations: {
    show (state, text) {
      state.snackbar.text = text;
      state.snackbar.show = true;
    }
  }
}
