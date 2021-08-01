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

        <v-card-text text-center v-if="showButtons">
          <v-btn v-if="!buildingId" outlined color="buttons" class="mx-2" @click="createNewBuilding">
            Add new building
          </v-btn>

          <v-btn v-if="buildingId" outlined color="buttons" class="mx-2" @click="editSelectedBuilding">
            Edit selected building details
          </v-btn>
        </v-card-text>
      </v-card>

      <v-row justify="center" ref="list">
        <v-col cols="12" md="6" lg="5" xl="4">
          <v-card flat class="transparent">
            <ShortList
              title="On-net buildings"
              :list="litBuildings"
              :selected.sync="litBuildingId"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="5" xl="4">
          <v-card flat class="transparent">
            <ShortList
              title="Upcoming buildings"
              :list="footprintBuildings"
              :selected.sync="footprintBuildingId"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>

/* eslint-disable no-new */

import DgtekMap from 'dgtek-map'
import { dgtekMapEvents, buildingStatusConfig } from '@/configs'

import { buildingStatusHandler /*, buildingsListPageNumberHandler */ } from '@/controllers/data-handlers'

const events = {
  'on-net': ['LIT'],
  footprint: ['Footprint', 'ServiceAvailable'],
  'construction-commenced': ['BuildCommenced', 'UnderConstruction'],
  'coming soon': ['ComingSoon'],
  'not available': ['other']
}

const statusConfig = {
  'on-net': 'LIT',
  footprint: 'Footprint',
  'construction-commenced': 'BuildCommenced',
  'coming-soon': 'ComingSoon',
  'not-available': 'Other'
}

events.getEventName = function (status) {
  for (const key in this) {
    if (this[key].includes(status)) return key
  }
}

export default {
  name: 'CheckAddress',

  components: {
    ShortList: () => import('@/components/inputs/ShortList.vue')
  },

  data: () => ({
    map: null,

    events: dgtekMapEvents,
    buildingStatusConfig: buildingStatusConfig,
    buildingId: '',
    address: '',
    buildingDetails: {},

    eventName: '',
    status: '',
    terms: '',

    scrollOptions: {
      duration: 500,
      offset: 0,
      easing: 'easeInOutCubic'
    },

    showButtons: false,

    litBuildings: [],
    litBuildingId: null,
    litAddress: '',
    litLoading: true,

    footprintBuildings: [],
    footprintBuildingId: null,
    footprintAddress: '',
    footprintLoading: true
  }),

  watch: {
    buildingDetails: {
      deep: true,
      handler (val) {
        //
      }
    },

    buildingId (value) {
      if (!value) {
        this.footprintBuildingId = null
        this.litBuildingId = null
      }
    },

    litBuildingId (value) {
      if (value) {
        this.buildingId = value
        this.address = this.litBuildings.find(building => building.id === value).text
        this.footprintBuildingId = null
        this.refresh('on-net')
        this.showButtons = true
      }
    },

    footprintBuildingId (value) {
      if (value) {
        this.buildingId = value
        this.address = this.footprintBuildings.find(building => building.id === value).text
        this.litBuildingId = null
        this.refresh('footprint')
        this.showButtons = true
      }
    }
  },

  methods: {
    getBuildings (response) {
      this[`${response.store}Buildings`] = response.result.map(item => ({ text: item.address, id: item.id }))
      this[`${response.store}Loading`] = false
    },

    createNewBuilding () {
      const {
        buildingAddress: address,
        buildingAddressComponents: addressComponents,
        buildingCoordinates: coordinates,
        buildingStatus: status
      } = this.buildingDetails

      this.__postBuildingDetails({ address, addressComponents, coordinates, status })
    },

    gotoBuildingEditor (data) {
      const buildingId = typeof data !== 'string' ? data.result : data
      buildingStatusHandler(data.status)
      this.$router.push({ name: 'building-details', params: { buildingId } })
        .catch(failure => console.warn('Router failure:\n', failure))
    },

    editSelectedBuilding () {
      this.gotoBuildingEditor(this.buildingId)
    },

    getBuildingDetails (response) {
      const { status } = response.result

      const eventType = events.getEventName(status)

      this.setInitialAddressData(eventType, response.result)
      const { title } = this.buildingStatusConfig[eventType || this.eventName]
      this.status = title
      this.terms = response.result.estimatedServiceDeliveryTime
      this.$vuetify.$goTo(this.$refs.list, this.scrollOptions)
    },

    setInitialAddressData (eventType, data) {
      if (eventType) this.eventName = eventType

      this.buildingId = data.buildingId || this.buildingId
      this.address = data.address

      this.buildingDetails = {
        eventType: this.eventName,
        buildingId: data.buildingId,
        buildingAddress: data.address,
        buildingAddressComponents: data.addressComponents,
        buildingCoordinates: data.coordinates,
        buildingStatus: statusConfig[this.eventName]
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
      this.eventName = event.type
      this.showButtons = true
      this.buildingId = event.data.buildingId

      if (Object.keys(this.buildingStatusConfig).indexOf(event.type) !== -1) {
        this.displayBuildingStatus(event)
        this.$vuetify.goTo('#searchAddressResults', this.scrollOptions)
      }

      if (event.type === 'buildings-address-list') {
        if (event.data.store === 'lit') {
          this.litLoading = false
          this.litBuildings = event.data.result.map(item => ({ text: item.address, id: item.id }))
        }
        if (event.data.store === 'footprint') {
          this.footprintLoading = false
          this.footprintBuildings = event.data.result.map(item => ({ text: item.address, id: item.id }))
        }
      }
    },

    refresh () {
      this.__getBuildingById(this.buildingId)
    },

    clickListItem (eventName, address) {
      this.eventName = eventName
      this.__getBuildingByAddress(address)
    }
  },

  beforeDestroy () {
    this.$root.$off('buildings-data-list', this.getBuildings)
    this.$root.$off('building-details', this.getBuildingDetails)
    this.$root.$off('new-building-created', this.gotoBuildingEditor)
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

    this.$root.$on('new-building-created', this.gotoBuildingEditor)
  }
}
</script>

<style>

/* .v-application--is-ltr .v-data-footer__select {
  visibility: hidden;
} */

.v-list-item--link {
  user-select: text!important;
}

.v-list-item--dense, .v-list--dense .v-list-item {
  min-height: 28px!important;
}
</style>
