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
    litBuildings: [],
    footprintBuildings: [],
    buildingId: null
  }),

  watch: {
    buildingId (value) {
      value && this.__getBuildingById(value)
    }
  },

  methods: {
    getBuildings (response) {
      this[`${response.store}Buildings`] = response.result.map(item => ({ text: item.address, id: item.id }))
      this[`${response.store}Loading`] = false
    },

    getBuildingDetails (response) {
      const { address, status, addressComponents, coordinates, _id: buildingId, estimatedServiceDeliveryTime } = response.result
      this.$emit('update:building', { address, status, addressComponents, coordinates, buildingId, estimatedServiceDeliveryTime })
    }
  },

  beforeDestroy () {
    this.$root.$off('buildings-data-list', this.getBuildings)
    this.$root.$off('building-details', this.getBuildingDetails)
  },

  mounted () {
    this.$root.$on('buildings-data-list', this.getBuildings)
    this.$root.$on('building-details', this.getBuildingDetails)
    this.__getBuildingsByStatus('lit')
    this.__getBuildingsByStatus('footprint')
  }
}
</script>
