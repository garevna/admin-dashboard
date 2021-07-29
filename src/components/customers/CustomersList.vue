<template>
  <v-container class="scroll-y">
    <v-row v-if="!edit" justify="center">
      <v-card flat class="transparent pb-12 px-12" v-if="ready">
        <v-card-title>
          <table>
            <tbody>
              <tr>
                <td>
                  <v-select
                    :items="statuses"
                    v-model="status"
                    label="Service status"
                    outlined
                    clearable
                    dense
                    color="primary"
                    style="width: 270px"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    :items="types"
                    v-model="type"
                    label="Service type"
                    outlined
                    clearable
                    dense
                    color="primary"
                    style="width: 180px"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    :items="services"
                    v-model="serviceName"
                    label="Services"
                    outlined
                    clearable
                    dense
                    color="primary"
                    style="width: 240px"
                  ></v-select>
                </td>
              </tr>
            </tbody>
          </table>
          <v-spacer />
          <v-btn text @click="refresh" class="mr-12 mb-5">
            <v-icon>mdi-refresh</v-icon>
            Refresh
          </v-btn>
        </v-card-title>

        <v-data-table
          ref="customersList"
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
    CustomerDetails: () => import('@/components/customers/CustomerDetails.vue')
  },

  data: () => ({
    ready: false,
    edit: false,
    selectedCustomerId: null,
    data: null,
    search: '',
    page: customersListPageNumberHandler(),
    status: null,
    type: null,
    serviceName: '',

    expanded: [],

    statuses: ['Active', 'Awaiting for connection', 'Awaiting for confirmation', 'Awaiting for scheduling', 'In job queue', 'Unable to connect', 'Not connected'],
    types: ['residential', 'commercial'],
    headers: [
      { text: 'Unique code', value: 'uniqueCode' },
      { text: 'Address', value: 'address' },
      { text: 'Customer name', align: 'start', sortable: false, value: 'name' },
      { text: 'Services', value: 'data-table-expand' }
    ]
  }),

  computed: {
    tableHeight () {
      return window.innerHeight - 400
    },

    customers () {
      if (!this.data) return

      return this.data.map(customer => ({
        name: customer.name,
        uniqueCode: customer.uniqueCode,
        postCode: customer.postCode,
        address: customer.address,
        services: customer.services,
        id: customer._id
      }))
    },

    selectedCustomersNumber () {
      return this.filteredItems.length
    },

    services () {
      return Array.from(new Set(this.customers.flatMap(customer => customer.services.map(service => service.name))))
    },

    filteredItems () {
      if (!this.status && !this.type && !this.serviceName) return this.customers
      return this.customers
        .filter(customer => !this.status || (customer.services.filter(service => service.status === this.status).length))
        .filter(customer => !this.type || (customer.services.filter(service => service.type === this.type)).length)
        .filter(customer => !this.serviceName || (customer.services.filter(service => service.name === this.serviceName)).length)
    }
  },

  watch: {
    edit (newVal, oldVal) {
      if (oldVal && !newVal) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    }
  },

  methods: {
    getIcon (status) {
      const icons = {
        Active: 'mdi-check-network-outline',
        'Awaiting for connection': 'mdi-calendar-question',
        'Awaiting for confirmation': 'mdi-calendar-clock',
        'Awaiting confirmation': 'mdi-calendar-clock',
        'Awaiting for scheduling': 'mdi-calendar-question',
        'In job queue': 'mdi-calendar-check',
        'Unable to connect': 'mdi-minus-network',
        'Not connected': 'mdi-alert'
      }
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
      return { icon: icons[status], color: colors[status] }
    },

    async getData (data) {
      this.data = Array.isArray(data) ? data : Array.isArray(data.result) ? data.result : []
      this.ready = true
    },

    async refreshed (data) {
      !this.details ? this.__getCustomers() : this.__getCustomersByResellerId(this.details._id)
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

    refresh () {
      this.ready = false
      this.__refreshCustomers()
    }
  },

  beforeDestroy () {
    this.$root.$off('customers-list-received', this.getData)
    this.$root.$off('customers-refreshed', this.getData)
  },

  mounted () {
    this.$vuetify.goTo(0)

    this.$root.$on('customers-list-received', this.getData)
    this.$root.$on('customers-refreshed', this.refreshed)
    !this.details ? this.__getCustomers() : this.__getCustomersByResellerId(this.details._id)
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
