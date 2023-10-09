<template>
  <v-container class="homefone" v-if="ready">
    <v-card flat class="transparent pa-5 mx-auto mb-12" max-width="960" outlined>
      <v-row justify="center">
        <CompanyDetailsStep
          v-if="messageReady"
          :sourceData="schema"
          step="company"
          title="Company details"
          :approved="details.approved"
        />
        <CompanyDetailsStep
          v-if="messageReady"
          :sourceData="schema"
          step="general"
          title="General information"
          :approved="details.approved"
        />
        <CompanyDetailsStep
          v-if="messageReady"
          :sourceData="schema"
          step="technic"
          title="Technical information"
          :approved="details.approved"
        />
      </v-row>
      <v-row justify="end" v-if="details.approved" class="mt-12">
        <v-btn v-if="messageId" dark class="primary mr-12" @click="updateRequestForUpdates">
          Update request
        </v-btn>

        <v-btn v-else dark class="primary mr-12" @click="sendRequestForUpdates">
          Send request for updates
        </v-btn>

      </v-row>
    </v-card>
  </v-container>
</template>

<script>

import { partnerDetailsHandler } from '@/controllers'

const { schemaRSP, partnerDetailsUpdatesSchema } = require('@/configs').default

export default {
  name: 'CompanyDetails',
  components: {
    CompanyDetailsStep: () => import('@/components/rsp/CompanyDetailsStep.vue')
  },

  props: {
    opened: Boolean
  },

  data: () => ({
    details: partnerDetailsHandler(),
    updated: false,
    detailsReady: false,
    messageReady: false,
    messageId: null,
    schema: {},
    steps: Object.keys(schemaRSP),
    updatesNeeded: []
  }),

  computed: {
    ready () {
      return Boolean(this.messageReady && this.detailsReady)
    }
  },

  methods: {
    getMessages (data) {
      const message = data.find(item => item.type === 'update-company-details')
      this.messageId = message?._id
      this.updatesNeeded = message ? message.fields : []

      this.detailsReady && this.configSchema()

      this.messageReady = true
    },

    getData () {
      this.__getPartnerMessages(this.details._id, this.getMessages)
      this.details = partnerDetailsHandler()
      if (!this.details) return
      for (const step of ['company', 'general', 'technic']) {
        for (const prop in this.details[step]) {
          Object.assign(this.schema[step][prop], {
            value: this.details[step][prop],
            selected: false,
            updated: false
          })
        }
      }
      this.messageReady && this.configSchema()

      this.detailsReady = true
    },

    configSchema () {
      for (const step of ['company', 'general', 'technic']) {
        const currentUpdates = this.updatesNeeded.filter(item => item.section === step)
        for (const item of currentUpdates) {
          this.schema[step][item.field].selected = true
          this.schema[step][item.field].updated = item.updated
        }
      }
    },

    findUpdatesSchemaItem: (section, propName) => partnerDetailsUpdatesSchema.find(item => item.section === section && item.field === propName),

    getFieldsForRequest () {
      const fields = []
      for (const section in this.schema) {
        const items = Object.keys(this.schema[section])
          .filter(key => this.schema[section][key].selected)
          .map(field => this.findUpdatesSchemaItem(section, field))

        fields.push(...items)
      }

      return fields
    },

    updateRequestForUpdates () {
      if (!this.messageId) return

      const fields = this.getFieldsForRequest()

      fields.length
        ? this.__updateMessage(this.messageId, fields, this.messageUpdated)
        : this.__deleteMessage(this.messageId, partnerDetailsHandler()._id, this.messageUpdated)
      this.messageId = fields.length ? this.messageId : null
    },

    sendRequestForUpdates () {
      if (this.messageId) return

      const fields = this.getFieldsForRequest()

      if (!fields.length) return

      this.__sendMessage({
        type: 'update-company-details',
        resellerId: this.details._id,
        subject: 'Update company details',
        propmt: 'Update please the next data in company details',
        fields
      }, this.messageTransmitted)
    },

    messageUpdated (data) {
      // console.log('Message updated:\n', data)
    },

    messageTransmitted (response) {
      this.messageId = response.data
      this.$emit('update:opened', false)
    },

    saveData () {
      const result = {}
      for (const stepName of Object.keys(this.schema)) {
        result[stepName] = {}
        const step = this.schema[stepName]
        for (const propName of Object.keys(step)) {
          result[stepName][propName] = step[propName].value
        }
      }
      this.__putClientData(result)
    },

    confirmUpdate (data) {
      const { section, field } = data

      Object.assign(this.schema[section][field], {
        selected: false,
        updated: false
      })

      const index = this.updatesNeeded.findIndex(item => item.section === section && item.field === field)
      this.updatesNeeded.splice(index, 1)
    },

    rejectUpdate (data) {
      const { section, field } = data

      Object.assign(this.schema[section][field], { updated: false })

      Object.assign(this.updatesNeeded.find(item => item.section === section && item.field === field), {
        updated: false
      })
    },

    getUpdates (updates) {
      if (!updates) return
      const updated = updates.find(item => item._id === this.details._id)

      if (!updated) return

      this.detailsReady = false

      partnerDetailsHandler(updated)

      this.getData()
    }
  },

  beforeDestroy () {
    this.$root.$off('confirm-update', this.confirmUpdate)
    this.$root.$off('reject-update', this.rejectUpdate)

    this.$root.$off('partners-updates-received', this.getUpdates)
  },

  mounted () {
    this.schema = this.__clone(schemaRSP)

    this.getData()
    this.$vuetify.goTo(0)

    this.$root.$on('confirm-update', this.confirmUpdate)
    this.$root.$on('reject-update', this.rejectUpdate)

    this.$root.$on('partners-updates-received', this.getUpdates)
  }
}
</script>
