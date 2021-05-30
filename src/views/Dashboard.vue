<template>
  <v-container class="mt-12">
    <v-navigation-drawer
      app
      permanent
      left
    >
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Dashboard</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon small>{{ item.icon }}</v-icon> <small> {{ item.title }} </small>
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            class="clickable"
            :disabled="$route.name === child.route"
            @click="jumpTo(child)"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon small>{{ child.icon }}</v-icon>
                <small>{{ child.title }}</small>
              </v-list-item-title>
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
import { mainDashboard } from '@/configs'

export default {
  name: 'Dashboard',
  components: {
    //
  },
  data: () => ({
    items: mainDashboard
  }),
  methods: {
    // pageOfCustomersReceived (data) {
    //   console.log('CUSTOMERS: PAGE 1 RECEIVED\n', data)
    // },
    jumpTo (item) {
      if (this.$route.name === item.route) return
      item.route && this.$router.push({ name: item.route })
    }
  },

  beforeDestroy () {
    // this.$root.$off('page-of-customers-received', this.pageOfCustomersReceived)
  },

  mounted () {
    // this.$root.$on('page-of-customers-received', this.pageOfCustomersReceived)
    // this.__getCustomersByPageNumber(1)

    this.__updateScheduleLots()

    if (!roleHandler()) this.$router.push({ name: 'home' })
    this.__refreshServices()
  }
}
</script>

<style>
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
