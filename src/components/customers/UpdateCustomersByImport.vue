<template>
  <v-container class="pb-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>
        <table width="480">
          <tr>
            <td width="240">
              Pick the text file with customer data
            </td>
            <td width="240">
              <v-file-input
                @change="readFile"
                hide-details
                outlined
                dense
              />
            </td>
          </tr>
        </table>
      </v-toolbar-title>
    </v-toolbar>

    <v-card flat class="transparent mx-auto" max-width="1440" v-if="readyToShow">
      <ImportErrors v-if="showErrors" />
      <ImportedCustomersList
        :customers.sync="customers"
        :partners="partners"
      />

      <v-card-text class="text-center mb-12 pb-12">
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
    </v-card>
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
  name: 'UpdateCustomersByImport',

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

  methods: {
    startTesting () {
      fatalErrorsController.test(this.customers)
      errorsController.test(this.customers)
      warningsController.test(this.customers)

      this.showErrors = Boolean(fatalErrorsController.length() || errorsController.length() || warningsController.length())
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
      customerController.clear()
      this.tab = 0
      this.customers = []
      this.clearErrors()
    },

    getUniqueCode (buildingData, customerAptNumber) {
      const suff = customerAptNumber ? `.${customerAptNumber}` : ''
      return `${this.partner.uniqueCode}.${buildingData.uniqueCode}${suff}`
    },

    readFile (file) {
      this.fileSelectDisabled = true
      this.$root.$dispatchProgressEvent(true)
      this.customers = []

      this.__importCustomerUpdates(file, this.getCustomers)
    },

    getCustomers (result) {
      if (!result) return
      this.customers = result.customers
      this.partners = result.partners
      // Object.assign(this, { customers: customers.map(customer => Object.assign(customer, { uniqueCode: `${this.partner.uniqueCode}.${customer.uniqueCode}` })) })
      // this.updateServices()
      // this.startTesting()
      this.readyToShow = true
    },

    save () {
      // this.$root.$emit('clear-debugger-console', 'save-imported-customers')
      this.customers.forEach(customer => {
        delete customer.index
        delete customer.serviceName
        delete customer.services[0].serviceName
        delete customer.serviceIndex
        delete customer.partnerUniqueCode
      })

      this.__saveCustomers(this.customers, this.customersSaved)
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
    // this.__getResellersShortList(this.getPartners)
  },

  mounted () {
    this.$vuetify.goTo(0)

    this.$root.$on('customer-details-updated', this.updateCustomers)
  },

  beforeDestroy () {
    this.$root.$emit('close-errors-panel')
    customerController.clear()
    this.clearErrors()
    this.$root.$off('customer-details-updated', this.getUpdates)
  }
}
</script>
