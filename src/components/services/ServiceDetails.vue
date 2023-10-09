<template>
  <v-container style="margin-bottom: 180px; max-width: 960px">
    <v-toolbar flat class="transparent mx-auto">
      <v-toolbar-title>
        <v-btn :disabled="tab === 'serviceDetails'" text @click="tab = 'serviceDetails'">
          Service details
        </v-btn>
        <v-btn :disabled="tab === 'partners'" text @click="tab = 'partners'">
          Partners
        </v-btn>
        <v-btn :disabled="tab === 'sla'" text @click="tab = 'sla'">
          SLA
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        @click="$router.push({ name: 'services-list' })"
        icon
        color="#aaa"
        class="pl-2"
      >
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider class="mt-2 mb-10" />

    <v-row v-if="tab === 'serviceDetails'">
      <v-card v-if="ready" flat class="transparent mt-0 mx-auto" min-width="700">
        <table width="100%">
          <tbody>
            <tr v-for="(prop, propName) in schema" :key="propName" class="mb-4">
              <td width="280" v-if="propName !== 'discountUnits'">
                <p class="right-title mr-4"><small>{{ prop.title }}</small></p>
              </td>

              <td v-if="prop.type === 'switcher'" width="*" class="text-right">
                <SwitchValues
                  label="Residential/commercial"
                  :value.sync="prop.value"
                  :states="prop.available"
                  hide-details
                  class="mb-8"
                />
              </td>

              <td v-if="propName !== 'discountUnits' && propName !== 'serviceType' && propName !== 'serviceSLA' && textField(prop)" class="text-right">
                <v-text-field
                  v-model="prop.value"
                  :label="prop.title"
                  :rules="[prop.required ? rules.required : (value) => true, rule(prop)]"
                  outlined
                  dense
                  class="my-1"
                  hide-details
                />
              </td>

              <td v-if="prop.type === 'discount'" class="text-right">
                <Discount
                  :discountValue.sync="prop.value"
                  :discountUnits.sync="schema.discountUnits.value"
                />
              </td>

              <td v-if="prop.type === 'checkbox'" class="td-checkbox text-right">
                <v-checkbox
                  v-model="prop.value"
                  :label="prop.title"
                  dense
                  hide-details
                />
              </td>
            </tr>
          </tbody>
        </table>

        <v-row justify="start" class="mt-8 mb-12">
          <v-btn outlined text color="buttons" @click="$router.push({ name: 'services-list' })">Exit</v-btn>
          <v-spacer />
          <v-btn v-if="access" dark class="buttons" @click="saveServiceDetails">
            Update/save details
          </v-btn>
        </v-row>
      </v-card>
    </v-row>

    <v-container v-if="tab === 'partners'">
      <v-row justify="center">
        <Partners :servicePartners.sync="partnersList" />
      </v-row>

      <v-row justify="start" class="mt-8 mr-12">
        <v-btn outlined text color="buttons" @click="$router.push({ name: 'services-list' })">Exit</v-btn>
        <v-spacer />
        <v-btn v-if="access" text dark class="primary" @click="saveServicePartners">
          UPDATE PARTNERS
        </v-btn>
      </v-row>
    </v-container>

    <v-container  v-if="tab === 'sla'">
      <v-row justify="center">
        <ShowPDF :id.sync="serviceSLA" :save.sync="updateSLA" :access="access" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>

import { SwitchValues, Discount } from '@/components/inputs'
import { testTextField } from '@/helpers'
import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

import Partners from '@/components/services/Partners.vue'

const { serviceSchema, rules } = require('@/configs').default

export default {
  name: 'ServiceDetails',

  components: {
    Discount,
    SwitchValues,
    Partners,
    ShowPDF: () => import('@/components/inputs/ShowPDF.vue')
  },

  props: ['serviceId'],

  data: () => ({
    service: null,
    schema: {},
    updateSLA: false,
    rules: rules,
    ready: false,
    access: 0,

    tab: 'serviceDetails'
  }),

  computed: {
    serviceSLA: {
      get () {
        return this.service?.serviceSLA || null
      },
      set (value) {
        this.service.serviceSLA = value
      }
    },

    partnersList: {
      get () {
        return this.service?.partners || []
      },
      set (data) {
        this.service.partners = data
      }
    }
  },

  watch: {
    partnersList: {
      deep: true,
      handler (data) {
        this.service.partners = data || []
      }
    },
    updateSLA (val) {
      if (val) this.saveServiceSLA()
    }
  },

  methods: {
    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },

    textField (item) {
      return testTextField(item.type)
    },

    rule (item) {
      return this.rules[item.type]
    },

    getData (data) {
      this.service = data
      this.partnersList = data.partners
      for (const prop in this.schema) {
        this.schema[prop].value = data[prop]
      }

      this.schema.discountValue.value = data.discountValue || 0
      this.schema.discountUnits.value = data.discountUnits || '%'

      this.ready = true
    },

    saveServiceDetails () {
      for (const prop in this.schema) {
        this.service[prop] = this.schema[prop].value
      }

      this.serviceId
        ? this.__patchServiceDetails(this.serviceId, this.service, this.showResult)
        : this.__createNewService(this.service, this.showResult)
    },

    saveServicePartners () {
      this.service.partners = this.partnersList
      this.__patchServiceDetails(this.serviceId, { partners: this.partnersList }, this.showResult)
    },

    saveServiceSLA () {
      this.service.serviceSLA = this.serviceSLA
      this.__patchServiceDetails(this.serviceId, { serviceSLA: this.serviceSLA }, this.showResult)
    },

    showResult (data) {
      this.$route.name !== 'services-list' && this.$router.push({ name: 'services-list' })
        .catch(failure => console.warn('Router failure:\n', failure))
    }
  },

  mounted () {
    this.schema = this.__clone(serviceSchema)
    this.access = accessRightsHandler().access[roleHandler()].services === 2
    this.service = this.__clone(serviceSchema)

    if (this.serviceId) this.__getServiceDetails(this.serviceId, this.getData)
    else this.ready = true

    this.$vuetify.goTo(0)
  }
}
</script>

<style>

.right-title {
  text-align: right;
  padding-right: 16px;
  margin-bottom: 0 !important;
}

.partners-col {
  border: solid 1px #aaa;
  border-radius: 4px;
  padding: 8px 16px;
  text-align: left;
}
</style>
