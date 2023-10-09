<template>
  <v-card flat class="transparent mx-auto mb-4" width="1440">
    <v-row justify="center">
      <v-card flat class="transparent pb-12 px-12 mt-8 mb-12" min-width="1280">
        <v-data-table
          :headers="headers"
          :items="localCustomers"
          item-key="index"
          :search="search"
          :page.sync="page"
          fixed-header
          :footer-props="{
            itemsPerPage: rowsPerPage,
            itemsPerPageOptions: [10, 20, 50, 100, -1],
          }"
          @pagination="pagination"
          :items-per-page.sync="rowsPerPage"
          single-expand
          :expanded.sync="expanded"
          @item-expanded="setCustomer"
          @click:row="expandItem"
          style="background: transparent !important"
        >
          <template v-slot:item.actions="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="#004"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="cloneCustomer(item)"
                >
                  <v-icon small color="#004">
                    mdi-layers-plus
                  </v-icon>
                </v-btn>
              </template>
              <span>Clone customer</span>
            </v-tooltip>

            <v-btn icon @click.stop="removeCustomer(item)">
              <v-icon small color="primary">
                mdi-delete
              </v-icon>
            </v-btn>
            <v-icon :color="item.commercial ? '#f50' : '#09b'" class="ml-4">
              {{ getIcon(item) }}
            </v-icon>
          </template>

          <template v-slot:item.customerName="{ item }">
            {{ getCustomerName(item) }}
          </template>

          <template v-slot:item.partnerName="{ item }">
            {{ getPartnerName(item) }}
          </template>

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
            />
            <span class="mx-4">Total customers: {{ selectedCustomersNumber }}</span>

            <div class="ml-10 mr-4">
              <v-icon small color="#d00"> mdi-bell-alert </v-icon>
              {{ fatalErrors }}
            </div>
            <div class="mx-4">
              <v-icon small color="#900"> mdi-alert-outline </v-icon>
              {{ errors }}
            </div>
            <div class="mx-4">
              <v-icon small color="#f50"> mdi-message-alert </v-icon>
              {{ warnings }}
            </div>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="pa-4">
              <EditImportedCustomer
                :partnerId="resellerId"
                :index="item.index"
              />
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-card>
</template>

<script>

import {
  customerController,
  fatalErrorsController,
  errorsController,
  warningsController
} from '@/components/customers/import/controllers'

import { customersListPageNumberHandler } from '@/helpers/data-handlers'

export default {
  name: 'ImportedCustomersList',

  props: ['customers', 'partnerId', 'partnerUniqueCode', 'partners'],

  components: {
    EditImportedCustomer: () => import('@/components/customers/import/EditImportedCustomer.vue')
  },

  data: () => ({
    ready: false,
    fatalErrors: 0,
    errors: 0,
    warnings: 0,
    search: '',
    page: customersListPageNumberHandler(),
    expanded: [],
    headers: [
      { text: 'Actions', value: 'actions', sortable: false, width: 120 },
      { text: 'Created', value: 'customerCreationDate', width: 80 },
      { text: 'Unique code', value: 'uniqueCode', width: 120 },
      { text: 'Building address', value: 'address', width: 240 },
      { text: 'Customer name', align: 'start', sortable: false, value: 'customerName', width: 120 }
      // { text: 'Service', value: 'serviceName', width: 160 }
    ],
    rowsPerPage: 10
  }),

  computed: {
    selectedCustomersNumber () {
      return this.customers.length
    },

    localCustomers: {
      get () {
        return this.customers.map((customer, index) => Object.assign({}, customer, {
          index,
          serviceName: customer.services[0].id
            ? this.getServiceNameById(customer.services[0].id)
            : ''
        }))
      }
    },

    resellerId () {
      return this.expanded[0] ? this.expanded[0].resellerId : null
    }
  },

  methods: {
    getPartnerName (item) {
      const partner = this.partners
        ? this.partners.find(partner => partner.id === item.resellerId)
        : null
      return partner?.name
    },

    getIcon (item) {
      return item.commercial ? 'mdi-alpha-c-box-outline' : 'mdi-alpha-r-box-outline'
    },

    getCustomerName (item) {
      return `${item.firstName} ${item.lastName}`
    },

    getServiceNameById (serviceId) {
      return customerController.getServiceNameById(serviceId)
    },

    pagination (options) {
      this.tablePage = options.page
      this.tablePages = options.pageCount
    },

    refreshFatalErrors () {
      this.fatalErrors = fatalErrorsController.length()
    },

    refreshErrors () {
      this.errors = errorsController.length()
    },

    refreshWarnings () {
      this.warnings = warningsController.length()
    },

    setCustomer ({ item, value }) {
      customerController.setCustomer(item.index, item)
      customerController.setServiceIndex(0)
      this.setPartner(item)
    },

    cloneCustomer (item) {
      this.expanded = []
      this.customers.push(Object.assign(item, { index: this.customers.length }))
    },

    removeCustomer (item) {
      this.customers.splice(item.index, 1)
    },

    setPartner (item) {
      if (this.partners) {
        const partner = this.partners.find(partner => partner.id === item.resellerId)
        if (partner) {
          Object.assign(item, { partnerName: partner.name })
          customerController.setPartner(partner)
          customerController.setPartnerServices(partner.services)
        }
      }
    },

    expandItem (item, params) {
      const test = !this.expanded[0] || this.expanded[0].index !== item.index
      this.expanded = []

      test && this.$nextTick(() => {
        this.setPartner(item)
        params.expand(item)
      })
    }
  },

  beforeMount () {
    this.fatalErrors = fatalErrorsController.length()
    this.errors = errorsController.length()
    this.warnings = warningsController.length()

    if (this.partners && !this.partnerId) this.headers.push({ text: 'Partner', value: 'partnerName', width: 160 })
    else this.headers.push({ text: 'Service', value: 'serviceName', width: 160 })
  },

  mounted () {
    this.$vuetify.goTo(0)

    if (this.customers.length === 1) this.expanded = [this.customers[0]]

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

<style>

td {
  cursor: pointer !important;
}

</style>
