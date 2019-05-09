import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import messages from './i18n/index'
import store from './store/index'
import moment from 'moment'

import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/styles/style.scss'

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.use(VueI18n)

Vue.filter('Status', function (status) {
  switch (status) {
  case 'TIMEOUT':
    return 'blue-grey'
  case 'RUNNING':
    return 'info'
  case 'SUCCESS':
    return 'success'
  case 'ENQUEUE':
    return 'info'
  }
})

Vue.filter('datefmt', function (val, fmtstring) {
  return moment(val).format(fmtstring)
})

new Vue({
  i18n: new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
  }),
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
