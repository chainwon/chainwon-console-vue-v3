import Vue from "vue";
import Router from "vue-router";

import About from "./views/public/About";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
      meta: {
        keepAlive: true,
        title: "首页"
      }
    },
    {
      path: "*",
      component: () => import("./views/Notfound.vue"),
      meta: {
        keepAlive: true,
        title: "404"
      }
    },
    {
      path: "/setting/index",
      component: () => import("./views/setting/Index"),
      meta: {
        keepAlive: true,
        title: "功能设置"
      }
    },
    {
      path: "/setting/style",
      component: () => import("./views/setting/Style"),
      meta: {
        keepAlive: true,
        title: "个性风格"
      }
    },
    {
      path: "/setting/navigation",
      component: () => import("./views/setting/Navigation"),
      meta: {
        keepAlive: false,
        title: "我的网址"
      }
    },
    {
      path: "/store/navigation",
      component: () => import("./views/store/Navigation"),
      meta: {
        keepAlive: true,
        title: "网址大全"
      }
    },
    {
      path: "/public/about",
      component: About,
      meta: {
        keepAlive: true,
        title: "关于本站"
      }
    },
    {
      path: "/public/navigation",
      component: () => import("./views/public/Navigation"),
      meta: {
        keepAlive: true,
        title: "收录网址"
      }
    }
  ]
});
