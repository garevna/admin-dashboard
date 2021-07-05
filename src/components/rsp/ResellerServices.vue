<template>
  <v-container>
    <table width="960" class="mx-auto">
      <tr>
        <td>
          <ShortList
            title="List of services"
            :list="services"
            :selected.sync="selectedService"
            :height="480"
          />
        </td>
        <td>
          <v-row>
            <v-btn text @click="selectService">
              Add <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn text @click="deselectService">
              <v-icon>mdi-arrow-left</v-icon> Remove
            </v-btn>
          </v-row>
        </td>
        <td>
          <ShortList
            title="RSP services"
            :list="resellerServices"
            :selected.sync="deselectedService"
            :height="480"
          />
        </td>
      </tr>
    </table>
  </v-container>
</template>

<script>
export default {
  name: 'ResellerServicesList',

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
      console.log(value)
    },
    deselectedService (value) {
      console.log(value)
    }
  },

  methods: {
    getData (data) {
      // console.log(data)
      this.services = data.map(service => ({ id: service._id, text: service.serviceName }))
    },
    selectService () {
      console.log(this.selectedService)
    },
    deselectService () {
      console.log(this.deselectedService)
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
