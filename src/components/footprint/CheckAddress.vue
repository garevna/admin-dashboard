<template>
  <v-container ref="container" class="mb-12 pb-12">
    <v-card flat class="transparent" >
      <v-row justify="center">
        <MapSearch :building.sync="buildingDetails" />
      </v-row>
      <v-row justify="center" style="position: relative; margin-bottom: 120px;">
        <GoogleAutocomplete :building.sync="buildingDetails" />
      </v-row>

      <v-card id="dgtek-address-search-results" class="transparent mx-auto py-10 mb-12 text-center" outlined>

        <v-card-text text-center v-if="buildingDetails && buildingDetails.address">
          <p>DGtek service at</p>
          <h5>{{ buildingDetails.address }}</h5>
          <p>check results</p>
          <p>Status: <b>{{ statusToDisplay }}</b></p>
          <p>
            Estimated service delivery time:
            <b>{{ buildingDetails.estimatedServiceDeliveryTime }}</b>
          </p>
        </v-card-text>

        <v-card-text text-center v-if="showButtons">
          <v-btn
            v-if="!buildingDetails.buildingId"
            outlined
            color="buttons"
            class="mx-2"
            :disabled="accessRights !== 2"
            @click="createNewBuilding"
          >
            Add new building
          </v-btn>

          <v-btn
            v-else
            outlined
            color="buttons"
            class="mx-2"
            @click="editSelectedBuilding"
          >
            Edit selected building details
          </v-btn>
        </v-card-text>
      </v-card>

      <SelectFromList :building.sync="buildingDetails" />
    </v-card>
  </v-container>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

import MapSearch from '@/components/footprint/search-address/MapSearch.vue'
import GoogleAutocomplete from '@/components/footprint/search-address/GoogleAutocomplete.vue'
import SelectFromList from '@/components/footprint/search-address/SelectFromList.vue'

export default {
  name: 'CheckAddress',

  components: {
    MapSearch,
    GoogleAutocomplete,
    SelectFromList
  },

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    accessRights: accessRightsHandler().access[roleHandler()].buildings,
    buildingDetails: {},
    statusToDisplay: '',
    showButtons: false,
    scrollSize: null,
    newBuildingId: null
  }),

  watch: {
    buildingDetails: {
      deep: true,
      handler (data) {
        data && this.__getEstimatedServiceDeliveryTime(data.status, this.getSettings)
      }
    }
  },

  methods: {
    // getAllSettings (data) {
    //   console.log('ALL SETTINGS:\n', data)
    // },

    getSettings (settings) {
      const { toDisplay, estimatedServiceDeliveryTime, buildingStatus } = settings
      this.statusToDisplay = toDisplay
      Object.assign(this.buildingDetails, { status: buildingStatus })
      !this.buildingDetails.estimatedServiceDeliveryTime && Object.assign(this.buildingDetails, { estimatedServiceDeliveryTime })
      this.showButtons = true

      document.getElementById('app').scrollTo({ top: this.scrollSize, left: 0, behavior: 'smooth' })
    },

    createNewBuilding () {
      const {
        address,
        addressComponents,
        coordinates,
        status,
        estimatedServiceDeliveryTime
      } = this.buildingDetails

      this.worker.createNewBuilding({ address, addressComponents, coordinates, status, estimatedServiceDeliveryTime }, this.newBuildingCreated)
    },

    newBuildingCreated (buildingId) {
      this.newBuildingId = buildingId
      this.gotoBuildingEditor(this.newBuildingId)
    },

    gotoBuildingEditor (buildingId) {
      this.$router.push({ name: 'building-details', params: { buildingId } })
        .catch(failure => console.warn('Router failure:\n', failure))
    },

    editSelectedBuilding () {
      this.gotoBuildingEditor(this.buildingDetails.buildingId)
    },

    catchGoogleAutocompleteEvent (event) {
      const { address, addressComponents, status, buildingId, url, coordinates, estimatedServiceDeliveryTime } = event.detail

      if (addressComponents.isSlave) {
        if (addressComponents.masterBuildingId) {
          this.worker.getBuildingDetailsById(addressComponents.masterBuildingId, this.getMasterBuildingDetails)
          this.$root.$emit('open-error-popup', {
            errorType: 'Slave building found',
            errorMessage: 'Search for master building'
          })
        } else {
          this.$root.$emit('open-error-popup', {
            errorType: 'Slave building found',
            errorMessage: 'Master building is not defined'
          })
        }
      }

      this.buildingDetails = { address, addressComponents, status, buildingId, estimatedServiceDeliveryTime, coordinates, url }

      this.__getEstimatedServiceDeliveryTime(status, this.getSettings)
    },

    errorEventListener (event) {
      this.$root.$emit('open-error-popup', event.detail)
    }
  },

  beforeDestroy () {
    this.__removeGoogleMaps()
    window.removeEventListener('new-address-data', this.catchGoogleAutocompleteEvent)
    window.removeEventListener('open-error-popup', this.errorEventListener)
  },

  beforeMount () {
    this.__removeGoogleMaps()
    window.addEventListener('open-error-popup', this.errorEventListener)
    // this.__getEstimatedServiceDeliveryTime('all', this.getAllSettings)
  },

  mounted () {
    this.scrollSize = document.getElementById('dgtek-address-search-results').getBoundingClientRect().top
    window.addEventListener('new-address-data', this.catchGoogleAutocompleteEvent)
  }
}
</script>

<style>

.v-list-item--link {
  user-select: text!important;
}

.v-list-item--dense, .v-list--dense .v-list-item {
  min-height: 28px!important;
}
</style>
