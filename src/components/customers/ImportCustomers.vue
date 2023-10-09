<template>
  <v-container class="pb-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <table width="480">
            <tr>
              <td width="80" v-if="!partner">
                <span class="mr-4"> Partner </span>
              </td>
              <td width="360">
                <v-select
                  v-if="!partner"
                  :items="partners"
                  label="Select partner"
                  v-model="partner"
                  item-text="name"
                  return-object
                  outlined
                  hide-details
                />
                <h5 v-else style="color: #fffb">
                  <small>{{ partners.find(rsp => rsp.id === partner.id).name }}</small>
                </h5>
              </td>
            </tr>
          </table>
        </v-toolbar-title>

        <v-tabs
          v-show="!!partner"
          v-model="tab"
          right
        >
          <v-tabs-slider color="#ff7" />

          <v-tab>
            <small> Pick the text file with customer data </small>
          </v-tab>

          <table v-if="tab === 0 && !fileSelectDisabled" class="mx-4">
            <tr>
              <td width="200">
                <v-file-input
                  @change="readFile"
                  hide-details
                  outlined
                  dense
                />
              </td>
            </tr>
          </table>

          <v-tab>
            <small>Add customer manually</small>
          </v-tab>
        </v-tabs>

        <v-btn v-if="!!partner" outlined dark @click="reset" class="ml-4">
          Reset
        </v-btn>
      </v-toolbar>

      <ImportErrors v-if="showErrors" />

      <v-tabs-items v-if="!!partner" v-model="tab">
        <v-tab-item>
          <ImportedCustomersList
            v-if="readyToShow"
            :customers.sync="customers"
            :partnerId="partner.id"
          />
        </v-tab-item>

        <v-tab-item>
          <ImportedCustomersList
            v-if="readyToShow"
            :customers.sync="customers"
            :partnerId="partner.id"
          />
        </v-tab-item>
      </v-tabs-items>

    <v-card-text
      v-if="readyToShow"
      class="text-center mb-12 pb-12"
    >
      <v-btn
        v-if="saveAvailable"
        dark
        class="mr-12"
        color="primary"
        @click="save"
      >
        Save results
      </v-btn>

      <v-btn
        outlined
        class="ml-12"
        color="primary"
        @click="exit"
      >
        Exit
      </v-btn>
    </v-card-text>
  </v-container>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

import {
  customerController,
  fatalErrorsController,
  errorsController,
  warningsController
} from '@/components/customers/import/controllers'

export default {
  name: 'ImportCustomers',

  components: {
    ImportErrors: () => import('@/components/customers/import/ImportErrors.vue'),
    ImportedCustomersList: () => import('@/components/customers/import/ImportedCustomersList.vue')
  },

  data: () => ({
    showErrors: false,
    tab: 0,
    accessRights: accessRightsHandler().access[roleHandler()].customers,

    partners: [],
    partner: null,
    customers: [],

    fileSelectDisabled: true,
    partnerSelectDisabled: false,

    readyToShow: false,
    serverResponseErrors: false,
    errors: []
  }),

  computed: {
    saveAvailable () {
      return !!this.customers?.length && !fatalErrorsController.length() && !errorsController.length() && this.accessRights === 2
    }
  },

  watch: {
    tab (val) {
      this.customers = []
      if (val === 1) {
        customerController.clear()
        customerController.setPartner(this.partner)
        customerController.createEmptyCustomer()
        customerController.setIndex(0)
        customerController.setServiceIndex(0)
        this.customers = [customerController.getValue()]
        this.startTesting()
        this.readyToShow = true
      }
    },

    partner: {
      deep: true,
      handler (data) {
        if (!data) return
        customerController.setPartner(data)
      }
    }
  },

  methods: {
    startTesting () {
      fatalErrorsController.test(this.customers)
      errorsController.test(this.customers)
      warningsController.test(this.customers)

      this.showErrors = Boolean(fatalErrorsController.length() || errorsController.length() || warningsController.length())
    },

    setPartnersReady () {
      this.fileSelectDisabled = false
    },

    updateCustomers (customer) {
      const customers = this.__clone(this.customers)
      customers.splice(customer.index, 1, customer)
      this.customers = customers
    },

    reset () {
      this.serverResponseErrors = false
      this.errors = []
      this.readyToShow = false
      this.partnerSelectDisabled = false
      this.partner = null
      customerController.setPartner(null, '')
      customerController.clear()
      this.tab = 0
      this.customers = []
      this.partnerServices = []
      this.clearErrors()
    },

    getPartners (data) {
      this.partners = data
    },

    getUniqueCode (buildingData, customerAptNumber) {
      const suff = customerAptNumber ? `.${customerAptNumber}` : ''
      return `${this.partner.uniqueCode}.${buildingData.uniqueCode}${suff}`
    },

    readFile (file) {
      this.fileSelectDisabled = true
      this.partnerSelectDisabled = true
      this.$root.$dispatchProgressEvent(true)
      this.customers = []

      this.__importCustomers(file, this.partner.id, this.getCustomers)
    },

    getCustomers (customers) {
      Object.assign(this, { customers: customers.map(customer => Object.assign(customer, { uniqueCode: `${this.partner.uniqueCode}.${customer.uniqueCode}` })) })
      this.updateServices()
      this.startTesting()
      this.readyToShow = true
    },

    updateServices () {
      const partnerServices = customerController.getPartnerServices()

      this.customers.forEach((customer, index) => {
        const service = partnerServices.find(item => item.name === customer.services[0].serviceName)
        Object.assign(customer.services[0], { id: service?.id })
      })
    },

    save () {
      this.$root.$emit('clear-debugger-console', 'save-imported-customers')
      this.customers.forEach(customer => {
        delete customer.index
        delete customer.serviceName
        delete customer.services[0].serviceName
        delete customer.serviceIndex
        delete customer.partnerUniqueCode
        Object.assign(customer, {
          resellerId: this.partner.id
        })
      })

      console.log(this.customers)

      // this.__saveCustomers(this.customers, this.customersSaved)
    },

    customersSaved (response) {
      const { success, remoteErrors, localErrors } = response

      this.reset()
      if (remoteErrors.length) {
        this.serverResponseErrors = true
        this.errors = remoteErrors
      }

      if (success && success.length) {
        this.$root.$emit('open-errors-panel', {
          title: 'Saved customers',
          errorList: success.map(item => `${item} (saved)`)
            .concat(localErrors.map(item => `${item} (local DB error)`))
        })
      }
    },

    clearErrors () {
      fatalErrorsController.clear()
      errorsController.clear()
      warningsController.clear()
    },

    exit (data) {
      this.$router.push({ name: 'customers' })
    }
  },

  created () {
    this.clearErrors()
    this.__getResellersShortList(this.getPartners)
  },

  mounted () {
    this.$vuetify.goTo(0)

    this.$root.$on('customer-details-updated', this.updateCustomers)
    this.$root.$on('partner-services-updated', this.setPartnersReady)
  },

  beforeDestroy () {
    this.$root.$emit('close-errors-panel')
    customerController.clear()
    this.clearErrors()
    this.$root.$off('customer-details-updated', this.getUpdates)
    this.$root.$off('partner-services-updated', this.setPartnersReady)
  }
}
</script>
