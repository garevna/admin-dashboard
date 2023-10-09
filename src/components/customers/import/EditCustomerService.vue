<template>
  <v-container>
    <EditCustomerServiceDetails :serviceIndex="serviceIndex" />

    <EditCustomerDiscountInfo :serviceIndex="serviceIndex" />

    <EditCustomerServiceConnectionInfo :serviceIndex="serviceIndex" />
  </v-container>
</template>

<script>

import { accessRightsHandler } from '@/controllers/data-handlers'
import {
  customerController,
  fatalErrorsController,
  errorsController
} from '@/components/customers/import/controllers'

export default {
  name: 'EditCustomerService',

  components: {
    EditCustomerServiceDetails: () => import('@/components/customers/EditCustomerServiceDetails.vue'),
    EditCustomerDiscountInfo: () => import('@/components/customers/EditCustomerDiscountInfo.vue'),
    EditCustomerServiceConnectionInfo: () => import('@/components/customers/import/EditCustomerServiceConnectionInfo.vue')
  },

  props: ['serviceIndex'],

  data: () => ({
    index: customerController.getIndex(),
    service: customerController.getCurrentService(),
    serviceName: customerController.getCurrentServiceName(),
    serviceStatusList: [],
    ready: false,
    list: [],
    accessRights: accessRightsHandler().access.services,
    fatalError: false,
    dateError: false,
    showDiscount: false,
    dateTitle: '',
    datePropName: ''
  }),

  methods: {
    setService () {
      this.ready = false
      this.service = customerController.getCurrentService()
      this.serviceName = this.service?.id ? customerController.getServiceNameById(this.service.id) : ''
      this.$nextTick(() => { this.ready = true })
    },

    getStatusList (data) {
      this.serviceStatusList = data
    },

    updateService (service) {
      customerController.updateService(service.id, service.name)
      customerController.getServiceName()
    },

    refreshFatalError () {
      this.fatalError = fatalErrorsController.getServiceError(this.index)
    },

    refreshErrors () {
      this.dateError = errorsController.getError(this.index, 'activationDate') ||
        errorsController.getError(this.index, 'suspendDate') ||
        errorsController.getError(this.index, 'suspendedDate') ||
        errorsController.getError(this.index, 'cancelDate') ||
        errorsController.getError(this.index, 'canceledDate')
    },

    update (propName, propValue) {
      customerController.updateConnectionData(propName, propValue)
      this.setService()
    }
  },

  created () {
    this.__getAvailableServiceStatus(this.getStatusList)
    this.setService()

    if (this.service.activationDate && !this.service.discount) {
      customerController.initDiscount()
      // customerController.update('discount', {
      //   units: 'sum',
      //   value: 0,
      //   period: [Date.parse(this.service.activationDate), null]
      // })
    }

    this.list = customerController.getPartnerServices()
    this.showDiscount = Boolean(this.service.activationDate)
  },

  mounted () {
    this.refreshFatalError()
    this.refreshErrors()

    this.$root.$on('fatal-errors-updated', this.refreshFatalError)
    this.$root.$on('errors-updated', this.refreshErrors)
    this.$root.$on('customer-details-updated', this.setService)
  },

  beforeDestroy () {
    this.$root.$off('fatal-errors-updated', this.refreshFatalError)
    this.$root.$off('errors-updated', this.refreshErrors)
    this.$root.$off('customer-details-updated', this.setService)
  }
}
</script>

<style scoped>
table {
  width: 100%;
  margin-bottom: 48px;
}
tr {
  margin-bottom: 32px;
}
td {
  font-size: 14px;
  padding: 4px 12px;
}
.bordered {
  /* border: solid 1px #ddd; */
}

.theme--light.v-application .text--primary {
  color: #900!important;
}

.invalid-value {
  color: #d00;
  text-align: center;
}

.warning-value {
  color: #fa0;
  text-align: right;
}

.invalid-value:before {
  content: '\26A0 ';
  color: #d00;
}

.warning-value:before {
  content: '\26A0 ';
  color: #fa0;
}

#service-autocomplete-container {
  position: relative;
}
#service-autocomplete-container > .v-autocomplete__content.v-menu__content {
  position: relative !important;
  top: 204px !important;
  left: 616px !important;
  max-height: 280px !important;
}
</style>
