import { createRouter, createWebHistory } from 'vue-router'
import PresentacionView from '../views/PresentacionView.vue'

const routes = [
  {
    path: '/',
    name: 'presentacion',
    component: PresentacionView
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
