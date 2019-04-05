import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import '../theme/index.css'
import './plugins/element.js'

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
