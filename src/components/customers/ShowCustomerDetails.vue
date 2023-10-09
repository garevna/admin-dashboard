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
          <td width="120" style="padding: 0 16px">
            <h6> Updated </h6>
          </td>
          <td width="120" style="padding: 0 16px">
            <h6> Confirm update </h6>
          </td>
          <td width="120" style="padding: 0 16px">
            <h6> Reject update </h6>
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
          <td>
            <small color="#777" v-if="item.updated"> {{  item.updated || '' }} </small>
          </td>
          <td>
            <v-btn text v-if="item.updated && accessRights === 2" color="#777" @click="confirmUpdate(propName)">
              OK
            </v-btn>
          </td>
          <td>
            <v-btn text v-if="item.updated && accessRights === 2" color="#aaa" @click="rejectUpdate(propName)">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
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
            <v-btn icon v-if="propName === 'uniqueCode' && accessRights === 2" @click="updateCustomerUniqueCode">
              <v-icon color="primary"> mdi-content-save </v-icon>
            </v-btn>
            <div v-else class="text-center">
              <v-checkbox
                v-model="item.selected"
                hide-details
                style="margin-top: 0!important"
                :disabled="Boolean(item.updated)"
              />
            </div>
          </td>
          <td>
            <small color="#777" v-if="item.updated"> {{  item.updated || '' }} </small>
          </td>
          <td>
            <v-btn text v-if="item.updated" :disabled="accessRights === 2" color="#777" @click="confirmUpdate(propName)">
              OK
            </v-btn>
          </td>
          <td>
            <v-btn text v-if="item.updated" color="#aaa" @click="rejectUpdate(propName)">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
    <v-row justify="end" class="mt-12 mr-12" v-if="accessRights === 2">
      <v-btn v-if="messageId" outlined color="primary" @click="updateMessageToPartner">
        Update request
        <v-icon small class="ml-4">mdi-update</v-icon>
      </v-btn>
      <v-btn v-else outlined color="primary" @click="sendMessageToPartner">
        Send request for updates
        <v-icon small class="ml-4">mdi-send</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

const { customerSchema } = require('@/configs').default

const { customerDetails, commercial, customerAddress } = customerSchema

export default {
  name: 'ShowCustomerDetails',

  props: {
    dialog: Boolean,
    customerId: String,
    customerUpdated: Boolean
  },

  data: () => ({
    ready: false,
    accessRights: accessRightsHandler().access[roleHandler()].customers,
    customer: null,
    message: null,
    messageId: null,
    customerDetails: {},
    commercial: {},
    customerAddress: ''
  }),

  computed: {
    customerType () {
      return this.customer && this.customer.commercial && Object.keys(this.customer.commercial).length > 0
    }
  },

  watch: {
    customerUpdated (val) {
      if (!val) return
      if (this.customerId) {
        this.__getCustomerData(this.customerId, this.getCustomerDetails)
      }
      this.$emit('update:customerUpdated', false)
    }
  },

  methods: {
    getCommercialUpdates () {
      const commercial = {
        companyName: this.message ? this.message.fields.find(item => item.section === 'commercial' && item.field === 'companyName') : null,
        companyAbn: this.message ? this.message.fields.find(item => item.section === 'commercial' && item.field === 'companyAbn') : null
      }

      for (const propName of ['companyName', 'companyAbn']) {
        Object.assign(this.commercial[propName], {
          value: this.customer.commercial[propName],
          selected: Boolean(commercial[propName]),
          updated: commercial[propName]?.updated || false
        })
      }
    },

    createSchema () {
      if (this.customer.commercial) this.getCommercialUpdates()

      Object.assign(this.customerDetails, {
        address: {
          title: 'Address',
          type: '',
          value: `${this.customer.apartmentNumber}/${this.customer.address}`
        }
      })

      for (const propName in this.customerDetails) {
        if (propName === 'uniqueCode') {
          Object.assign(this.customerDetails.uniqueCode, { value: this.customer[propName] })
          continue
        }
        const messageField = this.message ? this.message.fields.find(item => item.section === 'customerDetails' && item.field === propName) : null

        Object.assign(this.customerDetails[propName], {
          value: this.customer[propName],
          selected: Boolean(messageField) || false,
          updated: messageField?.updated || false
        })
      }
    },

    getPartnerMessages () {
      this.__getPartnerMessages(this.customer.resellerId, this.getMessages)
    },

    getMessages (messages) {
      this.message = messages.find(item => item.type === 'update-customer-details' && item.customerId === this.customer._id)
      this.messageId = this.message?._id

      this.createSchema()
      this.ready = true
    },

    getCustomerDetails (data) {
      this.customer = data
      this.getPartnerMessages()
    },

    callback (data) {
      // console.log(data)
    },

    getMessageId (messageId) {
      this.messageId = messageId
    },

    getResponse (data) {
      // console.log('Message has been updated:\n', data)
    },

    updateCustomerUniqueCode () {
      this.__patchCustomer(this.customer._id, { uniqueCode: this.customerDetails.uniqueCode.value }, this.callback)
    },

    updateCustomer () {
      this.__patchCustomer(this.customer._id, { status: Date.now() }, this.callback)
    },

    createMessage () {
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

      // const list = commercial.concat(selected).reduce((res, item) => `${res}, ${item.title}`, '')
      // const content = `Details should be updated: ${list}`

      const message = {
        resellerId: this.customer.resellerId,
        type: 'update-customer-details',
        subject: this.customerDetails.address.value,
        propmt: `Please update customer ${this.customerDetails.uniqueCode.value} detals`,
        customerId: this.customer._id,
        fields: commercial.concat(selected)
        // content
      }
      return message
    },

    updateMessageToPartner () {
      this.message = this.createMessage()
      if (this.message.fields.length) this.__updateMessage(this.messageId, this.message.fields, this.getResponse)
      else this.__deleteMessage(this.messageId, this.message.resellerId, this.getResponse)
    },

    sendMessageToPartner () {
      this.message = this.createMessage()
      this.__sendMessage(this.message, this.getMessageId)
    },

    getMessageField (propName) {
      const index = this.message.fields.findIndex(messageField => messageField.field === propName)
      if (index === -1) return console.warn(`Field ${propName} was not found in message\n`, this.message.fields)
      const section = this.message.fields[index].section
      return { index, section }
    },

    confirmUpdate (propName) {
      const { index, section } = this.getMessageField(propName) || {}
      if (!section) return
      this.ready = false
      this.message.fields.splice(index, 1)
      Object.assign(this[section][propName], { selected: false, updated: false })
      this.$nextTick(() => { this.ready = true })
    },

    rejectUpdate (propName) {
      const { index, section } = this.getMessageField(propName) || {}
      if (!section) return
      this.ready = false
      Object.assign(this.message.fields[index], { updated: false })
      Object.assign(this[section][propName], { updated: false })
      this.$nextTick(() => { this.ready = true })
    }
  },

  beforeDestroy () {
    this.$root.$off('customers-updated-remotely', this.customersUpdatedRemotely)
  },

  mounted () {
    if (this.customerId) {
      this.__getCustomerData(this.customerId, this.getCustomerDetails)
      this.customerDetails = this.__clone(customerDetails)
      this.commercial = this.__clone(commercial)
      this.customerAddress = this.__clone(customerAddress)
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
