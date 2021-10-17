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
      >
        <template v-slot:item.actions="{ item }">
          <v-icon @click.stop="getPartnerCredentials(item)">
            mdi-open-in-new
          </v-icon>
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
      { text: 'Phone (work)', value: 'company.phoneWork' },
      { text: 'Cabinet', value: 'actions', sortable: false }
    ],
    resellers: null,
    details: false,
    rspDetails: null
  }),

  methods: {
    getData (data) {
      this.resellers = data
      this.ready = true
    },

    getPartnerCredentials (partner) {
      console.log(partner._id)
      this.__getPartnerCredentials(partner._id)
    },

    gotoCabinet (data) {
      console.log(data.result)
      console.log(this.$partnerCabinetLink())
      this.__openExternalLink(`${this.$partnerCabinetLink()}#${data.result}`)
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
    this.$root.$on('rsp-list-received', this.getData)
    this.$root.$on('partner-credentials-received', this.gotoCabinet)
    this.__getResellersList()
  },

  beforeDestroy () {
    this.$root.$off('rsp-list-received', this.getData)
    this.$root.$off('partner-credentials-received', this.gotoCabinet)
  }
}

</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
