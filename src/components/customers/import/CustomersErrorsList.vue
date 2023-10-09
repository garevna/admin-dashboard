<template>
  <v-expansion-panels flat accordion>
    <v-expansion-panel>
      <v-expansion-panel-header style="border: solid 1px #ddd; border-radius: 4px; padding: 0 0 0 16px">
        <table>
          <tr>
            <td width="48">
              <v-icon small :color="color">
                {{ icon }}
              </v-icon>
            </td>
            <td>
              <b :style="{ color, textAlign: 'left' }">
                {{ title }} ({{ items.length }})
              </b>
            </td>
          </tr>
        </table>
      </v-expansion-panel-header>
      <v-expansion-panel-content style="padding-left: 16px !important">
        <v-expansion-panels flat focusable accordion v-for="(address, index) of filterAddressList()" :key="index">
          <v-expansion-panel>
            <v-expansion-panel-header expand-icon="mdi-menu-down">
              <small :style="{ color: '#555', marginRight: '16px' }">
                {{ address }}
              </small>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <li v-for="(item, num) of filterErrors(address)" :key="num">
                <span :style="{ color: '#777', marginRight: '16px' }">
                  {{ item }}
                </span>
              </li>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>

import {
  fatalErrorsController,
  errorsController,
  warningsController
} from '@/components/customers/import/controllers'

export default {
  name: 'CustomersErrorsList',

  props: ['title', 'type'],

  data: () => ({
    controller: null,
    items: []
  }),

  computed: {
    color () {
      return this.type === 'fatal' ? '#d00'
        : this.type === 'error' ? '#900' : '#f50'
    },
    icon () {
      return this.type === 'fatal' ? 'mdi-bell-alert'
        : this.type === 'error' ? 'mdi-alert-outline' : 'mdi-message-alert'
    }
  },

  methods: {
    filterAddressList () {
      return this.items.length ? Array.from(new Set(this.items.map(item => item.address))) : []
    },

    filterErrors (address) {
      return this.items
        .filter(item => item.address === address)
        .map(item => item.error || item.warning)
    },

    refresh (data) {
      this.items = data
    }
  },

  beforeDestroy () {
    this.$root.$off('fatal-errors-updated', this.refresh)
    this.$root.$off('errors-updated', this.refresh)
    this.$root.$off('warnings-updated', this.refresh)
  },

  mounted () {
    if (this.type === 'fatal-errors') {
      this.controller = fatalErrorsController
      this.$root.$on('fatal-errors-updated', this.refresh)
    }
    if (this.type === 'errors') {
      this.controller = errorsController
      this.$root.$on('errors-updated', this.refresh)
    }
    if (this.type === 'warnings') {
      this.controller = warningsController
      this.$root.$on('warnings-updated', this.refresh)
    }

    this.items = this.controller.get()
  }
}
</script>
