<template>
  <v-container class="mb-12">
    <v-row justify="center">
      <v-card flat class="transparent pb-12 px-12">
        <v-data-table
          :headers="headers"
          :items="customers"
          :search="search"
          :page.sync="page"
          fixed-header
          :footer-props="{
            itemsPerPage: rowsPerPage,
            itemsPerPageOptions: [10, 20, 50, 100, -1],
          }"
          @pagination="pagination"
          :items-per-page.sync="rowsPerPage"
          show-expand
          single-expand
          :expanded.sync="expanded"
          item-key="uniqueCode"
        >
        <template v-slot:item.commercial="{ item }">
          <v-chip
            :color="item.commercial ? '#900' : '#09b'"
            dark
          >
            {{ item.commercial ? 'C' : 'R' }}
          </v-chip>
        </template>
          <!-- <template v-slot:footer.prepend>
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
          </template> -->

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="pa-4">
              <EditCustomerDetails :customer="item" />
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import { customersListPageNumberHandler } from '@/helpers/data-handlers'

export default {
  name: 'ImportedCustomersList',

  props: ['customers'],

  components: {
    EditCustomerDetails: () => import('@/components/customers/import/EditCustomerDetails.vue')
    // ConnectionDataForActivation: () => import('@/components/schedule/ConnectionDataForActivation.vue'),
    // CustomersFilters: () => import('@/components/customers/CustomersFilters.vue'),
    // CustomerServices: () => import('@/components/customers/CustomerServices.vue')
  },

  data: () => ({
    customerUpdated: false,
    ready: false,
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
      { text: '', value: 'commercial' },
      { text: 'Created', value: 'customerCreationDate' },
      { text: 'Unique code', value: 'uniqueCode' },
      { text: 'Building address', value: 'address' },
      { text: 'First name', align: 'start', sortable: false, value: 'firstName' },
      { text: 'Last name', align: 'start', sortable: false, value: 'lastName' },
      { text: 'Service', value: 'serviceName' },
      { text: 'Edit', value: 'data-table-expand' }
    ],

    rowsPerPage: 10
  }),

  watch: {
    customer: {
      deep: true,
      handler (details) {
        console.log('CUSTOMER DETAILS:\n', details)
      }
    },
    expanded: {
      deep: true,
      handler (data) {
        console.log('EXPANDED:\n', data)
      }
    }
  },

  computed: {
    // tableHeight () {
    //   return window.innerHeight - 400
    // },

    selectedCustomersNumber () {
      return this.customers.length
    }
  },

  methods: {
    rowClickHandler (data, details) {
      console.log(data)
      console.log(details)
    },

    pagination (options) {
      this.tablePage = options.page
      this.tablePages = options.pageCount
    },

    getBuildings (data) {
      this.buildings = data
        .filter(building => !building.addressComponents.isSlave)
        .map(building => ({ address: building.address, id: building.id, uniqueCode: building.uniqueCode }))
    },

    showExpanded (item) {
      console.log(item)
      this.expanded = [item]
      console.log(this.expanded)
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

    updatesCallback (data) {
      if (Array.isArray(data) && data.length) {
        this.ready = false
        this.sendRequest()
      }
    }
  },

  mounted () {
    console.log('CUSTOMERS:\n', this.customers)
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
