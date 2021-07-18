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
      if (from.name === 'dash') next(false)
      next()
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/Dashboard.vue'),
    children: [
      {
        path: '/rsp-list',
        name: 'rsp-list',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'rsp-list') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'rsp-list' */ '@/components/rsp/ListOfResellers.vue')
      },
      {
        path: '/leads-request',
        name: 'leads-request',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'leads-request') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'leads-request' */ '@/components/rsp/RegistrationRequests.vue')
      },
      {
        path: '/services-list',
        name: 'services-list',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'services-list') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'services-list' */ '@/components/services/ListOfServices.vue')
      },
      {
        path: '/create-new-service',
        name: 'create-new-service',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'create-new-service') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'create-service' */ '@/components/services/ServiceDetails.vue')
      },
      {
        path: '/:serviceId',
        name: 'service-details',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'service-details') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'service-details' */ '@/components/services/ServiceDetails.vue'),
        props: true
      },
      {
        path: '/customers',
        name: 'customers',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'customers') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'customers-list' */ '@/components/customers/CustomersList.vue')
      },
      {
        path: '/footprint',
        name: 'footprint',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'footprint') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'check-address' */ '@/components/footprint/CheckAddress.vue')
      },
      {
        path: '/polygons',
        name: 'polygons',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'polygons') next(false)
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
        component: () => import(/* webpackChunkName: 'building-list' */ '@/components/footprint/BuildingsList.vue')
      },
      {
        path: '/:buildingId',
        name: 'building-details',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'building-details') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'building-pages' */ '@/components/footprint/BuildingPages.vue'),
        props: true
      },
      {
        path: '/booking',
        name: 'booking',
        component: () => import(/* webpackChunkName: 'booking' */ '@/components/schedule/Booking.vue')
      },
      {
        path: '/schedule',
        name: 'schedule',
        component: () => import(/* webpackChunkName: 'schedule' */ '@/components/schedule/InstallationSchedule.vue')
      },
      {
        path: '/tickets',
        name: 'tickets',
        component: () => import(/* webpackChunkName: 'tickets' */ '@/components/tickets/Tickets.vue')
      },
      {
        path: '/ticket-categories',
        name: 'ticket-categories',
        component: () => import(/* webpackChunkName: 'ticket-categories' */ '@/components/tickets/EditTicketCategories.vue')
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
