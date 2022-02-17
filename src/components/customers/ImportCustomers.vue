<template>
  <v-card flat class="transparent mx-auto" max-width="600" v-if="ready">
    <table class="mb-12">
      <thead>
        <tr>
          <th width="320">Partner</th>
          <th colspan="2">PWD</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <v-select
              :items="partners"
              label="Select partner"
              v-model="partnerId"
              item-text="name"
              item-value="id"
              outlined
              hide-details
            />
          </td>
          <td>
            <v-text-field label="PPPOE" v-model="PWD.PPPOE" hide-details outlined />
          </td>
          <td>
            <v-text-field label="IPoE" v-model="PWD.IPoE" hide-details outlined />
          </td>
        </tr>
      </tbody>
    </table>

    <v-card-text class="text-center" v-if="partnerId">
      <h5><small>Pick the text file with customer data</small></h5>
      <v-file-input @change="readFile" hide-details outlined dense  />
    </v-card-text>

    <v-card-text class="my-12" v-if="readyToShow">
      <v-btn dark color="primary" @click="show = true"> Test result </v-btn>
      <v-btn v-if="!fatal" outlined color="primary" @click="save"> Save results </v-btn>
      <div v-if="show">
        <div v-if="fatal">
          <h5 class="my-4" v-if="fatal"><small style="color: #f00">Fatal errors:</small></h5>
          <div v-for="(error, index) of fatalErrors" :key="index">
            {{ error }}
          </div>
          <h5 class="my-4"><small style="color: #f50">Warnings:</small></h5>
          <div v-for="(error, index) of errors" :key="index">
            {{ error }}
          </div>
        </div>
        <h5 class="my-4" v-else>
          <small style="color: #09b">OK</small>
        </h5>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'ImportCustomers',

  data: () => ({
    ready: false,
    buildingsReady: false,
    servicesReady: false,
    show: false,
    partners: null,
    partnerId: null,
    customers: null,
    PWD: { PPPOE: '', IPoE: '' },
    errors: [],
    fatalErrors: []
  }),

  computed: {
    readyToShow () {
      return this.buildingsReady && this.servicesReady
    },

    fatal () {
      return !!(this.fatalErrors.length || this.errors.length)
    }
  },

  watch: {
    readyToShow (val) {
      this.$root.$dispatchProgressEvent(false)
      this.testForErrors()
    }
  },

  methods: {
    getPartners (data) {
      this.partners = data
      this.ready = true
    },

    getBuildingsData (data) {
      this.customers.forEach((customer, index) => Object.assign(customer, { buildingId: data[index] }))
      this.buildingsReady = true
    },

    servicesReceived (data) {
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
      return {
        Login: {
          PPPOE: 'CRN@RSP',
          IPoE: 'port@fttp.dgtek.net'
        },
        PWD: customer.PPPOE ? Object.assign({}, this.PWD, { PPPOE: customer.PPPOE }) : this.PWD,
        'Speed In': customer['Speed in'] || '',
        'Speed Out': customer['Speed Out'] || '',
        IP: customer.IP || '',
        'Routed subnet': customer['Routed subnet'] || '',
        'VLAN DGtek': customer['VLAN DGtek'] || '',
        'VLAN RSP': customer['VLAN RSP'] || ''
      }
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
          services: this.getServices(customer)
        })
      }

      this.__searchBuildingsByAddress(customers.map(customer => customer.address), this.getBuildingsData)
      this.__searchServicesByNames(customers.map(customer => customer.serviceName), this.servicesReceived)
    },

    testForErrors () {
      this.fatalErrors = []
      this.errors = []
      this.customers.forEach(customer => {
        const errors = ['uniqueCode', 'firstName', 'lastName', 'primaryEmail', 'phoneMobile', 'postCode']
          .filter(key => !customer[key])
          .map(key => `${customer.address} error: ${key} required`)

        this.errors.push(...errors)

        if (!customer.services[0].id) this.fatalErrors.push(`${customer.address} fatal error: service ${customer.serviceName} not found!`)
        if (!customer.buildingId) this.fatalErrors.push(`${customer.address} fatal error: building not found!`)
      })
    },

    save () {
      this.__saveCustomers(this.customers, this.showResult)
    },

    showResult (data) {
      console.log(data)
    }
  },

  created () {
    this.__getResellersShortList(this.getPartners)
    this.__getShortListOfServices(this.getServices)
  }
}
</script>
