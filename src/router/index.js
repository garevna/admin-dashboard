import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import { roleHandler } from '@/controllers/data-handlers'
import { mainDashboard } from '@/configs'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dash',
    name: 'dash',
    component: () => import('@/views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      console.log('ROLE HANDLER: ', roleHandler())
      if (!roleHandler()) next(false)
      next()
    },
    children: [
      {
        path: 'rsp-list',
        name: 'rsp-list',
        component: () => import('@/components/rsp/ListOfResellers.vue'),
        beforeEnter (to, from, next) {
          console.log(to)
          const route = mainDashboard.find(item => item.route === 'rsp-list')
          console.log(route)
          if (route && route.access.change.find(item => item === roleHandler())) {
            next()
          } else next(false)
        }
      },
      {
        path: 'services-list',
        name: 'services-list',
        component: () => import('@/components/services/ListOfServices.vue'),
        beforeEnter (to, from, next) {
          console.log(to)
          const route = mainDashboard.find(item => item.route === 'services-list')
          console.log(route)
          if (route && route.access.change.find(item => item === roleHandler())) {
            next()
          } else next(false)
        }
      },
      {
        path: 'create-new-service',
        name: 'create-new-service',
        component: () => import('@/components/services/ServiceDetails.vue')
      },
      {
        path: 'service-details/:serviceId',
        name: 'service-details',
        component: () => import('@/components/services/ServiceDetails.vue'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
