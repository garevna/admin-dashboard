<template>
  <v-row class="mb-12">
    <v-col cols="5">
      <v-card dark class="mt-12 pa-4" color="#003" width="600">
        <PartnersDash
          v-if="showOverview"
          :partnersData="partnersOverviewData"
          :clickedPartner.sync="selectedPartnerIndex"
          :clickedOption.sync="selectedPartnerOption"
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
        <PartnerMRRDiagram
          v-if="showPartner && selectedPartnerOption === 0"
          :partner="partnersOverviewData[selectedPartnerIndex]"
        />
        <PartnerConnectionsDiagram
          v-if="showPartner && selectedPartnerOption === 1"
          :partner="partnersOverviewData[selectedPartnerIndex]"
        />
        <PartnerServicesDiagram
          v-if="showPartner && selectedPartnerOption === 2"
          :partner="partnersOverviewData[selectedPartnerIndex]"
        />
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
    PartnerMRRDiagram: () => import('@/components/reports/diagrams/PartnerMRRDiagram.vue'),
    PartnerConnectionsDiagram: () => import('@/components/reports/diagrams/PartnerConnectionsDiagram.vue'),
    PartnerServicesDiagram: () => import('@/components/reports/diagrams/PartnerServicesDiagram.vue')
  },

  data: () => ({
    ready: false,
    partnersOverviewData: null,
    partnerData: null,
    selectedPartnerIndex: undefined,
    selectedPartnerOption: 0,
    showOverview: false,
    showPartner: false
  }),

  watch: {
    selectedPartnerIndex (index) {
      this.selectedPartnerOption = 0
      this.showPartner = true
    }
    // selectedPartnerOption (val) {
    //   console.log(val)
    // }
  },

  methods: {
    showPartnersOverview (data) {
      this.partnersOverviewData = data.result
      this.showOverview = true
    }
  },

  created () {
    this.__getPartnersOverview(this.showPartnersOverview)
  }
}
</script>
