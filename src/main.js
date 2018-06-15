// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import messages from './messages'
import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'
import './assets/styles/style.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueI18n)

console.log(messages)

const i18n = new VueI18n({
  locale: 'cn',
  fallbackLocale: 'en',
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
