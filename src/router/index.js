import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'
import local from '@/utils/local'
Vue.use(VueRouter)
const router = new VueRouter({
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
// 添加路由的导航守卫，前置导航守卫
router.beforeEach((to, from, next) => {
  const user = local.getUser()
  if (user && user.token) {
    next()
  } else {
    // 如果没有token时需要跳回到登录页，
    // 如果一开始就是从登录页进入的时候是不需要拦截的
    // 因为此时就是没有token的时候，如果拦截那就一直没有token了（maybe）
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
