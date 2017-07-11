// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios = Axios

Vue.prototype.$toast = (obj) => {
  const oo = {}
  if (typeof obj === 'object') {
    oo.msg = obj.msg || ''
    oo.timer = obj.time || 2000
    oo.type = obj.type
  } else {
    oo.msg = obj || ''
    oo.timer = 2000
  }
  let toast = document.getElementById('toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.setAttribute('id', 'toast')
    toast.className = 'toast fade-in'
    document.body.appendChild(toast)
  } else {
    toast.className = 'toast fade-in'
  }
  oo.type
    ? toast.innerHTML = '<i class="' + oo.type + '"></i><span>' + oo.msg + '</span>'
    : toast.innerHTML = '<span>' + oo.msg + '</span>'
  setTimeout(() => {
    toast.className = 'toast fade-out'
  }, oo.timer)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
