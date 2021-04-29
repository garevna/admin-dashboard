import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

// import { roleHandler } from '@/controllers/data-handlers'
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
    component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/Dashboard.vue'),
    children: [
      {
        path: 'rsp-list',
        name: 'rsp-list',
        component: () => import(/* webpackChunkName: 'rsp-list' */ '@/components/rsp/ListOfResellers.vue')
      },
      {
        path: 'services-list',
        name: 'services-list',
        component: () => import(/* webpackChunkName: 'services-list' */ '@/components/services/ListOfServices.vue')
      },
      {
        path: 'create-new-service',
        name: 'create-new-service',
        component: () => import(/* webpackChunkName: 'create-service' */ '@/components/services/ServiceDetails.vue')
      },
      {
        path: 'service-details/:serviceId',
        name: 'service-details',
        component: () => import(/* webpackChunkName: 'service-details' */ '@/components/services/ServiceDetails.vue'),
        props: true
      },
      {
        path: 'footprint',
        name: 'footprint',
        component: () => import(/* webpackChunkName: 'check-address' */ '@/components/footprint/CheckAddress.vue')
      },
      {
        path: 'polygons',
        name: 'polygons',
        component: () => import(/* webpackChunkName: 'polygons' */ '@/components/footprint/EditPolygons.vue')
      },
      {
        path: 'buildings',
        name: 'buildings',
        component: () => import(/* webpackChunkName: 'buildings' */ '@/components/footprint/BuildingsList.vue')
      },
      {
        path: ':buildingId',
        name: 'building-details',
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

router.beforeResolve((to, from, next) => {
  console.log('ROUTER: BEFORE RESOLVE', to === from)
  to.name === from.name ? next(false) : next()
})

router.beforeEach((to, from, next) => {
  console.log('ROUTER: BEFORE EACH', to === from)
  to.name === from.nam ? next(false) : next()
})

export default router
