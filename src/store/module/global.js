export const Store = {
  namespaced: true,
  state: {
    snackbar: {
      show: false,
      text: '',
      color: ''
    }
  },
  mutations: {
    show (state, {text, color}) {
      state.snackbar.text = text;
      state.snackbar.show = true;
      state.snackbar.color = color;
    }
  }
}
