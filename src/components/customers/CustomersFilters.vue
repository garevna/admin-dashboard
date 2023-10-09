<template>
  <v-card flat class="transparent">
    <table>
      <tbody>
        <tr>
          <td>
            <SelectServiceStatus :status.sync="serviceStatus" />
          </td>
          <td>
            <SelectPartner v-if="!partnerCustomers" :partnerId.sync="partnerId" />
          </td>
          <td>
            <SelectType :type.sync="type" />
          </td>
          <td>
            <SearchService :serviceId.sync="serviceId" :type="type" :partnerId="partnerId" />
          </td>
          <td>
            <MonthPicker :month.sync="serviceActivationMonth" />
          </td>
        </tr>
      </tbody>
    </table>
    <v-spacer />
    <v-btn text @click="$emit('update:refresh', true)" class="mb-5">
      <v-icon>mdi-refresh</v-icon>
      Refresh
    </v-btn>
    <v-btn icon @click="$emit('update:hardRefresh', true)" class="mb-5">
      <v-icon>mdi-database-refresh</v-icon>
    </v-btn>
  </v-card>
</template>

<script>

import { partnerDetailsHandler } from '@/controllers'
import { customerFiltersHandler } from '@/helpers/data-handlers'

export default {
  name: 'CustomersFilters',

  components: {
    MonthPicker: () => import('@/components/inputs/MonthPicker.vue'),
    SelectServiceStatus: () => import('@/components/inputs/SelectServiceStatus.vue'),
    SelectType: () => import('@/components/inputs/SelectType.vue'),
    SearchService: () => import('@/components/inputs/SearchService.vue'),
    SelectPartner: () => import('@/components/inputs/SelectPartner.vue')
  },

  props: ['filter', 'refresh', 'hardRefresh', 'partnerCustomers'],

  data: () => ({
    serviceId: null,
    partnerId: null,
    serviceStatus: '',
    type: '',
    serviceActivationMonth: ''
  }),

  watch: {
    serviceActivationMonth (value) {
      this.updateFilter('serviceActivationMonth', value)
    },

    serviceStatus (value) {
      this.updateFilter('serviceStatus', value)
    },

    type (value) {
      this.updateFilter('type', value)
    },

    partnerId (value) {
      this.updateFilter('partnerId', value)
    },

    serviceId (value) {
      this.updateFilter('serviceId', value)
    }
  },

  methods: {
    createFilter () {
      const filter = {}
      ;['partnerId', 'serviceId', 'type', 'serviceStatus', 'serviceActivationMonth']
        .forEach(key => this[key] && Object.assign(filter, { [key]: this[key] }))

      this.$emit('update:filter', filter)

      return filter
    },

    updateFilter (key, value) {
      const filter = this.__clone(this.filter)
      if (!value) delete filter[key]
      else Object.assign(filter, { [key]: value })

      this.$emit('update:filter', filter)
    }
  },

  beforeMount () {
    const { partnerId, serviceId, serviceStatus, serviceActivationMonth, type } = customerFiltersHandler()
    Object.assign(this, { partnerId, serviceId, serviceStatus, serviceActivationMonth, type })
  },

  mounted () {
    if (this.partnerCustomers) {
      const { _id: id, company } = partnerDetailsHandler()
      this.partner = { id, name: company.name }
    }
  }
}
</script>
