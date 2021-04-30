import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import { roleHandler } from '@/controllers/data-handlers'
// import { mainDashboard } from '@/configs'

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
    beforeEnter (to, from, next) {
      if (!roleHandler()) next({ name: 'home' })
      next()
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/Dashboard.vue'),
    children: [
      {
        path: '/rsp-list',
        name: 'rsp-list',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          next()
        },
        component: () => import(/* webpackChunkName: 'rsp-list' */ '@/components/rsp/ListOfResellers.vue')
      },
      {
        path: '/services-list',
        name: 'services-list',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          next()
        },
        component: () => import(/* webpackChunkName: 'services-list' */ '@/components/services/ListOfServices.vue')
      },
      {
        path: '/create-new-service',
        name: 'create-new-service',
        component: () => import(/* webpackChunkName: 'create-service' */ '@/components/services/ServiceDetails.vue')
      },
      {
        path: '/:serviceId',
        name: 'service-details',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          next()
        },
        component: () => import(/* webpackChunkName: 'service-details' */ '@/components/services/ServiceDetails.vue'),
        props: true
      },
      {
        path: '/footprint',
        name: 'footprint',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          next()
        },
        component: () => import(/* webpackChunkName: 'check-address' */ '@/components/footprint/CheckAddress.vue')
      },
      {
        path: '/polygons',
        name: 'polygons',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          next()
        },
        component: () => import(/* webpackChunkName: 'polygons' */ '@/components/footprint/EditPolygons.vue')
      },
      {
        path: '/buildings',
        name: 'buildings',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'buildings') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'buildings' */ '@/components/footprint/BuildingsList.vue')
      },
      {
        path: '/:buildingId',
        name: 'building-details',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          next()
        },
        component: () => import(/* webpackChunkName: 'buildings' */ '@/components/footprint/EditBuildingDetails.vue'),
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

// router.beforeEach((to, from, next) => {
//   console.log('ROUTER: ROLE = ', roleHandler())
//   if (!roleHandler()) next({ name: 'home' })
//   console.log('ROUTER', to, from)
//   to.name === from.name ? next(from) : next(to)
// })

export default router
