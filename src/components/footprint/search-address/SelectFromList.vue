<template>
  <v-row justify="center" ref="list">
    <v-col cols="12" md="6" lg="5" xl="4">
      <v-card flat class="transparent">
        <ShortList
          title="On-net buildings"
          :list="litBuildings"
          :selected.sync="buildingId"
        />
      </v-card>
    </v-col>
    <v-col cols="12" md="6" lg="5" xl="4">
      <v-card flat class="transparent">
        <ShortList
          title="Upcoming buildings"
          :list="footprintBuildings"
          :selected.sync="buildingId"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import ShortList from '@/components/inputs/ShortList.vue'

export default {
  name: 'SelectFromList',

  components: {
    ShortList
  },

  props: ['building'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    litBuildings: [],
    footprintBuildings: [],
    buildingId: null
  }),

  watch: {
    buildingId (id) {
      id && this.worker.getBuildingDetailsById(id, this.getBuildingDetails)
    }
  },

  methods: {
    getBuildings (data) {
      this[`${data.buildingStatus.toLowerCase()}Buildings`] = data.map(item => ({ text: item.address, id: item.id }))
      this[`${data.buildingStatus.toLowerCase()}Loading`] = false
    },

    getBuildingDetails (data) {
      const { address, status, addressComponents, uniqueCode, coordinates, _id: buildingId, estimatedServiceDeliveryTime } = data
      this.$emit('update:building', { address, status, addressComponents, uniqueCode, coordinates, buildingId, estimatedServiceDeliveryTime })
    }
  },

  mounted () {
    this.worker.getBuildingsListForTable('lit', this.getBuildings)
    this.worker.getBuildingsListForTable('footprint', this.getBuildings)
  }
}
</script>
