<template>
  <AreaChart :sourceData="dynamic" :title="title" v-if="ready" />
</template>

<script>

import { dynamicMenuItems } from '@/components/reports/configs'

export default {
  name: 'DiagramDynamicMRR',

  components: {
    AreaChart: () => import('@/components/reports/diagrams/AreaChart.vue')
  },

  props: ['header', 'sourceData'],

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

    dynamic () {
      return this.__clone(this.sourceData[this.propName])
    },

    title () {
      const titles = {
        dynamic: `${this.header || ''} MRR`,
        residentialDynamic: `${this.header || ''} MRR residential`,
        commercialDynamic: `${this.header || ''} MRR commercial`
      }

      return titles[this.propName]
    }
  }
}
</script>
