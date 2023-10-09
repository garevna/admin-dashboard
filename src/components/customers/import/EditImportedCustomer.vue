<template>
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

    <v-card flat class="transparent pt-12" height="640">
      <v-tabs-items v-model="tab">
        <v-tab-item class="pt-5">
          <EditCustomerDetails :index="index" />
        </v-tab-item>
        <v-tab-item class="pt-5">
          <v-row align="start" justify="start">
            <v-col cols="4" style="background: #ddd; min-height: 640px">
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

            <v-col cols="8">
              <v-tabs-items v-model="serviceTab">
                <v-card flat class="transparent mx-auto">
                  <EditCustomerServiceDetails :serviceIndex="serviceTab" :updated.sync="serviceUpdated" />
                </v-card>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>

<script>

import {
  customerController
  // fatalErrorsController,
  // errorsController,
  // warningsController
} from '@/components/customers/import/controllers'

export default {
  name: 'EditImportedCustomer',

  components: {
    EditCustomerDetails: () => import('@/components/customers/import/EditCustomerDetails.vue'),
    EditCustomerServiceDetails: () => import('@/components/customers/import/EditCustomerServiceDetails.vue')
  },

  props: ['customerId', 'index'],

  data: () => ({
    tab: 0,
    serviceTab: 0,
    serviceUpdated: false,
    customer: null,
    services: null
  }),

  watch: {
    serviceUpdated (val) {
      if (val) {
        // console.log(customerController.serviceIndex, customerController.serviceName)
      }
    },

    customerId: {
      immediate: true,
      handler (id) {
        this.customer = customerController.getCustomerDetailsToSave()
        this.services = customerController.services
        customerController.setServiceIndex(0)
        this.tab = 0
        this.serviceTab = 0
        this.ready = true
      }
    },

    serviceTab (val) {
      customerController.setServiceIndex(val)
    }
  }
}
</script>

<style scoped>
.active-tab-style {
  border: solid 1px #999 !important;
  border-radius: 4px;
  background: #777;
  color: #fee;
  /* margin-top: 16px; */
  font-weight: bold;
}
</style>
