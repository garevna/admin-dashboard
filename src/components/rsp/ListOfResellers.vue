<template>
  <v-container>
    <v-card flat class="transparent pb-12 px-12" v-if="ready && !details">
      <v-card-title>
        <strong>DGtek partners list</strong>
        <v-spacer />
        <v-btn text @click="refresh" class="mr-12 mb-5">
          <v-icon>mdi-refresh</v-icon>
          Refresh
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="resellers"
        :search="search"
        @click:row="showDetails"
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

    <ResellerPages
      v-if="details"
      :opened.sync="details"
      :resellerDetails="rspDetails"
    />
  </v-container>
</template>

<script>

export default {
  name: 'ListOfResellers',

  components: {
    ResellerPages: () => import(/* webpackChunkName: 'reseller-pages' */ '@/components/rsp/ResellerPages.vue')
  },

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
    resellers: null,
    details: false,
    rspDetails: null
  }),

  methods: {
    getData (data) {
      console.log('RSP LIST:\n', data)
      this.resellers = data
      this.ready = true
    },

    refresh () {
      this.__refreshPartnersList()
    },

    showDetails (rsp) {
      this.rspDetails = rsp
      this.details = true
    }
  },

  beforeMount () {
    // console.log(this.__getResellersList)
    this.$root.$on('rsp-list-received', this.getData)
    this.__getResellersList()
  },

  beforeDestroy () {
    this.$root.$off('rsp-list-received', this.getData)
  }
}

</script>
