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

        <v-btn text dark class="primary" @click="saveResellerServices">
          SAVE UPDATES
        </v-btn>
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

  props: ['resellerId'],

  data: () => ({
    services: [],
    resellerServices: [],
    selectedService: null,
    deselectedService: null
  }),

  watch: {
    selectedService (value) {
      console.log('SELECTED SERVICE: ', value)
      if (value) this.deselectedService = null
    },
    deselectedService (value) {
      console.log('DESELECTED SERVICE: ', value)
      if (value) this.selectedService = null
    }
  },

  methods: {
    getData (data) {
      this.services = data.map(service => ({ id: service._id, text: service.serviceName }))
    },
    selectService () {
      console.log('SELECTED:', this.selectedService)
      this.deselectedService = null
      const selected = this.selectedService
      this.resellerServices.push(this.services.find(item => item.id === selected))
    },
    deselectService () {
      console.log(this.deselectedService)
      const index = this.resellerServices.findIndex(item => item.id === this.deselectedService)
      console.log(index)
      index !== -1 && this.resellerServices.splice(index, 1)
    },

    saveResellerServices () {
      //
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
