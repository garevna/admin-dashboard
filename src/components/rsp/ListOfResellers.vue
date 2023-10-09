<template>
  <v-container class="mb-12 pb-12">
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
        class="bottom-search-input"
      ></v-text-field>
      <span class="bottom-info-span">
        <small>
          Total number of partners: {{ resellers.length }}
        </small>
      </span>
    </v-card>

    <ResellerPages v-if="details" :opened.sync="details" />
  </v-container>
</template>

<script>

import { partnerDetailsHandler } from '@/controllers'
import { customerFiltersHandler } from '@/helpers/data-handlers'

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
      console.log('RSP LIST REFRESHED', data)
    },

    showDetails (partnerDetails) {
      partnerDetailsHandler(partnerDetails)
      customerFiltersHandler({
        partnerId: partnerDetails._id,
        serviceId: '',
        type: '',
        status: '',
        serviceActivationMonth: ''
      })

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

.bottom-search-input {
  position: fixed;
  bottom: 36px;
  left: 16px;
  z-index: 55;
  width: 360px;
}

.bottom-info-span {
  position: fixed;
  bottom: 44px;
  left: 420px;
  z-index: 55;
}
</style>
