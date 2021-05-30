<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready">
    <v-card-title>
      Leads requests
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="requests"
      :search="search"
    >
      <template v-slot:item.reject="{ item }">
          <v-icon
            small
            color="#888"
            class="table-icon-button"
            @click="reject(item)"
          > mdi-trash-can </v-icon>
      </template>

      <template v-slot:item.confirm="{ item }">
        <!-- <v-btn outlined @click="confirm(item)" color="primary"> -->
          <v-icon
            small
            color="primary"
            class="table-icon-button"
            @click="confirm(item)"
          > mdi-account-plus </v-icon>
          <!-- Confirm -->
        <!-- </v-btn> -->
      </template>
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
    <span class="ml-12"><small>Total number of requests: {{ requests.length }}</small></span>
  </v-card>
</template>

<script>

export default {
  name: 'RegistrationRequests',
  data: () => ({
    ready: false,
    search: '',
    headers: [
      { text: 'Reject', value: 'reject', sortable: false },
      {
        text: 'Company name',
        align: 'start',
        sortable: false,
        value: 'company.name'
      },
      { text: 'ABN', value: 'company.abn' },
      { text: 'Address', value: 'company.address' },
      { text: 'Primary contact', value: 'company.primaryContact' },
      { text: 'Phone (mobile)', value: 'company.phoneMobile' },
      { text: 'Phone (work)', value: 'company.phoneWork' },
      { text: 'Confirm', value: 'confirm', sortable: false }
    ],
    requests: null
  }),

  methods: {
    getData (data) {
      console.log('REGISTRATION REQUESTS:\n', data)
      this.requests = data
      this.ready = true
    },
    edit (item) {

    },
    confirm (request) {
      this.__confirmRegistrationRequest(request._id)
    },
    reject (request) {
      this.$root.$emit('open-confirmation-popup', {
        title: 'Reject leads request',
        message: 'Are you sure you wish to reject this request?',
        source: request._id
      })
    },

    rejectConfirmed (id) {
      this.__rejectRegistrationRequest(id)
    }
  },

  beforeMount () {
    this.$root.$on('operation-confirmed', this.rejectConfirmed)
    this.$root.$on('registration-requests-received', this.getData)
    this.__getRegistrationRequests()
  },

  beforeDestroy () {
    this.$root.$off('operation-confirmed', this.rejectConfirmed)
    this.$root.$off('registration-requests-received', this.getData)
  }
}

</script>

<style scoped>
.table-icon-button {
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 4px;
}
</style>
