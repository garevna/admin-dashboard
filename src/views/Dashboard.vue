<template>
  <v-container class="mt-12">
    <v-navigation-drawer
      app
      permanent
      left
      style="z-index: 15"
    >
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle @click="$route.name !== 'main-dash' && $router.push({ name: 'main-dash' })">
              <v-icon style="cursor: pointer">mdi-view-dashboard</v-icon>
              <b style="cursor: pointer">Dashboard</b>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list v-if="disabledRoutes">
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
        >
          <template v-slot:activator>
            <v-list-item-content v-if="refreshed[item.refresh]">
              <v-list-item-title :class="disabledRoutes[item.disabled] ? 'disabled-item' : ''">
                <v-icon small>{{ item.icon }}</v-icon> {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            class="clickable"
            style="margin-left: 16px!important; margin-top: -16px!important"
            :disabled="disabledRoutes[child.disabled] || disabledRoutes[item.disabled]"
            @click="disabledRoutes[child.disabled] ? null : jumpTo(child)"
          >
            <v-list-item-content v-if="!child.children">
              <v-list-item-title>
                <v-icon small>{{ child.icon }}</v-icon>
                {{ child.title }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-content v-else class="pb-0 mb-0 mr-0" style="margin-left: -32px!important; margin-top: -12px!important;">
              <v-list-group sub-group prepend-icon="">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title active-class="active-list-item">
                      <v-icon small>{{ child.icon }}</v-icon>
                      {{ child.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="(subChild, i) in child.children"
                  :key="i"
                  @click="disabledRoutes[subChild.disabled] ? null : jumpTo(subChild)"
                  class="mt-0 mb-2 py-0"
                  :disabled="disabledRoutes[subChild.disabled]"
                  active-class="active-list-item"
                  style="min-height: 24px!important; max-height: 32px!important; padding-left: 48px"
                >
                  <v-list-item-title :disabled="disabledRoutes[subChild.disabled]">
                    <v-icon small :color="$route.name === subChild.route ? '#900' : '#777'">{{ subChild.icon }}</v-icon>
                    <span :style="{ color: $route.name === subChild.route ? '#900' : '#777' }">{{ subChild.title }}</span>
                  </v-list-item-title>
                </v-list-item>
                <!-- <div class="my-4"><small>{{ disabledRoutes[child.disabled] }}</small></div> -->
              </v-list-group>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-card flat class="transparent mx-auto" max-width="1440">
      <transition name="page-fade-transition" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-card>
  </v-container>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

const { mainDashboard } = require('@/configs').default

export default {
  name: 'Dashboard',

  data: () => ({
    items: mainDashboard,
    disabledRoutes: null,
    refreshed: {}
  }),

  methods: {
    setRefreshed (event) {
      this.refreshed[event] = true
    },

    jumpTo (item) {
      if (item.route === 'tickets') {
        if (item.path.indexOf(this.$route.path) !== -1) return
        this.$router.push({ name: item.route, params: item.params })
          .catch(failure => console.warn('Router failure:\n', failure))
      } else {
        if (this.$route.name === item.route) return
        item.route && this.$router.push({ name: item.route })
          .catch(failure => console.warn('Router failure:\n', failure))
      }
    },

    refreshTicketCategories (data) {
      //
    },

    getAdmins (data) {
      // console.log(data)
    }
  },

  beforeDestroy () {
    [
      'buildings-refreshed',
      'rsp-refreshed',
      'customers-refreshed',
      'tickets-refreshed',
      'services-refreshed',
      'schedule-refreshed',
      'documents-refreshed'
    ].forEach((event) => {
      this.$root.$off(event, this.setRefreshed)
    })

    this.$root.$off('ticket-categories-updated', this.refreshTicketCategories)
  },

  beforeMount () {
    if (!roleHandler()) this.$router.push({ name: 'home' }).catch(failure => console.warn('Router failure:\n', failure))
  },

  mounted () {
    const rights = accessRightsHandler().access[roleHandler()]
    if (!rights) {
      console.warn('Access rights error for the role', roleHandler())
      console.warn(accessRightsHandler())
      console.warn(accessRightsHandler().access)
      console.warn('Try to reload page')
    }
    const dashboard = accessRightsHandler().dashboard

    const [partners, rsp, footprint, polygons, buildings, customers, tickets, services, schedule, documents, settings, reports] = [
      !rights.partners,
      !rights.partners,
      !rights.polygons && !rights.buildings,
      !rights.polygons,
      !rights.buildings,
      !rights.customers,
      !rights.tickets,
      !rights.services,
      !rights.schedule,
      !rights.documents,
      !rights.settings,
      !rights.reports
    ]

    this.disabledRoutes = { partners, rsp, footprint, polygons, buildings, customers, tickets, services, schedule, documents, settings, reports }

    // if (window.performance) {
    //   if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    //     console.info('This page has been reloaded')
    //     this.refreshed = { rsp: true, buildings: true, customers: true, tickets: true, services: true, schedule: true, documents: true, settings: true }
    //   } else {
    //     this.refreshed = { rsp, buildings, customers, tickets, services, schedule, documents, settings: true }
    //   }
    // }

    this.refreshed = { rsp, buildings, customers, tickets, services, schedule, documents, settings: true }

    dashboard
      .map(item => `${item === 'partners' ? 'rsp' : item}-refreshed`)
      .forEach(event => this.$root.$on(event, this.setRefreshed))

    this.$root.$on('ticket-categories-updated', this.refreshTicketCategories)
    this.$router.push({ name: 'main-dash' })
  }
}
</script>

<style>

.theme--light.v-time-picker-clock {
  background: transparent;
}

.clickable {
  cursor: pointer;
}
.active-list-item {
  border: dotted 1px #900;
  background: #9007;
}
.disabled-item {
  color: #bbb;
}

.v-application--is-ltr .v-list-group--no-action > .v-list-group__items > .v-list-item {
  padding-left: 32px!important;
  min-height: 24px!important;
  max-height: 32px;
}

.v-icon.v-icon {
  margin-right: 8px!important;
}

.bottom-info {
  position: fixed;
  bottom: 42px;
  left: 16px;
  z-index: 55;
}
.v-application--is-ltr .v-data-table--fixed-header .v-data-footer {
  margin-right: -8px!important;
  bottom: 24px;
  position: fixed;
  background: #ddd;
  left: 0;
  right: 0;
  padding: 0 16px;
  z-index: 18;
}

.v-menu__content--fixed {
  top: calc(100% - 340px) !important;
  bottom: 80px !important;
}

.v-list-item__title {
  font-size: 0.8rem !important;
}

</style>
