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
              style="width: 240px"
            ></v-select>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            icon
            class="mb-2"
            @click="createBuilding"
          >
            <v-icon color="primary">mdi-plus</v-icon>
            New building
          </v-btn>
        </v-toolbar>
      </template>

      <!-- <template v-slot:item.actions="{ item }">
        <v-btn color="primary" class="mb-2" @click="edit(item)">
          Edit
        </v-btn>
      </template> -->
    </v-data-table>

    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      dense
      outlined
      hide-details
      style="display: inline-block; width: 280px"
    ></v-text-field>

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
    selectedBuildingsNumber: null,
    headers: [
      {
        text: 'Building address',
        align: 'start',
        sortable: true,
        value: 'address'
      },
      { text: 'Building unique code', value: 'buildingUniqueCode' },
      { text: 'Footprint', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false }
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
      // this.selectedBuildingsNumber = result.length
    }
  },

  watch: {
    page (val) {
      buildingsListPageNumberHandler(val)
    }
  },

  methods: {
    getBuildings (data) {
      console.log(data)
      const { result } = data
      this.buildings = result.map(building => ({
        address: building.address,
        buildingUniqueCode: getBuildingUniqueCode(building.addressComponents),
        status: result.buildingStatus,
        id: building.id
      }))

      this.ready = true
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
    this.$root.$on('buildings-address-list', this.getBuildings)
    this.$root.$on('buildings-data-list', this.getBuildings)
    this.__getBuildingsByStatus(buildingStatusHandler() || 'lit')
  }
}
</script>
