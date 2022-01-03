<template>
  <v-card flat class="transparent mx-auto pb-12" max-width="700" v-if="dialog && ready">
    <v-row justify="end">
      <v-btn icon @click="$emit('update:dialog', false)" class="mb-8">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <table>
      <thead>
        <tr style="background: #eee">
          <td colspan="2" style="padding: 0 16px">
            <h5>
              <small>Customer details</small>
            </h5>
          </td>
          <td width="120" style="padding: 0 16px">
            <h6> Update needed </h6>
          </td>
        </tr>
      </thead>
      <tbody v-if="customerType">
        <tr v-for="(item, propName) of commercial" :key="propName">
          <td width="180">
            <h6 class="text-right mr-4"> {{ item.title }} </h6>
          </td>
          <td width="400">
            <div class="bordered-item">
              <small>{{ item.value }}</small>
            </div>
          </td>
          <td>
            <v-checkbox
              v-model="item.selected"
              hide-details
              style="margin-top: 0!important"
            />
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr v-for="(item, propName) in customerDetails" :key="propName">
          <td width="180">
            <h6 class="text-right mr-4">{{ item.title }}</h6>
          </td>
          <td width="400">
            <v-text-field
              v-if="propName === 'uniqueCode'"
              v-model="customerDetails.uniqueCode.value"
              dense
              outlined
              hide-details
            />
            <div v-else class="bordered-item">
              <small v-if="item.type === 'mobile'"> +61 {{ item.value }} </small>
              <small v-else> {{ item.value }} </small>
            </div>
          </td>
          <td>
            <v-btn icon v-if="propName === 'uniqueCode'" @click="updateCustomerUniqueCode">
              <v-icon color="primary"> mdi-content-save </v-icon>
            </v-btn>
            <v-checkbox
              v-else
              v-model="item.selected"
              hide-details
              style="margin-top: 0!important"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <v-row justify="end" class="mt-12 mr-12">
      <v-btn outlined color="primary" @click="sendMessageToPartner">
        Send request for updates
        <v-icon small class="ml-4">mdi-send</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

const { customerSchema } = require('@/configs').default

const { customerDetails, commercial, customerAddress } = customerSchema

export default {
  name: 'ShowCustomerDetails',

  props: {
    dialog: Boolean,
    customerId: String
  },

  data: () => ({
    ready: false,
    customer: null,
    customerDetails: JSON.parse(JSON.stringify(customerDetails)),
    commercial: JSON.parse(JSON.stringify(commercial)),
    customerAddress: JSON.parse(JSON.stringify(customerAddress))
  }),

  computed: {
    customerType () {
      return this.customer && this.customer.commercial && Object.keys(this.customer.commercial).length > 0
    }
  },

  methods: {
    createSchema () {
      if (this.customerType) {
        const { companyName, companyAbn } = this.customer.commercial
        this.commercial.companyName.value = companyName
        this.commercial.companyAbn.value = companyAbn
      }

      for (const prop in this.customerDetails) {
        this.customerDetails[prop].value = this.customer[prop]
      }
      Object.assign(this.customerDetails, {
        address: {
          title: 'Address',
          type: '',
          selected: false,
          value: `${this.customer.apartmentNumber}/${this.customer.address}`
        }
      })
    },

    getCustomerDetails (data) {
      this.customer = data
      this.createSchema()
      this.ready = true
    },

    callback (data) {
      // console.log(data)
    },

    updateCustomerUniqueCode () {
      this.__patchCustomer(this.customer._id, { uniqueCode: this.customerDetails.uniqueCode.value }, this.callback)
    },

    sendMessageToPartner () {
      const commercial = Object.keys(this.commercial)
        .filter(key => this.commercial[key].selected)
        .map(key => ({
          title: this.commercial[key].title,
          section: 'commercial',
          field: key
        }))

      const selected = Object.keys(this.customerDetails)
        .filter(key => this.customerDetails[key].selected)
        .map(key => ({
          title: this.customerDetails[key].title,
          section: 'customerDetails',
          field: key
        }))

      const list = commercial.concat(selected).reduce((res, item) => `${res}, ${item.title}`, '')
      const content = `Details should be updated: ${list}`

      const message = {
        resellerId: this.customer.resellerId,
        type: 'update-customer-details',
        subject: this.customerDetails.address.value,
        propmt: `Please update customer ${this.customerDetails.uniqueCode.value} detals`,
        customerId: this.customer._id,
        fields: commercial.concat(selected),
        content
      }

      this.__sendMessage(message, this.callback)
    }
  },

  mounted () {
    if (this.customerId) {
      this.__getCustomerData(this.customerId, this.getCustomerDetails)
    }
  }
}
</script>

<style scoped>

.bordered-item {
  border: solid 1px #ddd;
  padding: 4px 8px;
  border-radius: 4px;
  user-select: text !important;
}

small {
  user-select: text !important;
}
/* table {
  width: 100%;
  margin-bottom: 48px;
}
tr {
  margin-bottom: 32px;
}
td {
  font-size: 14px;
  padding: 4px 12px;
}
.theme--light.v-application .text--primary {
  color: #900!important;
} */
</style>
