<template>
  <v-container class="scroll-y" id="customers-list">
    <!-- <v-row v-if="!edit && !show" justify="center"> -->
    <v-row v-if="!edit && !show" justify="center">
      <v-card flat class="transparent pb-12 px-12" v-if="ready">
        <v-card-title>
          <CustomersFilters
            :filter.sync="filter"
            :refresh.sync="refresh"
            :hardRefresh.sync="hardRefresh"
            :partnerCustomers="partner"
          />
          <v-btn
            v-if="showDeleteSelectedbutton"
            outlined
            color="primary"
            @click="removeSelectedCustomers"
          >
            Delete selected customers
          </v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="customers"
          :options.sync="options"
          :server-items-length="totalCustomers"
          :loading="loading"
          :search="search"
          :height="tableHeight"
          v-model="selected"
          show-expand
          show-select
          single-expand
          :expanded.sync="expanded"
          @item-expanded="getCustomerDetails"
          @click:row="showItem"
          :footer-props="{
            showFirstLastPage: true,
            itemsPerPageOptions: [10, 20, 50, 100, 500],
            firstIcon: 'mdi-skip-previous',
            lastIcon: 'mdi-skip-next',
            prevIcon: 'mdi-chevron-left',
            nextIcon: 'mdi-chevron-right'
          }"
        >

        <!-- <v-data-table
          v-model="selected"
          :headers="headers"
          :items="customers"
          :search="search"
          :page.sync="page"
          :height="tableHeight"
          @click:row="showItem"
          fixed-header
          :footer-props="{
            showFirstLastPage: true,
            itemsPerPage: rowsPerPage,
            itemsPerPageOptions: [10, 20, 50, 100, -1],
            firstIcon: 'mdi-skip-previous',
            lastIcon: 'mdi-skip-next',
            prevIcon: 'mdi-chevron-left',
            nextIcon: 'mdi-chevron-right'
          }"
          @pagination="pagination"
          :items-per-page.sync="rowsPerPage"
          show-expand
          show-select
          single-expand
          :expanded.sync="expanded"
          @item-expanded="getCustomerDetails"
        > -->
          <template v-slot:footer.prepend>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              dense
              outlined
              hide-details
              style="display: inline-block; max-width: 360px"
            ></v-text-field>
            <span class="mx-4">Total selected customers: {{ totalCustomers }}</span>
          </template>

          <template v-slot:item.actions="{ item }">
              <v-icon small color="primary" @click.stop="deleteCustomer(item)">
                mdi-delete
              </v-icon>
          </template>

          <template v-slot:item.commercial="{ item }">
            <v-icon v-if="item.commercial" color="#09b">
              mdi-alpha-c-box-outline
            </v-icon>
            <v-icon v-else color="primary">
              mdi-alpha-r-box-outline
            </v-icon>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="pa-4">
              <v-toolbar flat class="transparent">
                <CustomerServices :customerId="item.id" />
                <v-spacer />
                <v-icon color="#09b" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
              </v-toolbar>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-row>

    <v-row v-else justify="center">
      <ShowCustomerDetails
        v-if="customerReady && show"
        :dialog.sync="show"
        :customerId="selectedCustomerId"
        :customerUpdated.sync="customerUpdated"
      />
      <EditCustomer
        v-if="customerReady && edit"
        :dialog.sync="edit"
        :customerId="selectedCustomerId"
      />
    </v-row>
  </v-container>
</template>

<script>

import {
  customerHandler,
  // estimatesHandler,
  customerFiltersHandler
} from '@/helpers/data-handlers'

// import { partnerDetailsHandler } from '@/controllers'
import { customerController } from '@/components/customers/import/controllers'

export default {
  name: 'CustomersList',

  props: ['details', 'partner'],

  components: {
    ShowCustomerDetails: () => import('@/components/customers/ShowCustomerDetails.vue'),
    EditCustomer: () => import('@/components/customers/EditCustomer.vue'),
    CustomerServices: () => import('@/components/customers/CustomerServices.vue'),
    CustomersFilters: () => import('@/components/customers/CustomersFilters.vue')
  },

  data: () => ({
    customers: [],
    totalCustomers: 0,

    icons: null,

    options: {},
    filter: customerFiltersHandler(),

    customerUpdated: false,
    ready: false,
    show: false,
    edit: false,
    search: '',

    selectedCustomerId: null,
    customerServices: null,
    customerReady: false,

    expanded: [],
    selected: [],

    refresh: false,
    hardRefresh: false,

    loading: false,

    headers: [
      { text: 'Actions', value: 'actions', sortable: false },
      { text: 'Created', value: 'customerCreationDate' },
      { text: 'Type', value: 'commercial' },
      { text: 'Unique code', value: 'uniqueCode' },
      { text: 'Address', value: 'address' },
      { text: 'Customer name', align: 'start', sortable: false, value: 'name' },
      { text: 'Services', value: 'data-table-expand' }
    ]
  }),

  computed: {
    showDeleteSelectedbutton () {
      return Boolean(this.selected.length)
    },

    tableHeight () {
      return window.innerHeight - 400
    }
  },

  watch: {
    options: {
      deep: true,
      handler () {
        this.loading || this.sendRequest()
      }
    },

    filter (data) {
      customerFiltersHandler(data)
      Object.assign(this.options, { page: 1 })
      this.loading || this.sendRequest()
    },

    refresh (val) {
      if (!val) return
      this.__refreshCustomersWithPagination(this.refreshed)
      this.refresh = false
    },

    hardRefresh (val) {
      if (!val) return
      this.ready = false
      this.__hardCustomersRefresh(this.refreshed)
      this.hardRefresh = false
    },

    show (newVal, oldVal) {
      this.expanded = []
      if (oldVal && !newVal) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    },

    edit (newVal, oldVal) {
      if (oldVal && !newVal) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        this.filter = customerFiltersHandler()
      }
    },

    customers: {
      deep: true,
      handler () {
        this.expanded = []
      }
    }
  },

  methods: {
    // refreshUpdatedCustomers () {
    //   this.__refreshUpdatedCustomers(this.getUpdatedCustomers)
    //   setTimeout(this.refreshUpdatedCustomers, 60000)
    // },

    // getUpdatedCustomers (data) {
    //   console.log('UPDATED:\n', data)
    // },

    removeSelectedCustomers () {
      this.__deleteGroupOfCustomers(this.selected.map(item => item.id), this.selectedCustomersRemoved)
      this.$nextTick(() => { this.selected = [] })
    },

    selectedCustomersRemoved (result) {
      const { remoteErrors /*, localErrors */, success } = result
      for (const id of success) {
        const index = this.customers.findIndex(customer => customer.id === id)
        if (index !== -1) this.customers.splice(index, 1)
      }
      if (remoteErrors) {
        this.$root.$emit('open-errors-panel', { errorList: remoteErrors, title: 'Customers not removed' })
      }
    },

    getCustomersList (data) {
      const { customers, total: totalCustomers } = data
      Object.assign(this, { customers, totalCustomers, loading: false, ready: true })
    },

    getCustomerIndex (customerDetails) {
      return this.customers.findIndex(customer => customer.id === (customerDetails.id || customerDetails._id))
    },

    getCustomerDetails ({ item, value }) {
      if (!value) return
      customerController.setIndex(this.getCustomerIndex(item))
      this.__getCustomerData(item.id, this.receiveCustomerData)
    },

    receiveCustomerData (data) {
      customerController.setCustomer(this.getCustomerIndex(data), data)
      this.customerReady = true
    },

    refreshed (data) {
      this.loading || this.sendRequest()
    },

    // getEstimates (data) {
    //   const estimates = Array.isArray(data.result) ? data.result.map(item => ({ [item.id]: item.estimatedServiceDeliveryTime })) : []
    //   estimatesHandler(estimates)
    // },

    showItem (item) {
      this.expanded = []
      this.selectedCustomerId = item.id
      customerHandler(item.id)
      this.show = true
    },

    editItem (item) {
      customerFiltersHandler(this.filter)
      this.selectedCustomerId = item.id
      customerHandler(item.id)
      this.getCustomerDetails({ item, value: true })
      customerController.setPartner({ id: item.resellerId })
      this.selectedCustomerId = item.id
      this.edit = true
      this.expanded = []
    },

    sendRequest () {
      if (this.loading) return
      const { page = 1, itemsPerPage = 10 } = this.options
      this.loading = true
      this.__getFilteredAndPaginated(this.filter, page, itemsPerPage, this.getCustomersList)
    },

    updatesCallback (data) {
      if (data?.length) this.sendRequest()
    },

    deleteCustomer (customer) {
      this.selectedCustomerId = customer.id
      this.$root.$emit('open-confirmation-popup', {
        title: `${customer.appartmentNumber || ''}${customer.appartmentNumber ? '/' : ''}${customer.address}`,
        message: `Do you really want to delete customer ${customer.uniqueCode}?`
      })
    },

    confirmationReceived (data) {
      if (this.selectedCustomerId) this.__deleteCustomer(this.selectedCustomerId, this.customerDeleted)
    },

    customerDeleted (response) {
      if (!response) return
      const index = this.customers.findIndex(item => item.id === this.selectedCustomerId)
      index !== -1 && this.customers.splice(index, 1)
      this.selectedCustomerId = undefined
    },

    updateCustomers () {
      const customerIndex = customerController.getIndex()
      const customerData = customerController.getValue()
      this.customers.splice(customerIndex, 1, customerData)
    }
  },

  created () {
    this.__getFilteredAndPaginated(null, 1, 10, this.getCustomersList)
  },

  beforeDestroy () {
    this.$root.$emit('close-errors-panel')
    this.$root.$off('customer-updated', this.updateCustomers)
    this.$root.$off('customers-updated', this.sendRequest)
    this.$root.$off('customers-updates-received', this.updatesCallback)
  },

  mounted () {
    this.$root.$on('customer-updated', this.updateCustomers)
    this.$root.$on('customers-updated', this.sendRequest)
    this.$root.$on('customers-updates-received', this.updatesCallback)
    this.$root.$on('operation-confirmed', this.confirmationReceived)
    this.$vuetify.goTo(0)
  }
}
</script>

<style>
.theme--light.v-data-table {
  background: #fbfbfb;
}
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: #f5f5f5;
}
</style>
