export default {
  install (Vue, options) {
    Vue.prototype.baseUrl = function () {
      return 'http://47.94.156.230:8080'
    }
  }
}
