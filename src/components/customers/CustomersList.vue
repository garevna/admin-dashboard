<template>
  <v-container class="scroll-y">
    <v-row v-if="!edit" justify="center">
      <v-card flat class="transparent pb-12 px-12" v-if="ready">
        <v-card-title>
          <CustomersFilters
            :serviceName.sync="serviceName"
            :type.sync="serviceType"
            :status.sync="status"
            :refresh.sync="refresh"
            :hardRefresh.sync="hardRefresh"
          />
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          :page.sync="page"
          :height="tableHeight"
          @click:row="editItem"
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
          single-expand
          :expanded.sync="expanded"
          @item-expanded="getCustomerServices"
        >
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
            <span class="mx-4">Total selected customers: {{ selectedCustomersNumber }}</span>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" v-if="item.services.length" class="pa-4">
              <CustomerServices
                v-if="showCustomerServices"
                :customerId="expanded[0].id"
                :services="customerServices"
              />
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-row>

    <v-row v-else justify="center">
      <ShowCustomerDetails
        :dialog.sync="edit"
        :customerId="selectedCustomerId"
        :customerUpdated.sync="customerUpdated"
      />
    </v-row>
  </v-container>
</template>

<script>

import {
  customerHandler,
  estimatesHandler,
  customersListPageNumberHandler
} from '@/helpers/data-handlers'

import { partnerDetailsHandler } from '@/controllers'

export default {
  name: 'CustomersList',

  props: ['details', 'partner'],

  components: {
    // ConnectionDataForActivation: () => import('@/components/schedule/ConnectionDataForActivation.vue'),
    CustomerServices: () => import('@/components/customers/CustomerServices.vue'),
    CustomersFilters: () => import('@/components/customers/CustomersFilters.vue'),
    ShowCustomerDetails: () => import('@/components/customers/ShowCustomerDetails.vue')
    // CustomerDetails: () => import('@/components/customers/CustomerDetails.vue')
  },

  data: () => ({
    customers: null,
    customerUpdated: false,
    ready: false,
    icons: null,
    edit: false,
    selectedCustomerId: null,
    data: null,
    search: '',
    page: customersListPageNumberHandler(),

    status: null,
    serviceName: '',
    serviceType: undefined,
    refresh: false,
    hardRefresh: false,

    expanded: [],
    customerServices: null,
    showCustomerServices: false,
    selectedService: null,
    showConnectionData: false,
    connectionDataUpdateSubmitted: false,

    headers: [
      { text: 'Created', value: 'customerCreationDate' },
      { text: 'Unique code', value: 'uniqueCode' },
      { text: 'Address', value: 'address' },
      { text: 'Customer name', align: 'start', sortable: false, value: 'name' },
      { text: 'Services', value: 'data-table-expand' }
    ],

    rowsPerPage: 10
  }),

  watch: {
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

    edit (newVal, oldVal) {
      if (oldVal && !newVal) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    },

    connectionDataUpdateSubmitted (val) {
      if (val) {
        this.connectionDataUpdateSubmitted = false
      }
    }
  },

  computed: {
    tableHeight () {
      return window.innerHeight - 400
    },

    selectedCustomersNumber () {
      return this.filteredItems.length
    },

    filteredItems () {
      if (!this.status && !this.type && !this.serviceName) return this.customers
      return this.customers
        .filter(customer => !this.status || (customer.services.filter(service => service.status === this.status).length))
        .filter(customer => !this.serviceType || (customer.services.filter(service => service.type === this.serviceType)).length)
        .filter(customer => !this.serviceName || (customer.services.filter(service => service.name === this.serviceName)).length)
    }
  },

  methods: {
    pagination (options) {
      this.tablePage = options.page
      this.tablePages = options.pageCount
    },

    refreshUpdatedCustomers () {
      this.__refreshUpdatedCustomers(this.getUpdatedCustomers)
      setTimeout(this.refreshUpdatedCustomers, 40000)
    },

    getUpdatedCustomers (data) {
      //
    },

    getCustomersList (data) {
      this.customers = data
      this.ready = true
    },

    getCustomerServices ({ item, value }) {
      this.showCustomerServices = value
      if (!value) return
      value && this.__getCustomerServices(item.id, this.receiveCustomerServices)
    },

    receiveCustomerServices (data) {
      this.customerServices = data
      this.showCustomerServices = true
    },

    getData (data) {
      this.data = Array.isArray(data) ? data : Array.isArray(data.result) ? data.result : []
      this.ready = true
    },

    refreshed (data) {
      // !this.details ? this.__getCustomers(this.getData) : this.__getCustomersByResellerId(this.details._id, this.getData)
      this.sendRequest()
    },

    getEstimates (data) {
      const estimates = Array.isArray(data.result) ? data.result.map(item => ({ [item.id]: item.estimatedServiceDeliveryTime })) : []
      estimatesHandler(estimates)
    },

    editItem (item) {
      this.selectedCustomerId = item.id
      customerHandler(item.id)
      this.edit = true
    },

    sendRequest () {
      !this.partner ? this.__getCustomers(this.getCustomersList) : this.__getCustomersByResellerId(partnerDetailsHandler()._id, this.getCustomersList)
    },

    updatesCallback (data) {
      if (Array.isArray(data) && data.length) {
        this.ready = false
        this.sendRequest()
      }
    }
  },

  created () {
    this.sendRequest()
  },

  beforeDestroy () {
    this.$root.$off('customers-updated', this.sendRequest)
    this.$root.$off('customers-updates-received', this.updatesCallback)
  },

  mounted () {
    this.$root.$on('customers-updated', this.sendRequest)
    this.$root.$on('customers-updates-received', this.updatesCallback)
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
