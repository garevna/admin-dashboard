<template>
  <v-container v-if="ready" style="max-width: 960px">
    <v-data-table
      v-model="selects"
      :headers="headers"
      :items="filteredItems"
      :search="search"
      :page.sync="page"
      show-select
      class="transparent"
      @click:row="edit($event)"
    >
      <template v-slot:item.selected="{ item }">
        <v-checkbox v-model="item.selected" hide-details label="" dense @click.stop="selectItem" />
      </template>

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
          <v-btn v-if="selects.length" text class="mb-2" @click="updateGroup" color="primary">
            <v-icon>mdi-pencil-box-multiple-outline</v-icon>
            Group update
          </v-btn>

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

      <template v-slot:item.actions="{ item }">
        <v-btn text @click.stop="deleteBuilding(item)">
          <v-icon samll color="primary">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <span class="ml-12"><small>Total selected buildings: {{ selectedBuildingsNumber }}</small></span>

    <GroupUpdate
      v-if="selects.length"
      :dialog.sync="groupUpdate"
      :items.sync="selects"
      :groupUpdated.sync="groupUpdated"
    />
  </v-container>
</template>

<script>

import { getBuildingUniqueCode } from '@/helpers'
import { buildingStatusHandler, buildingsListPageNumberHandler } from '@/controllers/data-handlers'

import GroupUpdate from '@/components/footprint/GroupUpdate.vue'

const { footprintOptions } = require('@/configs').default

export default {
  name: 'BuildingsList',

  components: {
    GroupUpdate
  },

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    ready: false,
    buildings: [],
    selects: [],
    groupUpdate: false,
    groupUpdated: false,
    toBeRemoved: null,
    search: '',
    page: buildingsListPageNumberHandler(),
    footprintOptions,
    selectedBuildingId: undefined,
    headers: [
      { text: 'Building address', align: 'start', sortable: true, value: 'address' },
      { text: 'Building unique code', value: 'uniqueCode' },
      { text: 'Footprint', value: 'status' },
      { text: 'Estimated service delivery time', value: 'estimatedServiceDeliveryTime' },
      { text: '', value: 'actions', sortable: false }

    ]
  }),

  computed: {
    selectedStatus () {
      return this.$route.name.split('-buildings')[0]
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
    },
    groupUpdated (val) {
      if (val) this.requestBuildingList()
      this.selects = []
    },
    $route: {
      deep: true,
      handler (val) {
        this.worker.getBuildingsListForTable(val.name.split('-buildings')[0], this.getBuildings)
      }
    }
  },

  methods: {
    statusChanged (val) {
      buildingStatusHandler(val)
      this.requestBuildingList()
    },

    requestBuildingList () {
      this.$root.$emit('progress-event', true)
      this.worker.getBuildingsListForTable(this.selectedStatus, this.getBuildings)
    },

    getBuildings (data) {
      this.$root.$emit('progress-event', false)
      this.buildings = data.map(building => ({
        address: building.address,
        uniqueCode: building.uniqueCode || getBuildingUniqueCode(building.addressComponents),
        status: data.buildingStatus,
        estimatedServiceDeliveryTime: building.estimatedServiceDeliveryTime,
        id: building.id,
        selected: false
      }))

      this.ready = true
    },

    refresh () {
      this.$root.$emit('progress-event', true)
      this.ready = false
      this.buildings = []
      this.worker.refresh(this.getRefreshedBuildings)
    },

    getRefreshedBuildings () {
      this.$root.$emit('progress-event', false)
      this.requestBuildingList()
    },

    updateGroup () {
      this.groupUpdate = true
      this.requestBuildingList()
    },

    edit (item) {
      this.selectedBuildingId = item.id
      const { address, uniqueCode, status, estimatedServiceDeliveryTime } = item
      window[Symbol.for('selected-building-general-info')] = { address, uniqueCode, status, estimatedServiceDeliveryTime }
      console.log(window[Symbol.for('selected-building-general-info')])

      this.$router.push({ name: 'building-details', params: { buildingId: this.selectedBuildingId } })
        .catch(failure => console.warn('Router failure:\n', failure))
    },

    createBuilding () {
      this.$router.push({ name: 'footprint' }).catch(failure => console.warn('Router failure:\n', failure))
    },

    deleteBuilding (building) {
      this.toBeRemoved = building.id
      this.$root.$emit('open-confirmation-popup', {
        title: building.address,
        message: `Do you really want to delete building ${building.buildingUniqueCode}?`
      })
    },

    confirmationReceived () {
      this.worker.deleteBuilding(this.toBeRemoved, this.requestBuildingList)
    },

    selectItem (item) {
      this.selects = this.buildings.filter(item => item.selected)
        .map(item => ({ id: item.id, status: item.status, estimatedServiceDeliveryTime: item.estimatedServiceDeliveryTime, address: item.address }))
    },

    buildingsGroupUpdated () {
      this.worker.getBuildingsListForTable(this.selectedStatus, this.getBuildings)
    }
  },
  beforeDestroy () {
    this.$root.$off('operation-confirmed', this.confirmationReceived)
  },

  mounted () {
    this.page = buildingsListPageNumberHandler()
    this.$root.$on('operation-confirmed', this.confirmationReceived)
    this.requestBuildingList()
  }
}
</script>
