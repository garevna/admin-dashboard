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
          :items-per-page="10"
          single-expand
          :expanded.sync="expanded"
          show-expand
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
              style="display: inline-block; width: 280px"
            ></v-text-field>
            <span class="ml-12">Total selected customers: {{ selectedCustomersNumber }}</span>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" v-if="item.services.length" class="pa-4">
              <table>
                <thead>
                  <tr>
                    <th>Service type</th>
                    <th>Service name</th>
                    <th>Service status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(service, index) of item.services" :key="index">
                    <td style="border: solid 1px #ddd; padding: 0 8px">
                      <small>{{ service.type }}</small>
                    </td>
                    <td style="border: solid 1px #ddd; padding: 0 8px">
                      <small>{{ service.name }}</small>
                    </td>
                    <td style="border: solid 1px #ddd; padding: 0 8px">
                      <v-icon :color="getIcon(service.status).color" small class="mr-1">
                        {{ getIcon(service.status).icon }}
                      </v-icon>
                      <small>{{ service.status }}</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-row>

    <v-row v-else justify="center">
      <CustomerDetails
        :dialog.sync="edit"
        :customerId="selectedCustomerId"
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

export default {
  name: 'CustomersList',

  props: ['details'],

  components: {
    CustomersFilters: () => import('@/components/customers/CustomersFilters.vue'),
    CustomerDetails: () => import('@/components/customers/CustomerDetails.vue')
  },

  data: () => ({
    customers: null,
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

    headers: [
      { text: 'Created', value: 'customerCreationDate' },
      { text: 'Unique code', value: 'uniqueCode' },
      { text: 'Address', value: 'address' },
      { text: 'Customer name', align: 'start', sortable: false, value: 'name' },
      { text: 'Services', value: 'data-table-expand' }
    ]
  }),

  watch: {
    refresh (val) {
      if (!val) return
      this.ready = false
      this.__refreshCustomers(this.refreshed)
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
    getCustomersList (data) {
      console.log(data)
      this.customers = data
      this.ready = true
    },
    getIcon (status) {
      const colors = {
        Active: '#090',
        'Awaiting for connection': 'primary',
        'Awaiting for confirmation': 'primary',
        'Awaiting confirmation': 'primary',
        'Awaiting for scheduling': '#999',
        'In job queue': 'primary',
        'Unable to connect': '#777',
        'Not connected': '#f00'
      }
      return { icon: this.icons[status], color: colors[status] }
    },

    getData (data) {
      this.data = Array.isArray(data) ? data : Array.isArray(data.result) ? data.result : []
      this.ready = true
    },

    refreshed (data) {
      // !this.details ? this.__getCustomers(this.getData) : this.__getCustomersByResellerId(this.details._id, this.getData)
      this.sendRequest()
    },

    getIcons (data) {
      console.log(data)
      this.icons = data
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
      !this.details ? this.__getCustomers(this.getCustomersList) : this.__getCustomersByResellerId(this.details._id, this.getCustomersList)
    }
  },

  created () {
    this.__getServiceStatusIcons(this.getIcons)
    console.log('DETAILS ???\n', this.details)
    this.sendRequest()
  },

  mounted () {
    this.$root.$on('customers-updated', this.sendRequest)
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
/* .v-data-footer__select {
  visibility: hidden;
} */
</style>
