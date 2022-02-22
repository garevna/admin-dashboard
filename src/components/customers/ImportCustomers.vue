<template>
  <v-card flat class="transparent mx-auto" max-width="480" v-if="ready">
    <h5><small>Partner</small></h5>
    <v-select
      :items="partners"
      label="Select partner"
      v-model="partnerId"
      item-text="name"
      item-value="id"
      outlined
      hide-details
      :disabled="partnerSelectDisabled"
    />

    <v-card-text class="text-center">
      <h5><small>Pick the text file with customer data</small></h5>
      <v-file-input :disabled="fileSelectDisabled" @change="readFile" hide-details outlined dense  />
    </v-card-text>

    <v-card-text class="text-center my-12" v-if="readyToShow">
      <v-btn
        v-if="!Object.keys(fatalErrors).length && !Object.keys(errors).length"
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

    <v-card-text class="my-12" v-if="readyToShow">
      <div v-if="show">
        <ImportCustomersErrorsList
          v-if="fatalErrors.length"
          title="Fatal errors:"
          type="fatal"
          :items="fatalErrors"
        />

        <ImportCustomersErrorsList
          v-if="errors.length"
          title="Errors:"
          type="error"
          :items="errors"
        />

        <ImportCustomersErrorsList
          v-if="warnings.length"
          title="Warnings:"
          type="warning"
          :items="warnings"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

const connectionDataFields = {
  Login: {
    PPPOE: 'login_PPPOE',
    IPoE: 'login_IPoE'
  },
  PWD: {
    PPPOE: 'pwd_PPPOE',
    IPoE: 'pwd_IPoE'
  },
  IP: 'IP',
  'Speed In': 'Speed in',
  'Speed Out': 'Speed out',
  'Routed subnet': 'Routed subnet',
  'VLAN DGtek': 'VLAN DGtek',
  'VLAN RSP': 'VLAN RSP'
}

export default {
  name: 'ImportCustomers',

  components: {
    ImportCustomersErrorsList: () => import('@/components/customers/ImportCustomersErrorsList.vue')
  },

  data: () => ({
    ready: false,
    buildingsReady: false,
    servicesReady: false,
    show: false,
    partners: null,
    partnerId: null,
    customers: null,

    errors: {},
    fatalErrors: {},
    warnings: {},

    fileSelectDisabled: true,
    partnerSelectDisabled: false
  }),

  computed: {
    readyToShow () {
      return this.buildingsReady && this.servicesReady
    }
  },

  watch: {
    partnerId (val) {
      this.fileSelectDisabled = !val
    },

    readyToShow (val) {
      if (!val) return
      this.$root.$emit('progress-event', false)
      this.testForErrors()
      this.testForWarnings()
      this.show = true
    }
  },

  methods: {
    getPartners (data) {
      this.partners = data
      this.ready = true
    },

    getBuildingsData (data) {
      this.$root.$dispatchProgressEvent(true)
      this.customers.forEach((customer, index) => Object.assign(customer, { buildingId: data[index] }))
      this.buildingsReady = true
    },

    servicesReceived (data) {
      this.$root.$dispatchProgressEvent(true)
      this.customers.forEach((customer, index) => Object.assign(customer.services[0], { id: data[index] }))
      this.servicesReady = true
    },

    parseDate (date) {
      if (date.indexOf('/') !== -1) {
        const [day, month, year] = date.split('/')
        return `${year}-${month}-${day}`
      } else return date
    },

    getConnectionData (customer) {
      const result = {}

      for (const field in connectionDataFields) {
        if (typeof connectionDataFields[field] === 'string') {
          Object.assign(result, { [field]: customer[connectionDataFields[field]] })
        } else {
          for (const prop in connectionDataFields[field]) {
            if (!result[field]) result[field] = {}
            Object.assign(result[field], { [prop]: customer[connectionDataFields[field][prop]] })
          }
        }
      }

      return result
    },

    getServices (customer) {
      const logDate = customer.activationDate ? Date.parse(this.parseDate(customer.activationDate)) : Date.now()
      const activationDate = customer.activationDate ? this.parseDate(customer.activationDate) : null
      const status = customer.activationDate ? 'Active' : 'Not connected'

      return [
        {
          serviceName: customer.serviceName,
          status,
          activationDate,
          connectionData: this.getConnectionData(customer),
          log: { [logDate]: status }
        }
      ]
    },

    async readFile (file) {
      this.fileSelectDisabled = true
      this.partnerSelectDisabled = true
      this.$root.$dispatchProgressEvent(true)
      this.customers = []

      const data = await this.__importCustomers(file)

      const customers = JSON.parse(data).Customers

      for (const customer of customers) {
        const commercial = {
          companyName: customer.businessName || customer.companyName,
          companyAbn: customer.companyAbn || customer.businessAbn || ''
        }

        this.customers.push({
          customerCreationDate: this.parseDate(customer.customerCreationDate),
          commercial,
          resellerId: this.partnerId,
          uniqueCode: customer.uniqueCode,
          address: customer.address,
          apartmentNumber: customer.apartmentNumber || ' ',
          firstName: customer.firstName || '',
          lastName: customer.lastName || '',
          primaryEmail: customer.primaryEmail || '',
          alternativeEmail: customer.alternativeEmail || '',
          phoneMobile: customer.phoneMobile || '',
          phoneWork: customer.phoneWork || '',
          postCode: customer.postCode || '',
          services: this.getServices(customer),
          serviceName: customer.serviceName
        })
      }

      this.__searchBuildingsByAddress(customers.map(customer => customer.address), this.getBuildingsData)
      this.__searchServicesByNames(customers.map(customer => customer.serviceName), this.servicesReceived)
      this.$root.$dispatchProgressEvent(true)
    },

    testForErrors () {
      this.fatalErrors = []
      this.errors = []

      this.customers.forEach(customer => {
        const address = `${customer.apartmentNumber}/${customer.address}`

        const errors = ['uniqueCode', 'firstName', 'lastName', 'primaryEmail', 'phoneMobile', 'postCode']
          .filter(key => !customer[key])
          .map(key => ({ address, error: `${key} required` }))

        this.errors.push(...errors)

        if (!customer.services[0].id) this.fatalErrors.push({ address: customer.address, error: `Service ${customer.serviceName} not found!` })
        if (!customer.buildingId) this.fatalErrors.push({ address: customer.address, error: 'building not found!' })
      })
    },

    createWarning (address, propName) {
      this.warnings.push({ address, warning: `${propName} not defined` })
    },

    testForWarnings () {
      this.warnings = []

      for (const customer of this.customers) {
        const address = `${customer.apartmentNumber}/${customer.address}`

        if (!customer.customerCreationDate) this.createWarning(address, 'customerCreationDate')

        for (const propName in connectionDataFields) {
          if (propName === 'Login' || propName === 'PWD') {
            ['PPPOE', 'IPoE']
              .filter(key => !customer.services[0].connectionData[propName][key])
              .forEach(key => this.createWarning(address, connectionDataFields[propName][key]))
          } else {
            !customer.services[0].connectionData[propName] && this.createWarning(address, connectionDataFields[propName])
          }
        }
      }
    },

    save () {
      this.customers.forEach(customer => { delete customer.serviceName })
      this.__saveCustomers(this.customers, this.exit)
    },

    exit (data) {
      this.$router.push({ name: 'customers' })
    }
  },

  created () {
    this.__getResellersShortList(this.getPartners)
    this.__getShortListOfServices(this.getServices)
  }
}
</script>
