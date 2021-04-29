<template>
  <v-container>
    <v-card flat class="transparent">
      <h3>Check the service availability by typing the address in the textbox below</h3>
      <v-card
        id="container-for-map"
        ref="container-for-map"
        width="100%"
        height="480"
        class="transparent"
      >
      </v-card>

      <v-card id="searchAddressResults" class="transparent mx-auto py-10 text-center" outlined>

        <v-card-text text-center v-if="address">
          <p>DGtek service at</p>
          <h5>{{ address }}</h5>
          <p>check results</p>
          <p>Status: {{ status }}</p>
          <p>Estimated service delivery time: {{ terms }}</p>

        </v-card-text>

        <v-card-text text-center v-if="address">
          <!-- <v-btn v-if="address" outlined color="buttons" class="mx-2" @click="newCustomer" :disabled="newCustomerDisabled">
            Add new customer
          </v-btn>

          <v-btn outlined color="buttons" class="mx-2" @click="selectCustomer">
            Select existing customer
          </v-btn> -->

          <!-- <v-btn v-if="address" outlined color="buttons" class="mx-2" @click="$router.push({ name: '', params: { buildingId:  } })">
            Edit building details
          </v-btn> -->

        </v-card-text>
      </v-card>

      <v-row justify="center">
        <v-col cols="12" md="6" lg="5" xl="4">
          <v-card flat class="transparent">
            <v-card-title>
              <h5>On-net buildings</h5>
            </v-card-title>
            <v-combobox
              v-model="litAddress"
              :items="litBuildings"
              label="On-net buildings"
              outlined
              dense
              :loading="litLoading"
            ></v-combobox>
            <v-list dense max-height="360" class="transparent" style="overflow-y: auto; margin-top: -24px">
              <v-list-item
                v-for="(item, index) of litBuildings"
                :key="index"
                @click="clickListItem('on-net', item)"
              >
                {{ item }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="5" xl="4">
          <v-card flat class="transparent">
            <v-card-title>
              <h5>Upcoming buildings</h5>
            </v-card-title>
            <v-combobox
              v-model="footprintAddress"
              :items="footprintBuildings"
              label="Upcoming buildings"
              outlined
              dense
              :loading="footprintLoading"
            ></v-combobox>
            <v-list dense max-height="360" class="transparent" style="overflow-y: auto; margin-top: -24px; user-select: ">
              <v-list-item
                v-for="(item, index) of footprintBuildings"
                :key="index"
                @click="clickListItem('footprint', item)"
              >
                {{ item }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>

/* eslint-disable no-new */

import DgtekMap from 'dgtek-map'
import { dgtekMapEvents, buildingStatusConfig, newBuilding } from '@/configs'
import { normalizeAddress } from '@/helpers'

const { management, owner } = newBuilding

export default {
  name: 'CheckAddress',
  data: () => ({
    initialAddressData: {},
    map: null,
    events: dgtekMapEvents,
    buildingStatusConfig: buildingStatusConfig,
    buildingId: '',
    address: '',
    eventName: '',
    litAddress: '',
    footprintAddress: '',
    status: '',
    terms: '',
    scrollOptions: {
      duration: 500,
      offset: 0,
      easing: 'easeInOutCubic'
    },
    litBuildings: [],
    footprintBuildings: [],
    litLoading: true,
    footprintLoading: true
  }),
  watch: {
    initialAddressData: {
      deep: true,
      handler (val) {
        console.log('INITIAL ADDRESS DATA:\n', val)
      }
    },
    litAddress (value) {
      this.address = value
      this.refresh('on-net')
    },
    footprintAddress (value) {
      this.address = value
      this.refresh('footprint')
    }
  },
  methods: {
    getBuildings (response) {
      console.log('RESPONSE:\n', response)
      this[`${response.store}Buildings`] = response.result.map(item => item.address)
      this[`${response.store}Loading`] = false
    },
    getBuildingDetails (response) {
      console.log('BUILDING DETAILS:\n', response)
      const eventType = Object.keys(this.buildingStatusConfig)
        .find(item => buildingStatusConfig[item].status === response.result.status)

      console.log('EVENT TYPE: ', eventType, this.eventName)

      console.log(Object.keys(this.buildingStatusConfig))
      console.log(response.result.status)
      Object.keys(this.buildingStatusConfig)
        .forEach(item => console.log(buildingStatusConfig[item]))

      this.setInitialAddressData(eventType, response.result)
      const { title } = this.buildingStatusConfig[eventType || this.eventName]
      this.status = title
      this.terms = response.result.estimatedServiceDeliveryTime
      this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
    },
    setInitialAddressData (eventType, data) {
      console.log('setInitialAddressData:\n', eventType, data)

      if (eventType) {
        this.eventName = eventType
      }

      this.buildingId = data.buildingId
      this.address = normalizeAddress(data.address)

      // const buildingStatus = data.status === 'UnderConstruction' || 'BuildCommenced' ? 'BuildCommenced'
      //   : data.status === 'ServiceAvailable' ? 'Footprint'
      //     : data.status === 'NotAvailable' ? 'Other' : data.status

      const buildingStatus = buildingStatusConfig[this.eventName].buildingStatus
      console.log(this.eventName, buildingStatus)

      this.initialAddressData = {
        eventType: this.eventName,
        buildingId: data.buildingId,
        buildingAddress: normalizeAddress(data.address),
        buildingAddressComponents: data.addressComponents,
        buildingStatus,
        buildingManagement: data.management || management,
        buildingOwner: data.owner || owner
      }
    },
    displayBuildingStatus (event) {
      const { title, terms } = this.buildingStatusConfig[event.type]
      this.status = title
      this.terms = terms
      this.setInitialAddressData(event.type, event.data)
      this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
    },
    catchEvent (event) {
      console.group('Event handler')
      console.log('Event type: ', event.type)
      console.log('Event data:\n', event.data)

      this.eventName = event.type

      if (Object.keys(this.buildingStatusConfig).indexOf(event.type) !== -1) {
        console.log('EVENT AVAILABLE', event.type, normalizeAddress(event.data.address))
        console.log(this.buildingStatusConfig[event.type])

        this.displayBuildingStatus(event)

        console.log('Status: ', this.status, ' Terms: ', this.terms)
        this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
      }
      if (event.type === 'buildings-address-list') {
        if (event.data.store === 'lit') {
          this.litLoading = false
          this.litBuildings = event.data.result
        }
        if (event.data.store === 'footprint') {
          this.footprintLoading = false
          this.footprintBuildings = event.data.result
        }
      }
      console.groupEnd('Event handler')
    },
    refresh (address, type) {
      this.__getBuildingByAddress(normalizeAddress(address))
    },
    clickListItem (eventName, address) {
      this.eventName = eventName
      this.__getBuildingByAddress(normalizeAddress(address))
    }
  },
  beforeDestroy () {
    this.$root.$off('buildings-data-list', this.getBuildings)
    this.$root.$off('building-details', this.getBuildingDetails)
  },
  mounted () {
    const container = document.getElementById('container-for-map')
    this.events.forEach(eventName => container.addEventListener(eventName, this.catchEvent))

    window.google = null

    this.map = new DgtekMap({
      container,
      center: { lat: -37.8357725, lng: 144.9738764 }
    })
    this.__getBuildingsByStatus('lit')
    this.__getBuildingsByStatus('footprint')

    this.$root.$on('buildings-data-list', this.getBuildings)
    this.$root.$on('building-details', this.getBuildingDetails)
  }
}
</script>

<style>
.v-list-item--link {
  user-select: text!important;
}
</style>
