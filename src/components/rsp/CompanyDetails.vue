<template>
  <v-container class="homefone" v-if="ready">
    <v-card flat class="transparent pa-5 mx-auto mb-12" max-width="960" outlined>
      <v-row justify="center">
        <CompanyDetailsStep :data.sync="schema" step="company" title="Company details" :approved="details.approved" />
        <CompanyDetailsStep :data.sync="schema" step="general" title="General information" :approved="details.approved" />
        <CompanyDetailsStep :data.sync="schema" step="technic" title="Technical information" :approved="details.approved" />
      </v-row>
      <v-row justify="end" v-if="details.approved">
        <v-btn dark class="primary mr-12" @click="requestUpdates">
          request for updates
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>

const { schemaRSP } = require('@/configs').default

export default {
  name: 'CompanyDetails',
  components: {
    CompanyDetailsStep: () => import('@/components/rsp/CompanyDetailsStep.vue')
  },

  props: {
    opened: Boolean,
    details: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    ready: false,
    schema: schemaRSP,
    steps: Object.keys(schemaRSP)
  }),

  methods: {
    getData () {
      if (!this.details) return
      for (const step of ['company', 'general', 'technic']) {
        for (const prop in this.details[step]) {
          this.schema[step][prop].value = this.details[step][prop]
        }
      }
      this.ready = true
    },
    requestUpdates () {
      const fields = []
      for (const section in this.schema) {
        Object.keys(this.schema[section])
          .filter(key => this.schema[section][key].selected)
          .map(field => ({ title: this.schema[section][field].title, section, field }))
          .forEach(item => fields.push(item))
      }

      this.__sendMessage({
        type: 'update-company-details',
        resellerId: this.details._id,
        subject: 'Update company details',
        propmt: 'Update please the next data in company details',
        fields
      })
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
    }
  },

  mounted () {
    this.getData()
    this.$vuetify.goTo(0)
  }
}
</script>
