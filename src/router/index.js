import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }
  ]
})
