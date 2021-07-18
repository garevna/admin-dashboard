<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <v-col style="height: 75vh; max-width: 480px">
        <ShortList
          title="List of services"
          :list="services"
          :selected.sync="selectedService"
          :height="480"
          :disabled="resellerServices"
        />
      </v-col>
      <v-col style="height: 75vh; vertical-align: middle; max-width: 140px; padding-top: 25vh">
        <v-btn text v-if="selectedService" @click="selectService" style="width: 100%; text-align: center;">
          Add <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn text v-if="deselectedService" @click="deselectService" style="width: 100%; text-align: center;">
          <v-icon>mdi-chevron-left</v-icon> Remove
        </v-btn>
      </v-col>
      <v-col style="height: 75vh; max-width: 480px; text-align: center">
        <ShortList
          title="RSP services"
          :list="resellerServices"
          :selected.sync="deselectedService"
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
export default {
  name: 'ResellerServices',

  components: {
    ShortList: () => import('@/components/inputs/ShortList.vue')
  },

  props: ['details'],

  data: () => ({
    services: [],
    resellerServices: [],
    selectedService: null,
    deselectedService: null
  }),

  watch: {
    selectedService (value) {
      if (value) this.deselectedService = null
    },
    deselectedService (value) {
      if (value) this.selectedService = null
    }
  },

  methods: {
    mapServices (data) {
      return data.map(service => ({ id: service._id, text: service.serviceName, partners: service.partners || [] }))
    },
    getData (data) {
      this.services = this.mapServices(data)
      this.resellerServices = this.mapServices(data.filter(service => service.partners.find(partner => partner === this.details._id)))
    },

    selectService () {
      this.deselectedService = null
      this.resellerServices.push(this.services.find(item => item.id === this.selectedService))
    },

    deselectService () {
      const index = this.resellerServices.findIndex(item => item.id === this.deselectedService)
      index !== -1 && this.resellerServices.splice(index, 1)
    },

    saveResellerServices () {
      for (const service of this.resellerServices) {
        if (!service.partners.find(partnerId => partnerId === this.details._id)) {
          service.partners.push(this.details._id)
          this.__patchServiceDetails(service.id, { partners: service.partners })
        }
      }
    }
  },

  beforeMount () {
    this.$root.$on('services-list-received', this.getData)
    this.__getListOfServices()
  },

  beforeDestroy () {
    this.$root.$off('services-list-received', this.getData)
  }
}
</script>
