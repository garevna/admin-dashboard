<template>
  <v-container v-if="ready" style="max-width: 800px">
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :search="search"
      :page.sync="page"
      class="transparent"
      @click:row="edit($event)"
    >
      <template v-slot:footer.prepend>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          dense
          outlined
          hide-details
          style="display: inline-block; width: 240px"
        ></v-text-field>
      </template>

      <template v-slot:top>
        <v-toolbar flat class="transparent">
          <v-toolbar-title>
            <v-select
              :items="available"
              item-text="title"
              item-value="value"
              v-model="status"
              label="Building status"
              outlined
              dense
              color="#900"
              class="mt-4"
              style="width: 300px"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </v-toolbar-title>

          <v-spacer />

          <v-btn text class="mb-2" @click="refresh">
            <v-icon>mdi-refresh</v-icon>
            Refresh
          </v-btn>

          <v-spacer />

          <v-btn
            text
            color="primary"
            class="mb-2"
            @click="createBuilding"
          >
            <v-icon color="primary">mdi-plus</v-icon>
            New building
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>

    <span class="ml-12"><small>Total selected buildings: {{ selectedBuildingsNumber }}</small></span>
  </v-container>
</template>

<script>

import { getBuildingUniqueCode } from '@/helpers'
import { buildingStatusHandler, buildingsListPageNumberHandler } from '@/controllers/data-handlers'
import { footprintOptions } from '@/configs'

export default {
  name: 'BuildingsList',

  data: () => ({
    ready: false,
    buildings: [],
    search: '',
    page: buildingsListPageNumberHandler(),
    available: footprintOptions,
    selectedBuildingId: undefined,
    // selectedBuildingsNumber: null,
    headers: [
      {
        text: 'Building address',
        align: 'start',
        sortable: true,
        value: 'address'
      },
      { text: 'Building unique code', value: 'buildingUniqueCode' },
      { text: 'Footprint', value: 'status' },
      { text: 'Estimated service delivery time', value: 'estimatedServiceDeliveryTime' }
    ]
  }),

  computed: {
    status: {
      get () {
        return buildingStatusHandler()
      },
      set (value) {
        if (value !== buildingStatusHandler()) {
          buildingStatusHandler(value)
          this.__getBuildingsByStatus(buildingStatusHandler())
        }
      }
    },
    filteredItems () {
      return this.ready ? this.buildings.filter(building => !this.postCode || (building.addressComponents.postCode === this.postCode)) : []
    },
    selectedBuildingsNumber () {
      return this.filteredItems.length
    }
  },

  watch: {
    page (val) {
      buildingsListPageNumberHandler(val)
    }
  },

  methods: {
    getBuildings (data) {
      const { result } = data
      this.buildings = result.map(building => ({
        address: building.address,
        buildingUniqueCode: getBuildingUniqueCode(building.addressComponents),
        status: result.buildingStatus,
        estimatedServiceDeliveryTime: building.estimatedServiceDeliveryTime,
        id: building.id
      }))

      this.ready = true
    },

    refresh () {
      this.ready = false
      this.buildings = []
      this.__refreshBuildings()
    },

    getRefreshedBuildings () {
      this.status = buildingStatusHandler()
      this.__getBuildingsByStatus(buildingStatusHandler())
    },

    edit (item) {
      const buildingId = item.id
      this.$router.push({ name: 'building-details', params: { buildingId } })
    },

    createBuilding () {
      this.$router.push({ name: 'footprint' })
    }
  },
  beforeDestroy () {
    this.$root.$off('buildings-data-received', this.getBuildings)
    this.$root.$off('buildings-list-received', this.getBuildings)
  },

  mounted () {
    this.page = buildingsListPageNumberHandler()

    this.$root.$on('buildings-refreshed', this.getRefreshedBuildings)
    this.$root.$on('buildings-address-list', this.getBuildings)
    this.$root.$on('buildings-data-list', this.getBuildings)

    if (!buildingStatusHandler()) buildingStatusHandler('lit')

    this.__getBuildingsByStatus(buildingStatusHandler())
  }
}
</script>

<style>
.v-application--is-ltr .v-data-footer__select {
  visibility: hidden;
}
</style>
