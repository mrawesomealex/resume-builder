// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ScrollFeature from 'vue-scrollto'
import { store } from './components/StateManagement/store'
import VueSimpleSVG from 'vue-simple-svg'

Vue.config.productionTip = false

Vue.use(VueSimpleSVG)

//  initialization of smooth scroll
Vue.use(ScrollFeature)
Vue.use(ScrollFeature, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: -200,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
