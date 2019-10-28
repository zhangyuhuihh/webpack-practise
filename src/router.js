import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home'
// import About from '../views/About'
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/Home',
      component: () => import('./views/Home')
    },
    {
      path: '/test1',
      component: () => import('./views/test1')
    },
    {
      path: '/partComponent',
      component: () => import('./views/part_component/index.vue')
    }
    // {
    //   path: '*',
    //   redirect: '/Home'
    // }
  ]
})
