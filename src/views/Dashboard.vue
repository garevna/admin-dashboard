<template>
  <v-container>
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

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-content>
            <v-list-item-title @click="$router.push({ name: item.route })" class="clickable" active-class="active-list-item">
              {{ item.title }}
            </v-list-item-title>
            <v-list dense v-if="item.children">
              <v-list-item
                v-for="subitem in item.children"
                :key="subitem.title"
                active-class="active-list-item"
              >
                <v-list-item-icon>
                  <v-icon>mdi-file-table-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title @click="$router.push({ name: subitem.route })" class="clickable">
                    {{ subitem.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list-item-content>
        </v-list-item>
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

console.log(mainDashboard)

export default {
  name: 'Dashboard',
  components: {
    //
  },
  data: () => ({
    items: mainDashboard
  }),
  methods: {
    //
  },
  mounted () {
    console.log(roleHandler())
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
</style>
