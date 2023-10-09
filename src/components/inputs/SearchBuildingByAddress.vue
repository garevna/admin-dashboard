<template>
  <div id="autocomplete-container">
    <v-autocomplete
      attach="#autocomplete-container"
      v-model="building"
      :items="buildings"
      item-text="address"
      :search-input.sync="search"
      return-object
      outlined
      dense
      hide-details
      label="Building address"
      clearable
    />
  </div>
</template>

<script>

export default {
  name: 'SearchBuildingByAddress',

  props: ['buildingId', 'address', 'postCode', 'buildingUniqueCode'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    buildings: [],
    search: null
  }),

  computed: {
    building: {
      get () {
        return {
          address: this.address,
          buildingId: this.buildingId
        }
      },
      set (build) {
        const { buildingId, address, postCode, buildingUniqueCode } = build
        this.$emit('update:buildingId', buildingId)
        this.$emit('update:address', address)
        this.$emit('update:postCode', postCode)
        this.$emit('update:buildingUniqueCode', buildingUniqueCode)
      }
    }
  },

  watch: {
    search (val) {
      val && val !== this.address && this.getVariants(val)
    },

    building: {
      deep: true,
      handler (build) {
        console.log('BUILDING CHANGED:\n', build)

        const { address = '', buildingId = null, postCode = '', buildingUniqueCode = '' } = build

        this.$emit('update:buildingId', buildingId)
        this.$emit('update:address', address)
        this.$emit('update:postCode', postCode)
        this.$emit('update:buildingUniqueCode', buildingUniqueCode)
      }
    }
  },

  methods: {
    getVariants (address) {
      if (typeof address !== 'string' || address.length < 3) return this.getBuildingList([])
      this.worker.searchByPartOfAddress(address.toUpperCase(), this.getBuildingList)
    },

    getBuildingList (list) {
      this.buildings = !Array.isArray(list) ? [] : list
    }
  },

  mounted () {
    this.building = {
      address: this.address,
      buildingId: this.buildingId
    }

    this.worker.searchByPartOfAddress(this.address, this.getBuildingList)
  }
}
</script>

<style scoped>

#autocomplete-container {
  position: relative;
}
#autocomplete-container > .v-autocomplete__content.v-menu__content {
  position: relative !important;
  top: 204px !important;
  left: 616px !important;
  max-height: 280px !important;
}
</style>
