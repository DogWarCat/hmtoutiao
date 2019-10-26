import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: home,
    children: [{
      path: '',
      component: welcome
    }]
  },
  // 匹配  不符合路由规则的路径
  {
    path: '*',
    component: NotFound
  }
  ]
})
