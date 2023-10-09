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
        :style="`margin-top: ${selectedPartnerIndex * 60}px; transition: all 0.5s`"
      >
        <PartnersOverviewDiagram
          v-if="showOverview && !showPartner"
          :sourceData="partnersOverviewData"
        />

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
        <PartnerChurnDiagram
          v-if="showPartner && selectedPartnerOption === 3"
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
    PartnersOverviewDiagram: () => import('@/components/reports/diagrams/partners/PartnersOverviewDiagram.vue'),
    PartnerConnectionsDiagram: () => import('@/components/reports/diagrams/partner/PartnerConnectionsDiagram.vue'),
    PartnerServicesDiagram: () => import('@/components/reports/diagrams/partner/PartnerServicesDiagram.vue'),
    PartnerChurnDiagram: () => import('@/components/reports/diagrams/partner/PartnerChurnDiagram.vue'),
    PartnerMRRDiagram: () => import('@/components/reports/diagrams/partner/PartnerMRRDiagram.vue')
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
      this.showPartner = typeof index === 'number'
    }
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
