// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import ScrollFeature from 'vue-scrollto'
import { store } from './components/StateManagement/store'

Vue.config.productionTip = false

//  initialization of smooth scroll
Vue.use(ScrollFeature)
Vue.use(ScrollFeature, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 200,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

//  initialization of firebase
var config = {
  apiKey: 'AIzaSyAqDb6NyJHE7tSYnaDbswUUaQQtssDjmSw',
  authDomain: 'resume-builder-15f75.firebaseapp.com',
  databaseURL: 'https://resume-builder-15f75.firebaseio.com',
  projectId: 'resume-builder-15f75',
  storageBucket: 'resume-builder-15f75.appspot.com',
  messagingSenderId: '765245167344'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
