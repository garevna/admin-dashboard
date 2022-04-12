<template>
  <v-card flat class="transparent" v-if="ready">
    <table class="my-5">
      <thead>
        <tr>
          <th class="text-center px-2">Service type</th>
          <th class="text-center px-2">Product type</th>
          <th class="text-center px-2">Service name</th>
          <th class="text-center px-2">Subscription fee</th>
          <th class="text-center px-2">Service status</th>
          <th class="text-center px-2">Activation date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) of services" :key="service.id">
          <td class="text-center px-2" style="border: solid 1px #ddd; padding: 4px 12px">
            {{ service.serviceType }}
          </td>

          <td class="text-center px-2" style="border: solid 1px #ddd; padding: 4px 12px">
            {{ service.productType }}
          </td>

          <td class="text-center px-2" style="border: solid 1px #ddd; padding: 4px 12px">
            {{ service.serviceName }}
          </td>

          <td class="text-center px-2" style="border: solid 1px #ddd; padding: 4px 12px">
            {{ service.subscriptionFee }}
          </td>

          <td class="text-center px-2" style="border: solid 1px #ddd; padding: 4px 12px">
            <v-icon :color="getIcon(service.status).color" small class="mr-1">
              {{ getIcon(service.status).icon }}
            </v-icon>
            <span :style="getStyle(service)" @click="editConnectionData(index)">{{ service.status }}</span>
          </td>

          <td class="text-center px-2" style="border: solid 1px #ddd; padding: 4px 12px">
            {{ service.activationDate || '' }}
          </td>
        </tr>
      </tbody>
    </table>
    <ConnectionDataForActivation
      v-if="opened"
      :opened.sync="opened"
      :data.sync="service.connectionData"
      :submitted.sync="submitted"
    />
  </v-card>
</template>

<script>

import { serviceIconColors } from '@/configs/serviceIconColors'
import { accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'CustomerServices',

  components: {
    ConnectionDataForActivation: () => import('@/components/schedule/ConnectionDataForActivation.vue')
  },

  props: ['customerId', 'services'],

  data: () => ({
    ready: false,
    opened: false,
    submitted: false,
    service: null,
    icons: null,
    accessRights: accessRightsHandler().access.services
  }),

  watch: {
    submitted (val) {
      if (val && this.accessRights === 2) {
        this.save()
        this.submitted = false
      }
    }
  },

  methods: {
    getIcons (data) {
      this.icons = data
      this.ready = true
    },

    getIcon (status) {
      if (!this.icons) return null
      return { icon: this.icons[status], color: serviceIconColors[status] }
    },

    getStyle (item) {
      const [border, cursor, padding, borderRadius] = item.status === 'Active'
        ? ['solid 1px #900', 'pointer', '4px 8px', '4px']
        : ['none', 'text', '0', '0']
      return { border, cursor, padding, borderRadius }
    },

    editConnectionData (index) {
      if (this.services[index].status !== 'Active') return
      this.service = this.services[index]
      this.opened = true
    },

    save () {
      this.__patchCustomer(this.customerId, { services: this.services }, this.catchResponse)
    },

    catchResponse (data) {
      // console.log('RESPONSE:\n', data)
    }
  },

  created () {
    this.__getServiceStatusIcons(this.getIcons)
  }
}
</script>
