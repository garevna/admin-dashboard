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

    <ResellerPages v-if="details" :opened.sync="details" />
  </v-container>
</template>

<script>

import { partnerDetailsHandler } from '@/controllers'

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
    details: false
  }),

  methods: {
    getData (data) {
      this.resellers = data

      const partnerId = window[Symbol.for('message-from-partner.id')]

      if (partnerId) {
        partnerDetailsHandler(this.resellers.find(item => item._id === partnerId))
        window[Symbol.for('message-from-partner.id')] = null
        this.details = Boolean(partnerDetailsHandler())
      }

      this.ready = true
    },

    getPartnerCredentials (partner) {
      this.__getPartnerCredentials(partner._id, this.gotoCabinet)
    },

    gotoCabinet (data) {
      this.__openExternalLink(`${this.$partnerCabinetLink()}#${data.result}`)
    },

    refresh () {
      this.__refreshPartnersList(this.refreshed)
    },

    refreshed (data) {
      console.log('RSP LIST REFRESHED')
    },

    showDetails (partnerDetails) {
      partnerDetailsHandler(partnerDetails)
      this.details = true
    },

    getUpdates (data) {
      if (data.length) this.__getResellersList(this.getData)
    }
  },

  beforeDestroy () {
    this.$root.$off('partners-updates-received', this.getUpdates)
  },

  beforeMount () {
    this.__getResellersList(this.getData)
    this.$root.$on('partners-updates-received', this.getUpdates)
  }
}

</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
