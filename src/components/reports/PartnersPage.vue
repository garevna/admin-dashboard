<template>
  <v-row class="mb-12">
    <v-col cols="5">
      <v-card dark class="mt-12 pa-4" color="#003" width="600">
        <PartnersDash
          v-if="showOverview"
          :partnersData="partnersOverviewData"
          :clicked.sync="selectedPartnerIndex"
        />
      </v-card>
    </v-col>
    <v-col cols="7">
      <v-sheet
        color="transparent"
        height="480"
        class="mt-8"
      >
        <PartnersOverviewDiagram v-if="showOverview && !showPartner" :sourceData="partnersOverviewData" />
        <PartnerMRRDiagram v-if="showPartner" :sourceData="partnerData" />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'PartnersPage',

  components: {
    PartnersDash: () => import('@/components/reports/PartnersDash.vue'),
    PartnersOverviewDiagram: () => import('@/components/reports/diagrams/PartnersOverviewDiagram.vue'),
    PartnerMRRDiagram: () => import('@/components/reports/diagrams/PartnerMRRDiagram.vue')
  },

  data: () => ({
    ready: false,
    partnersOverviewData: null,
    partnerData: null,
    selectedPartnerIndex: undefined,
    showOverview: false,
    showPartner: false
  }),

  watch: {
    selectedPartnerIndex (index) {
      this.__getPartnerData(this.partnersOverviewData[index].partnerId, this.showPartnerData)
      // this.showOverview = false
    }
  },

  methods: {
    showPartnersOverview (data) {
      this.partnersOverviewData = data.result
      // this.partnersList = data.result.map(partner => partner.name)
      this.showOverview = true
    },

    showPartnerData (dynamic) {
      this.partnerData = dynamic
      this.showPartner = true
    }
  },

  created () {
    this.__getPartnersOverview(this.showPartnersOverview)
  }
}
</script>
