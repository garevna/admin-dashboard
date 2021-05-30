<template>
  <v-container>
    <v-card flat class="transparent mx-auto" v-if="!showServices">

      <v-row justify="center" class="mb-4">
        <h5><small>{{ address }}</small></h5>
      </v-row>

      <v-simple-table class="my-7">
        <template v-slot:default>
          <thead>
            <tr>
              <th></th>
              <th class="text-left">
                Service name
              </th>
              <th class="text-center">
                Service status
              </th>
              <th class="text-center">
                Status modified
              </th>
              <th class="text-center">
                Selected lots
              </th>
              <th class="text-center">
                Installation date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item of schema"
              :key="item.serviceId"
            >
              <td>
                <v-btn icon @click="disconnect(item)">
                  <v-icon color="primary">mdi-delete</v-icon>
                </v-btn>
              </td>
              <td>{{ item.serviceName }}</td>
              <td width="140">
                <v-btn
                  text
                  small
                  color="primary"
                  @click="changeStatus(item)"
                  :disabled="disable(item)"
                >
                  {{ item.serviceStatus }}
                </v-btn>
              </td>
              <td width="140">{{ item.serviceStatusModified }}</td>
              <td width="220">
                <li v-if="item.lots && item.lots.length === 2">
                  {{ item.lots[0].date }} <small>({{ item.lots[0].period.toUpperCase() }})</small>
                </li>
                <li v-if="item.lots && item.lots.length === 2">
                  {{ item.lots[1].date }} <small>({{ item.lots[1].period.toUpperCase() }})</small>
                </li>
              </td>
              <td width="160">
                <p v-if="item.installation && item.installation.date">
                  <small style="color: #900"><b>{{ item.installation.date }}({{ item.installation.period.toUpperCase() }})</b></small>
                </p>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-row class="mt-12 mb-4" v-if="!showSelect">
        <v-btn outlined color="buttons" class="mr-2" @click="selectService">
          Assign new service
        </v-btn>
        <v-spacer />
        <v-btn dark class="buttons" @click="updateCustomerServices" v-if="showSubmitButton">
          Update/save details
        </v-btn>
      </v-row>
    </v-card>

    <!-- <Services v-else :opened.sync="showServices" /> -->
    <!-- <ServiceDeliveryUpdate
      v-if="dialog"
      :dialog.sync="dialog"
      :serviceData.sync="selected"
      :address="address"
      :customerId="customerId"
    /> -->

    <!-- <v-row class="mt-12 mb-4">
      <LotSelection
        v-if="showSelect"
        :dialog.sync="showSelect"
        :serviceData.sync="selected"
        :address="address"
        :customerId="customerId"
      />
    </v-row> -->
  </v-container>
</template>

<script>

import { serviceHandler, showServiceSelectHandler } from '@/helpers'
// import { Services } from '@/components/dashboard'

const showError = function () {
  this.$root.$emit('open-error-popup', {
    errorType: 'Assign service to customer',
    errorMessage: 'Attempt to duplicate service'
  })
}

export default {
  name: 'CustomerServices',

  components: {
    // Services
    // LotSelection: () => import(/* webpackChunkName: 'lot-selection' */ '@/components/schedule/LotSelection.vue'),
    // ServiceDeliveryUpdate: () => import(/* webpackChunkName: 'service-delivery-update' */ '@/components/customers/ServiceDeliveryUpdate.vue')
  },

  props: ['services', 'address', 'update', 'customerId'],

  data: () => ({
    customerServices: [],
    schema: [],
    details: {},
    showServices: false,
    dialog: false,
    showSelect: false,
    selected: null,
    submit: false,
    showSubmitButton: false
  }),

  watch: {
    selected: {
      deep: true,
      handler (service) {
        console.log('SERVICE DATA UPDATED:\n', service)
        const index = this.schema.findIndex(item => item.serviceId === service.serviceId)
        this.schema.splice(index, 1, Object.assign({}, this.schema[index], {
          serviceStatus: service.serviceStatus,
          serviceStatusModified: service.serviceStatusModified,
          lots: service.lots,
          installation: service.installation
        }))
        Object.assign(this.customerServices[index], {
          status: service.serviceStatus,
          modified: service.serviceStatusModified,
          lots: service.lots,
          installation: service.installation
        })
        this.showSubmitButton = true
      }
    },
    showServices (newVal, oldVal) {
      if (oldVal && !newVal) {
        if (!serviceHandler()) return
        this.assignNewService()
      }
    }
  },

  methods: {
    showError: showError,
    disable (item) {
      return item.modified || !(item.serviceStatus === 'Awaiting for scheduling' || item.serviceStatus === 'Not connected')
    },

    getServiceDetails (data) {
      console.log('SERVICE DETAILS RECEIVED')
      const { serviceName, _id: serviceId } = data

      const service = this.services.find(item => item.id === serviceId)

      if (!service) return
      this.schema.push({
        serviceId,
        serviceName,
        serviceStatus: service.status,
        serviceStatusModified: new Date(service.modified).toISOString().slice(0, 10),
        lots: service.lots,
        installation: service.installation
      })
    },

    assignNewService () {
      const {
        serviceId,
        serviceName,
        serviceSpeed,
        servicePlan,
        serviceTerm
      } = serviceHandler()

      if (this.services.find(service => service.id === serviceId)) return this.showError()

      this.customerServices.push({
        id: serviceId,
        modified: Date.now(),
        status: 'Not connected',
        log: {
          [Date.now()]: 'Not connected'
        },
        lots: [],
        installation: {}
      })

      this.schema.push({
        serviceId,
        serviceStatusModified: (new Date()).toISOString().slice(0, 10),
        serviceName,
        serviceSpeed,
        serviceStatus: 'Not connected',
        servicePlan,
        serviceTerm,
        modified: true,
        lots: [],
        installation: {}
      })

      this.showSubmitButton = true
    },

    selectService () {
      showServiceSelectHandler('set')
      this.showServices = true
    },

    disconnect (service) {
      console.log('disconnect', service)
    },

    changeStatus (item) {
      if (item.serviceStatus === 'Not connected') this.sendActivationRequest(item)
      if (item.serviceStatus === 'Awaiting for scheduling') this.selectLots(item)
    },

    selectLots (item) {
      this.selectedService = this.customerServices.find(service => service.id === item.serviceId)
      this.selected = item
      this.showSelect = true
    },

    sendActivationRequest (item) {
      this.selectedService = this.customerServices.find(service => service.id === item.serviceId)
      this.selected = item
      this.dialog = true
    },

    updateCustomerServices () {
      this.__updateCustomerServices(this.customerId, this.customerServices)
      this.schema.forEach((item) => { item.modified = false })
      this.showSubmitButton = false
    }
  },

  beforeDestroy () {
    this.$root.$off('service-details-received', this.getServiceDetails)
    this.$root.$off('customer-created', this.close)
  },

  mounted () {
    this.customerServices = this.services.map(item => ({
      id: item.id,
      status: item.status,
      modified: item.modified,
      log: item.log,
      lots: item.lots,
      installation: item.installation
    }))

    this.$emit('update:services', this.customerServices)

    this.$root.$on('service-details-received', this.getServiceDetails)
    this.$root.$on('service-selected', this.assignNewService)
    for (const service of this.services) {
      if (service.name) {
        delete service.name
      }
      this.__getServiceById(service.id)
    }
  }
}

</script>

<style>
.theme--light.v-btn.v-btn--disabled {
  color: #888 !important;
}
.schedule-slot {
  border: solid 1px #999;
  padding: 4px;
  border-radius: 4px;
  list-style-type: none;
  text-align: center;
}
</style>

<style scoped>
td {
  text-align: center;
}
small {
  font-size: 70%;
}
</style>
