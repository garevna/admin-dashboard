<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <v-col style="height: 75vh; max-width: 480px">
        <ShortList
          title="List of services"
          :list="services"
          :selected.sync="selectedServiceId"
          :height="480"
          :disabled="resellerServices"
        />
      </v-col>
      <v-col style="height: 75vh; vertical-align: middle; max-width: 140px; padding-top: 25vh">
        <v-btn text v-if="selectedServiceId" @click="selectService" style="width: 100%; text-align: center;">
          Add <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn text v-if="deselectedServiceId" @click="deselectService" style="width: 100%; text-align: center;">
          <v-icon>mdi-chevron-left</v-icon> Remove
        </v-btn>
      </v-col>
      <v-col style="height: 75vh; max-width: 480px; text-align: center">
        <ShortList
          title="RSP services"
          :list="resellerServices"
          :selected.sync="deselectedServiceId"
          :height="480"
        />

        <v-row justify="end" class="mt-8">
          <v-btn text dark class="primary" @click="saveResellerServices">
            SAVE UPDATES
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="end">

    </v-row>
  </v-container>
</template>

<script>

import { partnerDetailsHandler } from '@/controllers'

export default {
  name: 'ResellerServices',

  components: {
    ShortList: () => import('@/components/inputs/ShortList.vue')
  },

  props: ['details'],

  data: () => ({
    services: [],
    updated: new Set([]),
    resellerServices: [],
    selectedServiceId: null,
    deselectedServiceId: null
  }),

  computed: {
    selectedService () {
      return this.services.find(service => service.id === this.selectedServiceId)
    },

    deselectedService () {
      return this.services.find(service => service.id === this.deselectedServiceId)
    },

    deselectedServiceIndex () {
      return this.resellerServices.findIndex(service => service.id === this.deselectedServiceId)
    },

    partnerIndex () {
      return this.deselectedService ? this.deselectedService.partners.findIndex(partner => partner === partnerDetailsHandler()._id) : -1
    }
  },

  watch: {
    selectedServiceId (value) { if (value) this.deselectedServiceId = null },

    deselectedServiceId (value) { if (value) this.selectedServiceId = null }
  },

  methods: {
    getSelectedServiceIndex (serviceId) {
      return this.services.findIndex(service => service.id === serviceId)
    },

    getDeselectedServiceIndex (serviceId) {
      return this.resellerServices.findIndex(service => service.id === serviceId)
    },

    mapServices (data) {
      return data.map(service => ({ id: service._id, text: service.serviceName, partners: service.partners || [] }))
    },

    getData (data) {
      this.services = this.mapServices(data)
      this.resellerServices = this.mapServices(data.filter(service => service.partners.find(partner => partner === partnerDetailsHandler()._id)))
    },

    selectService () {
      this.deselectedServiceId = null
      this.resellerServices.push(this.selectedService)
      this.selectedService.partners.push(partnerDetailsHandler()._id)

      this.updated.add(this.selectedService)
    },

    deselectService () {
      this.selectedServiceId = null

      this.deselectedService.partners.splice(this.partnerIndex, 1)
      this.resellerServices.splice(this.deselectedServiceIndex, 1)

      this.updated.add(this.deselectedService)
      this.deselectedServiceId = null
    },

    saveResellerServices () {
      const data = Object.assign({}, ...Array.from(this.updated).map(service => ({ [service.id]: { partners: service.partners } })))

      this.__patchServicesGroup(partnerDetailsHandler()._id, data, this.callback)
    },

    callback (data) {
      // console.log(data)
    }
  },

  beforeMount () {
    this.__getListOfServices(this.getData)
  }
}
</script>
