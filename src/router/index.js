import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import { roleHandler } from '@/controllers/data-handlers'

const { isNavigationFailure, NavigationFailureType } = VueRouter

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
        path: '/main-dash',
        name: 'main-dash',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'main-dash') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'dashboard-info-page' */ '@/components/dashboard/MainPage.vue')
      },
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
        path: '/create-partner',
        name: 'create-partner',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'create-partner') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'leads-request' */ '@/components/rsp/CreateNewPartner.vue')
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
        path: '/SLA',
        name: 'sla',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'sla') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'sla' */ '@/components/services/ListOfSLA.vue')
      },
      {
        path: '/create-new-service',
        name: 'create-new-service',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'create-new-service') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'service-details' */ '@/components/services/ServiceDetails.vue')
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
        path: '/customers-ip-list',
        name: 'customers-ip-list',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'customers-ip-list') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'customers-ip-list' */ '@/components/customers/CustomersForEngineer.vue')
      },
      {
        path: '/customers-to-excel',
        name: 'customers-to-excel',
        component: () => import(/* webpackChunkName: 'customers-to-excel' */ '@/components/customers/ExportToExcel.vue')
      },
      {
        path: '/import-customers',
        name: 'import-customers',
        component: () => import(/* webpackChunkName: 'import-customers' */ '@/components/customers/ImportCustomers.vue')
      },
      {
        path: '/import-existing-customers',
        name: 'import-existing-customers',
        component: () => import(/* webpackChunkName: 'import-updates-for-customers' */ '@/components/customers/UpdateCustomersByImport.vue')
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
        path: '/pits',
        name: 'pits',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'pits') next(false)
          next()
        },
        component: () => import(/* webpackChunkName: 'pits' */ '@/components/footprint/EditPits.vue')
      },
      {
        path: '/lit-buildings',
        name: 'lit-buildings',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'buildings') next(false)
          next()
        },
        props: { status: 'lit' },
        component: () => import(/* webpackChunkName: 'building-list' */ '@/components/footprint/BuildingsList.vue')
      },
      {
        path: '/footprint-buildings',
        name: 'footprint-buildings',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'buildings') next(false)
          next()
        },
        props: { status: 'footprint' },
        component: () => import(/* webpackChunkName: 'building-list' */ '@/components/footprint/BuildingsList.vue')
      },
      {
        path: '/build-buildings',
        name: 'build-buildings',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'buildings') next(false)
          next()
        },
        props: { status: 'build' },
        component: () => import(/* webpackChunkName: 'building-list' */ '@/components/footprint/BuildingsList.vue')
      },
      {
        path: '/soon-buildings',
        name: 'soon-buildings',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'buildings') next(false)
          next()
        },
        props: { status: 'soon' },
        component: () => import(/* webpackChunkName: 'building-list' */ '@/components/footprint/BuildingsList.vue')
      },
      {
        path: '/other-buildings',
        name: 'other-buildings',
        beforeEnter (to, from, next) {
          if (!roleHandler()) next({ name: 'home' })
          if (from.name === 'buildings') next(false)
          next()
        },
        props: { status: 'other' },
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
        path: '/excel',
        name: 'excel',
        component: () => import(/* webpackChunkName: 'buildings-to-excel' */ '@/components/footprint/CreateExcel.vue')
      },
      {
        path: '/export-to-csv',
        name: 'export-to-csv',
        component: () => import(/* webpackChunkName: 'buildings-to-csv' */ '@/components/footprint/ExportToCsv.vue')
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
        name: 'tickets-all',
        component: () => import(/* webpackChunkName: 'tickets' */ '@/components/tickets/Tickets.vue'),
        children: [
          {
            path: '/:section',
            name: 'tickets',
            component: () => import(/* webpackChunkName: 'tickets' */ '@/components/tickets/Tickets.vue'),
            props: true
          }
        ]
      },
      {
        path: '/tickets-archived',
        name: 'tickets-archived',
        component: () => import(/* webpackChunkName: 'tickets-archived' */ '@/components/tickets/TicketsArchived.vue')
      },
      {
        path: '/ticket-categories',
        name: 'ticket-categories',
        component: () => import(/* webpackChunkName: 'ticket-categories' */ '@/components/settings/EditTicketCategories.vue')
      },
      {
        path: '/schedule-settings',
        name: 'schedule-settings',
        component: () => import(/* webpackChunkName: 'schedule-settings' */ '@/components/settings/ScheduleSettings.vue')
      },
      {
        path: '/estimated-service-delivery-time-settings',
        name: 'estimated-service-delivery-time-settings',
        component: () => import(/* webpackChunkName: 'estimated-service-delivery-time-settings' */ '@/components/settings/EstimatedServiceDeliveryTime.vue')
      },
      {
        path: '/available-service-status-updates-settings',
        name: 'available-service-status-updates-settings',
        component: () => import(/* webpackChunkName: 'available-service-status-settings' */ '@/components/settings/AvailableServiceStatusUpdates.vue')
      },
      {
        path: '/pending-connection-status-settings',
        name: 'pending-connection-status-settings',
        component: () => import(/* webpackChunkName: 'pending-connection-status-settings' */ '@/components/settings/PendingConnectionStatus.vue')
      },
      {
        path: '/building-settings',
        name: 'building-settings',
        component: () => import(/* webpackChunkName: 'building-settings' */ '@/components/settings/BuildingSettings.vue')
      },
      {
        path: '/admins-list',
        name: 'admins-list',
        component: () => import(/* webpackChunkName: 'admins-list' */ '@/components/settings/AdminsList.vue')
      },
      {
        path: '/create-admin',
        name: 'create-admin',
        component: () => import(/* webpackChunkName: 'create-admin' */ '@/components/settings/CreateNewAdmin.vue')
      },
      {
        path: '/available-roles',
        name: 'available-roles',
        component: () => import(/* webpackChunkName: 'available-roles' */ '@/components/settings/AvailableRoles.vue')
      },
      {
        path: '/documents',
        name: 'documents',
        component: () => import(/* webpackChunkName: 'documents' */ '@/components/documents/Documents.vue'),
        children: [
          {
            path: '/documents-list',
            name: 'documents-list',
            component: () => import(/* webpackChunkName: 'documents' */ '@/components/documents/Documents.vue')
            // props: true
          }
        ]
      },

      {
        path: '/reports-overview',
        name: 'reports-overview',
        props: { section: 'overview' },
        component: () => import(/* webpackChunkName: 'reports-overview' */ '@/components/reports/MainReportPage.vue')
      },
      {
        path: '/reports-buildings',
        name: 'reports-buildings',
        props: { section: 'buildings' },
        component: () => import(/* webpackChunkName: 'buildings-overview' */ '@/components/reports/MainReportPage.vue')
      },
      {
        path: '/reports-partners',
        name: 'reports-partners',
        props: { section: 'partners' },
        component: () => import(/* webpackChunkName: 'partners-overview' */ '@/components/reports/MainReportPage.vue')
      },
      {
        path: '/export-reports-overview',
        name: 'export-reports-overview',
        component: () => import(/* webpackChunkName: 'export-reports-overview' */ '@/components/reports/export/Overview.vue')
      },
      {
        path: '/export-locations-overview',
        name: 'export-locations-overview',
        component: () => import(/* webpackChunkName: 'export-locations-overview' */ '@/components/reports/export/Localities.vue')
      },
      {
        path: '/export-mrr-dynamic',
        name: 'export-mrr-dynamic',
        component: () => import(/* webpackChunkName: 'export-MRR-dynamic' */ '@/components/reports/export/MRRDynamic.vue')
      },
      {
        path: '/export-partners-overview',
        name: 'export-partners-overview',
        component: () => import(/* webpackChunkName: 'export-partners-overview' */ '@/components/reports/export/Partners.vue')
      },
      {
        path: '/export-buildings-overview',
        name: 'export-buildings-overview',
        component: () => import(/* webpackChunkName: 'export-buildings-overview' */ '@/components/reports/export/Buildings.vue')
      },
      {
        path: '/export-postcode-overview/:postcode',
        name: 'export-postcode-overview',
        component: () => import(/* webpackChunkName: 'export-postcode-overview' */ '@/components/reports/export/Postcode.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  isNavigationFailure,
  NavigationFailureType
})

export default router
