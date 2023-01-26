import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AppHome',
    component: () => import('../pages/AppHome.vue')
  },  
  {
    path: '/live',
    name: 'LiveScores',
    component: () => import('../components/scores/LiveScores.vue')
  },
  {
    path: '/injuries',
    name: 'AppInjuries',
    component: () => import('../pages/AppInjuries.vue')
  }, 
  {
    path: '/transfers',
    name: 'AppTransfers',
    component: () => import('../pages/AppTransfers.vue')
  },    
  {
    path: '/match-deatails/:id',
    name: 'MatchDetails',
    component: () => import('../components/scores/MatchDetails.vue')
  }  
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'text-green-300 font-bold',
  base: process.env.BASE_URL,
  routes
})

export default router
