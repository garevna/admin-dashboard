<template>
  <!-- <v-container style="max-height: 520px; max-width: 1440px; min-width: 960px; padding: 32px 32px 80px 32px !important; overflow-y: auto"> -->
  <v-container style="max-height: 520px; overflow-y: auto">
    <Fieldset :legend="serviceName">
      <table width="100%" class="my-5 mx-auto">
        <thead>
          <tr>
            <th :class="fatalError ? 'invalid-value' : 'text-center px-2'" width="240">
              Service name
            </th>
            <th class="text-center px-2" width="240">
              Service status
            </th>
            <th
              :class="dateError ? 'invalid-value' : 'text-center px-2'"
              width="180"
            >
              {{ dateTitle }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              class="bordered"
              :style="{ color: service.id ? '#09b' : '#d00' }"
            >
              <div id="service-autocomplete-container">
                <v-autocomplete
                  attach="#service-autocomplete-container"
                  v-model="serviceName"
                  :items="list"
                  item-text="name"
                  return-object
                  outlined
                  dense
                  hide-details
                  label="Start to enter service name"
                  @change="updateService"
                />
              </div>
            </td>

            <td class="bordered text-center px-2">
              <DropDownMenu
                :items="serviceStatusList"
                :selected.sync="service.status"
                toolBarColor="#bbb"
              />
            </td>

            <td v-if="dateTitle" class="bordered text-center px-2">
              <!-- <DatePicker :title="dateTitle" :date.sync="service[datePropName]" /> -->
              <DatePicker v-if="service.status === 'Active'" :title="dateTitle" :date.sync="activationDate" />
              <DatePicker v-if="service.status === 'Awaiting to be suspended'" :title="dateTitle" :date.sync="suspendDate" />
              <DatePicker v-if="service.status === 'Suspended'" :title="dateTitle" :date.sync="suspendedDate" />
              <DatePicker v-if="service.status === 'Awaiting for cancelation'" :title="dateTitle" :date.sync="cancelDate" />
              <DatePicker v-if="service.status === 'Canceled'" :title="dateTitle" :date.sync="canceledDate" />
            </td>
          </tr>
        </tbody>
      </table>
    </Fieldset>
    <EditCustomerDiscountInfo
      v-if="activationDate"
      :serviceIndex="serviceIndex"
      :customerIndex="index"
    />
    <EditCustomerServiceConnectionInfo :index="index" :serviceIndex="serviceIndex" />
  </v-container>
</template>

<script>

import { accessRightsHandler } from '@/controllers/data-handlers'
import {
  customerController,
  fatalErrorsController,
  errorsController
} from '@/components/customers/import/controllers'

import Fieldset from '@/components/Fieldset.vue'

import DatePicker from '@/components/inputs/DatePicker.vue'
import DropDownMenu from '@/components/inputs/DropDownMenu.vue'
import EditCustomerDiscountInfo from '@/components/customers/EditCustomerDiscountInfo.vue'
import EditCustomerServiceConnectionInfo from '@/components/customers/import/EditCustomerServiceConnectionInfo.vue'

export default {
  name: 'EditCustomerServiceDetails',

  components: {
    Fieldset,
    DatePicker,
    DropDownMenu,
    EditCustomerDiscountInfo,
    EditCustomerServiceConnectionInfo
  },

  props: ['serviceIndex', 'updated'],

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

  computed: {
    activationDate: {
      get () {
        return this.service?.activationDate
      },
      set (value) {
        this.showDiscount = false
        customerController.updateServiceActivationDate(value)
        this.dateError = errorsController.getError(this.index, 'activationDate')
        customerController.initDiscount()
        this.$nextTick(() => { this.showDiscount = Boolean(value) })
      }
    },
    suspendDate: {
      get () {
        return this.service?.suspendDate
      },
      set (value) {
        customerController.updateServiceSuspendDate(value)
        this.dateError = errorsController.getError(this.index, 'suspendDate')
      }
    },
    suspendedDate: {
      get () {
        return this.service?.suspendedDate
      },
      set (value) {
        customerController.updateServiceSuspendedDate(value)
        this.dateError = errorsController.getError(this.index, 'suspendedDate')
      }
    },
    cancelDate: {
      get () {
        return this.service?.cancelDate
      },
      set (value) {
        customerController.updateServiceCancelDate(value)
        this.dateError = errorsController.getError(this.index, 'cancelDate')
      }
    },
    canceledDate: {
      get () {
        return this.service?.canceledDate
      },
      set (value) {
        customerController.updateServiceCanceledDate(value)
        this.dateError = errorsController.getError(this.index, 'canceledDate')
      }
    }
  },

  watch: {
    'service.status': {
      immediate: true,
      handler (val) {
        customerController.changeServiceStatus(val)
        this.dateTitle = customerController.getStatusDateTitle()
        this.datePropName = customerController.getStatusDatePropName()
        this.dateError = errorsController.getServiceDateError(this.index)
      }
    },

    serviceIndex (val) {
      this.service = customerController.getCurrentService()
      this.serviceName = this.service.serviceName
    }
  },

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
      this.$emit('update:updated', true)
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

    if (this.service.activationDate && !this.service.discount) customerController.initDiscount()

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

.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: transparent !important;
  box-shadow: none !important;
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
