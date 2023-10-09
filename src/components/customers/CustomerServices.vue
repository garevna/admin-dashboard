<template>
  <v-card flat class="transparent" v-if="ready">
    <table class="my-5">
      <thead>
        <tr>
          <th class="text-center px-2">Service type</th>
          <th class="text-center px-2">Product type</th>
          <th class="text-center px-2">Service name</th>
          <th class="text-center px-2">Subscription fee</th>
          <th class="text-center px-2">Discount</th>
          <th class="text-center px-2">Service status</th>
          <th class="text-center px-2">Activation date</th>
          <th class="text-center px-2">Cancelation date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(service, index) of services"
          :key="service.id"
          @click="editDetails(index)"
          :class="index === serviceIndex ? 'selected-table-row' : 'clicked-table-row'"
        >
          <td class="td-bordered text-center px-2">
            {{ service.serviceType }}
          </td>

          <td class="td-bordered text-center px-2">
            {{ service.productType }}
          </td>

          <td class="td-bordered text-center px-2">
            {{ service.serviceName }}
          </td>

          <td class="td-bordered text-center px-2">
            {{ service.subscriptionFee }}
          </td>

          <td class="td-bordered text-center px-2">
            {{ getPrefix(service) }}{{ getDiscount(service) }}{{ getSuffix(service) }}
          </td>

          <td class="td-bordered text-center px-2">
            <v-icon :color="getIcon(service.status).color" small class="mr-1">
              {{ getIcon(service.status).icon }}
            </v-icon>
            <span>{{ service.status }}</span>
          </td>

          <td class="td-bordered text-center px-2">
            {{ service.activationDate || '' }}
          </td>

          <td class="td-bordered text-center px-2">
            {{ service.canceledDate || '' }}
          </td>
        </tr>
      </tbody>
    </table>

    <v-row v-if="serviceIndex !== -1" justify="center">
      <v-col cols="6">
        <EditCustomerDiscountInfo
          :customerIndex="customerIndex"
          :serviceIndex="serviceIndex"
        />
      </v-col>
      <v-col cols="6">
        <EditCustomerServiceConnectionInfo
          :serviceIndex="serviceIndex"
          :customerId="customerId"
        />
      </v-col>
    </v-row>
    <v-row v-if="serviceIndex !== -1" justify="center" class="mb-8">
      <v-btn small dark color="primary" @click="save"> Save </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { serviceIconColors } from '@/configs/serviceIconColors'
import { accessRightsHandler, roleHandler } from '@/controllers/data-handlers'
import { customerController } from '@/components/customers/import/controllers'
import EditCustomerDiscountInfo from '@/components/customers/EditCustomerDiscountInfo.vue'
import EditCustomerServiceConnectionInfo from '@/components/customers/import/EditCustomerServiceConnectionInfo.vue'

const [defaultIcon, defaultColor] = ['mdi-crosshairs-question', '#888']

export default {
  name: 'CustomerServices',

  components: {
    EditCustomerDiscountInfo,
    EditCustomerServiceConnectionInfo
  },

  props: ['customerId'],

  data: () => ({
    services: null,
    ready: false,
    opened: false,
    submitted: false,
    service: null,
    serviceIndex: -1,
    customerIndex: null,
    icons: null,
    accessRights: accessRightsHandler().access[roleHandler()].services
  }),

  watch: {
    customerId (val) {
      this.serviceIndex = -1
    },

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
    },

    getServicesInfo () {
      this.customerIndex = customerController.getIndex()
      this.services = customerController.getServices()
      this.ready = true
    },

    getIcon (status) {
      if (!this.icons || !status) return { icon: defaultIcon, color: defaultColor }
      return { icon: this.icons[status] || defaultIcon, color: serviceIconColors[status] || defaultColor }
    },

    getPrefix (service) {
      return service.discount
        ? service.discount.units === 'sum' ? '$' : ''
        : ''
    },

    getSuffix (service) {
      return service.discount
        ? service.discount.units === 'percent' ? '%' : ''
        : ''
    },

    getDiscount (service) {
      return service.discount ? service.discount.value : 0
    },

    editDetails (index) {
      this.serviceIndex = -1
      customerController.setServiceIndex(index)
      this.service = customerController.getServicesToSave()
      this.$nextTick(() => { this.serviceIndex = index })
    },

    save () {
      this.__patchCustomer(this.customerId, { services: customerController.getServicesToSave() }, this.catchResponse)
    },

    catchResponse (data) {
      this.serviceIndex = -1
    }
  },

  created () {
    this.__getServiceStatusIcons(this.getIcons)
    this.services = customerController.getValue().services
  },

  mounted () {
    this.$root.$on('customer-services-updated', this.getServicesInfo)
  },

  beforeDestroy () {
    this.$root.$off('customer-services-updated', this.getServicesInfo)
  }
}
</script>

<style scoped>

.td-bordered {
  border: solid 1px #ddd;
  padding: 4px 12px;
}

.clicked-table-row {
  cursor: pointer;
}

.clicked-table-row:hover {
  background-color: #bbb7;
}

.selected-table-row {
  background: #ddd;
  color: #900;
}
</style>
