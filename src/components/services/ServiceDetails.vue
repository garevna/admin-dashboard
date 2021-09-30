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
            <tr v-for="(prop, propName) in service" :key="propName">
              <td width="280">
                <p class="right-title mr-4"><small>{{ prop.title }}</small></p>
              </td>

              <td v-if="prop.type === 'switcher'" width="*">
                <SwitchValues
                  label="Residential/commercial"
                  :value.sync="service.serviceType.value"
                  :states="['residential', 'commercial']"
                  hide-details
                  class="mb-8"
                />
              </td>

              <td v-if="propName !== 'serviceType' && propName !== 'serviceSLA' && textField(prop)">
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

              <td v-if="prop.type === 'checkbox'" class="td-checkbox">
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
          <v-btn dark class="buttons" @click="saveServiceDetails">
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
        <v-btn text dark class="primary" @click="saveServicePartners">
          UPDATE PARTNERS
        </v-btn>
      </v-row>
    </v-container>

    <v-container  v-if="tab === 'sla'">
      <v-row justify="center">
        <ShowPDF
          :id.sync="selectedId"
          :title.sync="serviceSLA"
        />
      </v-row>

      <v-row justify="start" class="mt-12 mr-12">
        <v-btn outlined text color="buttons" @click="$router.push({ name: 'services-list' })">Exit</v-btn>
        <v-spacer />
        <v-btn v-if="selectedId !== service.serviceSLA" text dark class="primary" @click="saveServiceSLA">
          UPDATE SLA
        </v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>

import { SwitchValues } from '@/components/inputs'
import { testTextField } from '@/helpers'

import Partners from '@/components/services/Partners.vue'

const { serviceSchema, rules } = require('@/configs').default

export default {
  name: 'ServiceDetails',
  components: {
    SwitchValues,
    Partners,
    ShowPDF: () => import('@/components/inputs/ShowPDF.vue')
  },

  props: ['serviceId'],

  data: () => ({
    service: null,
    partnersList: [],
    serviceSLA: '',
    selectedId: null,
    rules: rules,
    ready: false,

    tab: 'serviceDetails'
  }),

  watch: {
    service: {
      deep: true,
      handler (data) {
        this.selectedId = data.serviceSLA.value
      }
    },
    partnersList: {
      deep: true,
      immediate: true,
      handler (data) {
        if (data) data.forEach(item => console.log(item))
      }
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
      this.partnersList = data.partners
      for (const prop in this.service) {
        if (prop === 'partners') continue
        this.service[prop].value = data[prop]
      }

      this.ready = true
    },

    saveServiceDetails () {
      const result = {}
      for (const prop in this.service) {
        result[prop] = this.service[prop].value
      }
      result.partners = this.partnersList || []

      if (this.serviceId) {
        this.__updateServiceDetails(this.serviceId, result)
      } else {
        this.__createNewService(result)
      }
    },

    saveServicePartners () {
      this.__patchServiceDetails(this.serviceId, { partners: this.partnersList })
    },

    saveServiceSLA () {
      this.__patchServiceDetails(this.serviceId, { serviceSLA: this.selectedId })
    },

    showResult (data) {
      this.$route.name !== 'services-list' && this.$router.push({ name: 'services-list' })
        .catch(failure => console.warn('Router failure:\n', failure))
    }
  },

  beforeDestroy () {
    this.$root.$off('service-data-received', this.getData)

    this.$root.$off('service-data-updated', this.showResult)
    this.$root.$off('new-service-created', this.showResult)
  },

  mounted () {
    this.service = JSON.parse(JSON.stringify(serviceSchema))

    if (this.serviceId) {
      this.$root.$on('service-data-received', this.getData)

      this.__getServiceDetails(this.serviceId)
    } else {
      this.ready = true
    }

    this.$root.$on('service-data-updated', this.showResult)
    this.$root.$on('new-service-created', this.showResult)

    this.$vuetify.goTo(0)
  }
}
</script>

<style>
.right-title {
  width: 100%;
  text-align: right;
  padding-right: 16px;
}
tr {
  vertical-align: super;
}
td {
  height: 32px !important;
  text-align: right!important;
}
.partners-col {
  border: solid 1px #aaa;
  border-radius: 4px;
  padding: 8px 16px;
  text-align: left;
}
</style>
