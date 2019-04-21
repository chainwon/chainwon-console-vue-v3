import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Notfound from './views/Notfound.vue'

import SettingIndex from './views/setting/Index'
import SettingNavigation from './views/setting/Navigation'

import StoreNavigation from './views/store/Navigation'

import About from './views/public/About'
import PublicNavigation from './views/public/Navigation'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        keepAlive: true,
        title: '首页'
      }
    },
    {
      path: '*',
      component: Notfound,
      meta: {
        keepAlive: true,
        title: '404'
      }
    },
    {
      path: '/setting/index',
      component: SettingIndex,
      meta: {
        keepAlive: true,
        title: '个性设置'
      },
    },
    {
      path: '/setting/navigation',
      component: SettingNavigation,
      meta: {
        keepAlive: false,
        title: '我的网址'
      },
    },
    {
      path: '/store/navigation',
      component: StoreNavigation,
      meta: {
        keepAlive: true,
        title: '网址大全'
      },
    },
    {
      path: '/public/about',
      component: About,
      meta: {
        keepAlive: true,
        title: '关于本站'
      }
    },
    {
      path: '/public/navigation',
      component: PublicNavigation,
      meta: {
        keepAlive: true,
        title: '收录网址'
      }
    },
  ]
})