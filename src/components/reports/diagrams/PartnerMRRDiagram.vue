<template>
  <AreaChart
    :sourceData="sourceData"
    title="MRR total"
    :header="sourceData.name"
    v-if="ready"
  />
</template>

<script>

const dynamicMenuItems = ['MRR total', 'MRR residential', 'MRR commercial']

export default {
  name: 'PartnerMRRDiagram',

  components: {
    AreaChart: () => import('@/components/reports/diagrams/AreaChart.vue')
  },

  props: ['partner', 'clickedItem', 'sourceData'],

  data: () => ({
    ready: true
  }),

  computed: {
    propName () {
      return dynamicMenuItems.includes(this.clickedItem)
        ? this.clickedItem.indexOf('residential') !== -1
          ? 'residentialDynamic'
          : this.clickedItem.indexOf('commercial') !== -1
            ? 'commercialDynamic'
            : 'dynamic'
        : 'dynamic'
    },

    title () {
      const titles = {
        dynamic: 'MRR',
        residentialDynamic: 'MRR residential',
        commercialDynamic: 'MRR commercial'
      }

      return titles[this.propName]
    }
  },

  watch: {
    sourceData (data) {
      this.ready = Boolean(data)
    }
  },

  created () {
    console.log(this.clickedItem)
    console.log('MRR chart source data:\n', this.sourceData)
    this.ready = Boolean(this.sourceData)
  }
}
</script>
