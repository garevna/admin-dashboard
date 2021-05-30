<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready">
    <v-data-table
      :headers="headers"
      :items="resellers"
      :search="search"
    ></v-data-table>

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
    <span class="ml-12"><small>Total number of RSP: {{ resellers.length }}</small></span>
  </v-card>
</template>

<script>

export default {
  name: 'ListOfResellers',
  data: () => ({
    ready: false,
    search: '',
    headers: [
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
      { text: 'Phone (work)', value: 'company.phoneWork' }
    ],
    resellers: null
  }),

  methods: {
    getData (data) {
      console.log('RSP LIST:\n', data)
      this.resellers = data
      this.ready = true
    }
  },

  beforeMount () {
    console.log(this.__getResellersList)
    this.$root.$on('rsp-list-received', this.getData)
    this.__getResellersList()
  },

  beforeDestroy () {
    this.$root.$off('rsp-list-received', this.getData)
  }
}

</script>
