<template>
  <v-dialog v-model="dialog" max-width="1440">
    <v-card flat style="overflow-y: hidden!important; overflow-x: hidden!important">
      <v-toolbar flat class="transparent">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          fixed-tabs
          active-class="active-tab-style"
          hide-slider
          show-arrows
        >
          <v-tab> Customer details </v-tab>
          <v-tab> Services </v-tab>
        </v-tabs>
        <v-spacer />
        <v-icon large @click="$emit('update:dialog', false)">
          mdi-close
        </v-icon>
      </v-toolbar>

      <v-card flat class="transparent pa-8" height="640">
        <v-tabs-items v-model="tab">
          <v-tab-item class="pt-5">
            <EditCustomerDetails :index="customerIndex" />
          </v-tab-item>
          <v-tab-item class="pt-5">
            <v-row align="start" justify="start">
              <v-col cols="3">
                <v-tabs
                  v-model="serviceTab"
                  background-color="transparent"
                  vertical
                  active-class="active-tab-style"
                >
                  <v-tab v-for="(service, index) of services" :key="index">
                    {{ service.serviceName }}
                  </v-tab>
                </v-tabs>
              </v-col>
              <v-col cols="9">
                <v-tabs-items v-model="serviceTab" style="height: 520px; overflow-y: auto">
                  <v-card flat class="transparent mx-auto">
                    <EditCustomerServiceDetails :serviceIndex="serviceTab" />
                  </v-card>
                  <!-- <v-card flat class="transparent mx-auto">
                    <EditCustomerServiceConnectionInfo :serviceIndex="serviceTab" />
                  </v-card> -->
                </v-tabs-items>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <v-row justify="center">
        <v-btn dark color="primary" @click="updateCustomer" class="mb-12">
          Update customer
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>

import {
  customerController,
  fatalErrorsController,
  errorsController,
  warningsController
} from '@/components/customers/import/controllers'

export default {
  name: 'EditCustomer',

  props: ['customerId', 'dialog'],

  components: {
    EditCustomerDetails: () => import('@/components/customers/import/EditCustomerDetails.vue'),
    EditCustomerServiceDetails: () => import('@/components/customers/import/EditCustomerServiceDetails.vue')
    // EditCustomerServiceConnectionInfo: () => import('@/components/customers/import/EditCustomerServiceConnectionInfo.vue')
  },

  data: () => ({
    ready: false,
    tab: 0,
    serviceTab: 0,
    customer: null,
    customerIndex: 0,
    services: [],
    customers: [],
    fatalErrors: 0,
    errors: 0,
    warnings: 0
  }),

  watch: {
    customerId: {
      immediate: true,
      handler (id) {
        this.customer = customerController.getCustomerDetailsToSave()
        this.services = customerController.services
        customerController.setServiceIndex(0)
        this.tab = 0
        this.ready = true
      }
    },

    serviceTab (val) {
      customerController.setServiceIndex(val)
    }
  },

  methods: {
    getCustomerDetails () {
      this.customer = customerController.getValue()
      this.services = customerController.services
      customerController.setServiceIndex(0)
      this.tab = 0
      this.ready = true
    },

    updateCustomer () {
      const result = Object.assign({}, customerController.getCustomerDetailsToSave(), {
        services: customerController.getCustomerServicesToSave()
      })

      this.__patchCustomer(this.customerId, result, this.showResponse)
    },

    showResponse (response) {
      console.log(response)
    },

    getServiceNameById (serviceId) {
      return customerController.getServiceNameById(serviceId)
    },

    refreshFatalErrors () {
      this.fatalErrors = fatalErrorsController.length()
    },

    refreshErrors () {
      this.errors = errorsController.length()
    },

    refreshWarnings () {
      this.warnings = warningsController.length()
    }
  },

  beforeMount () {
    this.getCustomerDetails()
    this.fatalErrors = fatalErrorsController.length()
    this.errors = errorsController.length()
    this.warnings = warningsController.length()
  },

  mounted () {
    this.$vuetify.goTo(0)

    this.$root.$on('fatal-errors-updated', this.refreshFatalErrors)
    this.$root.$on('errors-updated', this.refreshErrors)
    this.$root.$on('warnings-updated', this.refreshWarnings)
  },

  beforeDestroy () {
    this.$root.$off('fatal-errors-updated', this.refreshFatalErrors)
    this.$root.$off('errors-updated', this.refreshErrors)
    this.$root.$off('warnings-updated', this.refreshWarnings)
  }
}
</script>

<style scoped>
.active-tab-style {
  border: solid 1px #900;
  background: #900;
  color: #fee;
  border-radius: 4px;
  margin-top: 24px;
  font-weight: bold;
}
</style>
