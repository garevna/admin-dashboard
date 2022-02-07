<template>
  <v-container class="mb-12 pb-12">
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
        fixed-header
        :footer-props="{
          showFirstLastPage: true,
          itemsPerPage: 10,
          itemsPerPageOptions: [10, 20, 50, 100, -1],
          firstIcon: 'mdi-skip-previous',
          lastIcon: 'mdi-skip-next',
          prevIcon: 'mdi-chevron-left',
          nextIcon: 'mdi-chevron-right'
        }"
        :search="search"
        @click:row="editItem"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn text @click.stop="deleteItem(item)">
            <v-icon small color="primary">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <span class="bottom-info mx-4">
        <small>
          Total selected services: {{ selectedServicesNumber }}
        </small>
      </span>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'ListOfServices',
  data: () => ({
    items: [],
    search: '',
    headers: [
      { text: 'Actions', value: 'actions', sortable: false },
      { text: 'Service name', align: 'start', sortable: true, value: 'serviceName' },
      { text: 'Type', value: 'serviceType' },
      { text: 'Service code', value: 'serviceCode' },
      { text: 'Product type', value: 'productType' },
      { text: 'Contract term (months)', value: 'contractTerm' },
      { text: 'MRC ($)', value: 'subscriptionFee' },
      { text: 'Connection fee', value: 'connectionFee' },
      { text: 'Trial (months)', value: 'freeTrial' }
    ]
  }),

  computed: {
    selectedServicesNumber () {
      return this.items.length
    }
  },

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

    deleteItem (item) {
      this.selectedServiceId = item._id
      this.$root.$emit('open-confirmation-popup', {
        title: item.serviceName,
        message: `Do you really want to delete service ${item.serviceName}?`
      })
    },

    confirmationReceived () {
      this.__deleteService(this.selectedServiceId, this.serviceDeleted)
    },

    serviceDeleted () {
      const index = this.items.findIndex(item => item._id === this.selectedServiceId)
      index !== -1 && this.items.splice(index, 1)
    },

    editItem (item) {
      this.selectedServiceId = item.id
      this.$router.push({ name: 'service-details', params: { serviceId: item._id } })
    }
  },

  beforeMount () {
    this.__getListOfServices(this.getData)
  },

  beforeDestroy () {
    this.$root.$off('operation-confirmed', this.confirmationReceived)
  },

  mounted () {
    this.$vuetify.goTo(0)
    this.$root.$on('operation-confirmed', this.confirmationReceived)
  }
}
</script>

<style>

.bottom-info {
  position: fixed;
  bottom: 42px;
  left: 16px;
  z-index: 55;
}
.v-application--is-ltr .v-data-table--fixed-header .v-data-footer {
  margin-right: -8px!important;
  bottom: 24px;
  position: fixed;
  background: #ddd;
  left: 0;
  right: 0;
  padding: 0 16px;
  z-index: 18;
}

.v-menu__content--fixed {
  top: calc(100% - 340px) !important;
  bottom: 80px !important;
}

.v-list-item__title {
  font-size: 0.8rem !important;
}
</style>
