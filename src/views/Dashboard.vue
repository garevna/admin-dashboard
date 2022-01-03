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

      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-if="refreshed[item.refresh]">
                <v-icon small>{{ item.icon }}</v-icon> <small> {{ item.title }} </small>
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            class="clickable"
            style="margin-left: 16px!important; margin-top: -16px!important"
            :disabled="$route.name !== 'tickets' ? $route.name === child.route : false"
            @click="jumpTo(child)"
          >
            <v-list-item-content v-if="!child.children">
              <v-list-item-title>
                <v-icon small>{{ child.icon }}</v-icon>
                <small>{{ child.title }}</small>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-content v-else style="margin-left: -32px!important; margin-top: -12px!important; padding-bottom: 0; padding-right: 0">
              <v-list-group sub-group prepend-icon="" style="margin-bottom: 16px!important">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title active-class="active-list-item">
                      <v-icon small>{{ child.icon }}</v-icon>
                      <small>{{ child.title }}</small>
                    </v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="(subChild, i) in child.children"
                  :key="i"
                  @click="jumpTo(subChild)"
                  class="my-0 py-0"
                  active-class="active-list-item"
                  style="min-height: 24px!important; max-height: 32px!important; padding-left: 48px"
                >
                  <v-list-item-title>
                    <v-icon small :color="$route.name === subChild.route ? '#900' : '#777'">{{ subChild.icon }}</v-icon>
                    <small :style="{ color: $route.name === subChild.route ? '#900' : '#777' }">{{ subChild.title }}</small>
                  </v-list-item-title>
                </v-list-item>
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

import { roleHandler } from '@/controllers/data-handlers'

const { mainDashboard } = require('@/configs').default

export default {
  name: 'Dashboard',

  data: () => ({
    items: mainDashboard,
    refreshed: {
      rsp: false,
      footprint: false,
      customers: false,
      tickets: false,
      services: false,
      schedule: false,
      documents: false,
      settings: true
    }
  }),

  methods: {
    setRefreshed (event) {
      this.refreshed[event] = true
    },

    jumpTo (item) {
      if (item.route === 'tickets') {
        if (item.path.indexOf(this.$route.path) !== -1) return
        this.$router.push({ name: item.route, params: item.params }).catch(failure => console.warn('Router failure:\n', failure))
      } else {
        if (this.$route.name === item.route) return
        item.route && this.$router.push({ name: item.route }).catch(failure => console.warn('Router failure:\n', failure))
      }
    },

    refreshTicketCategories (data) {
      //
    }
  },

  beforeDestroy () {
    [
      'footprint-refreshed',
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

  mounted () {
    [
      'footprint-refreshed',
      'rsp-refreshed',
      'customers-refreshed',
      'tickets-refreshed',
      'services-refreshed',
      'schedule-refreshed',
      'documents-refreshed'
    ].forEach((event) => {
      this.$root.$on(event, this.setRefreshed)
    })

    if (!roleHandler()) this.$router.push({ name: 'home' }).catch(failure => console.warn('Router failure:\n', failure))

    this.$root.$on('ticket-categories-updated', this.refreshTicketCategories)
    this.$router.push({ name: 'main-dash' })
  }
}
</script>

<style>

.theme--light.v-time-picker-clock {
  background: transparent;
}

.v-application--is-ltr .v-data-footer__select {
  visibility: hidden;
}

.clickable {
  cursor: pointer;
}
.active-list-item {
  border: dotted 1px #900;
  background: #9007;
}
.v-application--is-ltr .v-list-group--no-action > .v-list-group__items > .v-list-item {
  padding-left: 32px!important;
  min-height: 24px!important;
  max-height: 32px;
}

.v-icon.v-icon {
  margin-right: 8px!important;
}

</style>
