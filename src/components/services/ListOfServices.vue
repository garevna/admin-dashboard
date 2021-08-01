<template>
  <v-container>
    <v-card flat class="transparent mx-auto" max-width="1200">
      <v-card-title class="my-5">
        <h5><small>Services list</small></h5>
      </v-card-title>

      <v-row class="my-5 mx-2 mr-12">
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

       <v-spacer />

       <v-btn text @click="createNewService">
         <v-icon>mdi-plus</v-icon>
         Create new service
       </v-btn>
     </v-row>

      <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          @click:row="editItem"
      >
        <!-- <template v-slot:item.actions="{ item }">
          <v-btn outlined @click="editItem(item)" dark class="primary">Edit</v-btn>
        </template> -->
      </v-data-table>

      <span class="ml-12"><small>Total selected services: {{ selectedServicesNumber }}</small></span>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'ListOfServices',
  data: () => ({
    items: [],
    search: '',
    selectedServicesNumber: undefined,
    headers: [
      {
        text: 'Service name',
        align: 'start',
        sortable: true,
        value: 'serviceName'
      },
      { text: 'Type', value: 'serviceType' },
      { text: 'Service code', value: 'serviceCode' },
      { text: 'Product type', value: 'productType' },
      { text: 'Contract term (months)', value: 'contractTerm' },
      { text: 'MRC ($)', value: 'subscriptionFee' },
      { text: 'Connection fee', value: 'connectionFee' },
      { text: 'Trial (months)', value: 'freeTrial' }
      // { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),

  methods: {
    getData (data) {
      this.items = data
    },

    createNewService () {
      this.$router.push({ name: 'create-new-service' }).catch(failure => {
        console.log(this.$router.options)
        console.log(failure)
      })
    },

    editItem (item) {
      this.selectedServiceId = item.id
      this.$router.push({ name: 'service-details', params: { serviceId: item._id } })
    }
  },

  beforeDestroy () {
    this.$root.$off('services-list-received', this.getData)
  },

  mounted () {
    this.$vuetify.goTo(0)
    this.$root.$on('services-list-received', this.getData)
    this.__getListOfServices()
  }
}
</script>
