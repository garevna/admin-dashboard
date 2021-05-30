<template>
  <v-container>
    <v-row v-if="!edit" justify="center">
      <v-card flat class="transparent pb-12 px-12" v-if="ready">
        <!-- <v-card-title>
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
                    :items="speeds"
                    v-model="speed"
                    label="Service speed"
                    outlined
                    clearable
                    dense
                    color="primary"
                    style="width: 180px"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    :items="plans"
                    v-model="plan"
                    label="Plan"
                    outlined
                    clearable
                    dense
                    color="primary"
                    style="width: 120px"
                  ></v-select>
                </td>
                <td>
                  <v-select
                    :items="postalCodes"
                    v-model="postCode"
                    label="Post code"
                    outlined
                    clearable
                    dense
                    color="primary"
                    style="width: 140px"
                  ></v-select>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-title> -->

        <v-data-table
          ref="customersList"
          :headers="headers"
          :items="filteredItems"
          :search="search"
          :page.sync="page"
          :height="tableHeight"
          fixed-header
        >
          <template v-slot:item.serviceStatus="{ item }">
            <v-icon :color="getIcon(item.serviceStatus).color" small class="mr-1">
              {{ getIcon(item.serviceStatus).icon }}
            </v-icon>
            <span @click="editItem(item)" style="cursor: pointer">
              {{ item.serviceStatus }}
            </span>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn outlined @click="editItem(item)" dark class="primary">Edit</v-btn>
          </template>
        </v-data-table>

        <div style="margin-top: -48px">
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

          <span class="ml-12"><small>Total selected customers: {{ selectedCustomersNumber }}</small></span>
        </div>
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
  // serviceHandler,
  customersListPageNumberHandler
} from '@/helpers/data-handlers'

export default {
  name: 'CustomersList',

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
    speed: null,
    plan: null,
    postCode: null,

    statuses: ['Active', 'Awaiting for connection', 'Awaiting for confirmation', 'Awaiting for scheduling', 'In job queue', 'Unable to connect', 'Not connected'],
    speeds: ['50/50', '150/150', '250/250', '500/500', '1000/1000'],
    headers: [
      {
        text: 'Customer name',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Unique code', value: 'uniqueCode' },
      { text: 'Address', value: 'address' },
      { text: 'Services', value: 'services' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),

  computed: {
    tableHeight () {
      return window.innerHeight - 360
    },
    customers () {
      if (!this.data) return

      const getServicesText = function (services) {
        let result = ''
        for (const service of services) {
          result += `${service.name}: ${service.status}\n`
        }
        return result
      }

      return this.data.map(customer => ({
        name: customer.name,
        uniqueCode: customer.uniqueCode,
        postCode: customer.postCode,
        address: customer.address,
        services: getServicesText(customer.services),
        id: customer._id
      }))
    },
    postalCodes () {
      const set = new Set(this.customers.map(customer => customer.postCode))
      return Array.from(set)
    },
    // plans () {
    //   const set = new Set(this.customers.map(customer => customer.servicePlan).filter(item => item))
    //   return Array.from(set)
    // },
    selectedCustomersNumber () {
      return this.filteredItems.length
    },
    filteredItems () {
      if (!this.status && !this.speed && !this.postCode && !this.plan) return this.customers
      return this.customers
        .filter(customer => !this.status || (customer.serviceStatus === this.status))
        .filter(customer => !this.speed || (customer.serviceSpeed === this.speed))
        .filter(customer => !this.postCode || (customer.postCode === this.postCode))
        .filter(customer => !this.plan || (customer.servicePlan === this.plan))
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
        Active: '#999',
        'Awaiting for connection': '#999',
        'Awaiting for confirmation': '#999',
        'Awaiting confirmation': '#999',
        'Awaiting for scheduling': 'primary',
        'In job queue': '#999',
        'Unable to connect': '#777',
        'Not connected': '#f00'
      }
      return { icon: icons[status], color: colors[status] }
    },
    async getData (data) {
      console.log(data)
      this.data = Array.isArray(data) ? data : Array.isArray(data.result) ? data.result : []
      this.ready = true
    },

    getEstimates (data) {
      const estimates = Array.isArray(data.result) ? data.result.map(item => ({ [item.id]: item.estimatedServiceDeliveryTime })) : []
      estimatesHandler(estimates)
    },

    editItem (item) {
      this.selectedCustomerId = item.id
      customerHandler(item.id)
      this.edit = true
    }

    // updateCustomerServices (data) {
    //   const {
    //     _id,
    //     services,
    //     serviceSpeed,
    //     serviceStatus,
    //     servicePlan,
    //     serviceTerm
    //   } = data
    //
    //   const index = this.customers.findIndex(customer => customer.id === _id)
    //   if (index === -1) return
    //   this.customers.splice(index, 1, Object.assign(this.customers[index], {
    //     services,
    //     serviceSpeed,
    //     serviceStatus,
    //     servicePlan,
    //     serviceTerm
    //   }))
    // }
  },

  beforeDestroy () {
    this.$root.$off('customers-list-received', this.getData)
    this.$root.$off('buildings-data-list', this.getEstimates)
    // this.$root.$off('customer-services-updated', this.updateCustomerServices)
  },

  created () {
    // this.$root.$on('buildings-data-list', this.getEstimates)
    // this.__getBuildingsByStatus('lit')
    // this.__getBuildingsByStatus('footprint')
    // this.__getBuildingsByStatus('build')
    // this.__getBuildingsByStatus('soon')
  },

  mounted () {
    console.log(this.ready, this.edit)

    this.$root.$on('customers-list-received', this.getData)
    // this.$root.$on('customer-services-updated', this.updateCustomerServices)
    this.__getCustomers()
  }
}
</script>

<style scoped>
</style>
