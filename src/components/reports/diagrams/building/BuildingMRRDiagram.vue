<template>
  <v-card flat class="transparent mt-12">
    <h5 style="color: #005">
      <small>{{ partner.name }}</small>
    </h5>
    <table class="mb-8" cellpadding="16" cellspacing="16">
      <tbody>
        <tr>
          <th :class="propName === 'dynamic' ? 'td-clickable clicked-item' : 'td-clickable'" @click="propName = 'dynamic'">
            <small>MRR total</small>
          </th>
          <td :class="propName === 'dynamic' ? 'td-clickable clicked-item' : 'td-clickable'" @click="propName = 'dynamic'">
            $ {{ total }}
          </td>
          <th :class="propName === 'residentialDynamic' ? 'td-clickable clicked-item' : 'td-clickable'" @click="propName = 'residentialDynamic'">
            <small>Residential</small>
          </th>
          <td :class="propName === 'residentialDynamic' ? 'td-clickable clicked-item' : 'td-clickable'" @click="propName = 'residentialDynamic'">
            $ {{ residential }}
          </td>
          <th :class="propName === 'commercialDynamic' ? 'td-clickable clicked-item' : 'td-clickable'" @click="propName = 'commercialDynamic'">
            <small>Commercial</small>
          </th>
          <td :class="propName === 'commercialDynamic' ? 'td-clickable clicked-item' : 'td-clickable'" @click="propName = 'commercialDynamic'">
            $ {{ commercial }}
          </td>
        </tr>
        <tr>
          <th></th>
          <td></td>
          <th><small>Last month (+)</small></th>
          <td>$ {{ lastMonth }}</td>
          <th><small>Current month (+)</small></th>
          <td>$ {{ currentMonth }}</td>
        </tr>
        <tr>
          <th><small>MRR pending</small></th>
          <td>$ {{ __roundFloat(partner.MRR.pending.residential + partner.MRR.pending.commercial) }}</td>
          <th><small>Residential</small></th>
          <td>$ {{ partner.MRR.pending.residential }}</td>
          <th><small>Commercial</small></th>
          <td>$ {{ partner.MRR.pending.commercial }}</td>
        </tr>
      </tbody>
    </table>
    <AreaChart
      v-if="ready"
      :sourceData="chartData"
      :title="title"
      :header="partner.name"
    />
  </v-card>
</template>

<script>

const titles = {
  dynamic: 'MRR total',
  residentialDynamic: 'MRR residential',
  commercialDynamic: 'MRR commercial'
}

export default {
  name: 'BuildingMRRDiagram',

  components: {
    AreaChart: () => import('@/components/reports/diagrams/AreaChart.vue')
  },

  props: ['building'],

  data: () => ({
    buildingId: null,
    dynamic: null,
    residentialDynamic: null,
    commercialDynamic: null,
    ready: false,
    chartData: null,
    title: null,
    header: null,
    propName: 'dynamic',
    total: 0,
    residential: 0,
    commercial: 0,
    lastMonth: 0,
    currentMonth: 0
  }),

  watch: {
    propName (val) {
      this.ready = false
      this.getChartData()
    },

    partner: {
      deep: true,
      immediate: true,
      handler (data) {
        this.buildingId = data.buildingId
        this.__getPartnerData(this.buildingId, this.showBuildingData)
      }
    }
  },

  methods: {
    showBuildingData (data) {
      if (!data) {
        this.total = 0
        this.residential = 0
        this.commercial = 0
        this.lastMonth = 0
        this.currentMonth = 0
        this.ready = false
        return
      }
      const { dynamic, residentialDynamic, commercialDynamic } = data
      this.dynamic = dynamic
      this.residentialDynamic = residentialDynamic
      this.commercialDynamic = commercialDynamic

      this.getTableData()
      this.getChartData()
    },

    getDates () {
      const date = new Date()
      const [year, month] = [date.getFullYear(), date.getMonth() + 1]
      const [prev, lastMonth, currentMonth] = [
        `${year}-${month < 10 ? '0' : ''}${month - 2}`,
        `${year}-${month < 10 ? '0' : ''}${month - 1}`,
        `${year}-${month < 10 ? '0' : ''}${month}`
      ]

      return { prev, lastMonth, currentMonth }
    },

    getTableData () {
      const { prev, lastMonth, currentMonth } = this.getDates()

      this.total = this.dynamic[currentMonth] || 0
      this.residential = this.residentialDynamic[currentMonth] || 0
      this.commercial = this.commercialDynamic[currentMonth] || 0
      this.lastMonth = this.__roundFloat((this.dynamic[lastMonth] || 0) - (this.dynamic[prev] || 0))
      this.currentMonth = this.__roundFloat(this.dynamic[currentMonth] - (this.dynamic[lastMonth] || 0))
    },

    getChartData () {
      this.ready = Boolean(this[this.propName])
      if (this.ready) {
        this.title = titles[this.propName]
        this.chartData = this[this.propName]
      }
    }
  }
}
</script>

<style>
.td-clickable {
  font-weight: bold;
  color: #09b;
  cursor: pointer;
  /* text-align: center; */
}

.clicked-item {
  color: #900;
}
</style>
