<template>
  <v-card flat class="transparent" v-if="ready">
    <table id="export-to-excel-table">
      <!-- Common info -->
      <thead>
        <tr>
          <th colspan="4" style="background: #bbb; color: #900">Premises passed</th>
          <th rowspan="2" style="background: #bbb; color: #900">On-net buildings</th>
          <th colspan="3" style="background: #bbb; color: #900">Customers</th>
          <th colspan="2" style="background: #bbb; color: #900">Monthly recurring revenue ($)</th>
        </tr>
        <tr>
          <!-- premises passed -->
          <th style="background: #bbb">total</th>
          <th style="background: #bbb">residential</th>
          <th style="background: #bbb">commercial</th>
          <th style="background: #bbb">mixed</th>
          <!-- customers -->
          <th style="background: #bbb">residential</th>
          <th style="background: #bbb">commercial</th>
          <th style="background: #bbb">new current month</th>
          <!-- MRR -->
          <th style="background: #bbb">total</th>
          <th style="background: #bbb">increase</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- premises passed -->
          <td style="text-align: right">{{ overviewData.premisesPassed.total }}</td>
          <td style="text-align: right">{{ overviewData.premisesPassed.residential }}</td>
          <td style="text-align: right">{{ overviewData.premisesPassed.commercial }}</td>
          <td style="text-align: right">{{ overviewData.premisesPassed.mixed }}</td>
          <!-- buildings -->
          <td style="text-align: right">{{ overviewData.totalOnNetBuildings }}</td>
          <!-- customers -->
          <td style="text-align: right">{{ overviewData.connections.residential }}</td>
          <td style="text-align: right">{{ overviewData.connections.commercial }}</td>
          <td style="text-align: right">{{ overviewData.connections.newCurrentMonth }}</td>
          <!-- MRR -->
          <td style="text-align: right">{{ formatNumber(currentMonthMRR) }}</td>
          <td style="text-align: right">{{ formatNumber(MRRIncrease) }}</td>
        </tr>
      </tbody>

      <!-- New table: MRR and connections -->

      <thead>
        <tr>
          <th rowspan="2" style="padding-top: 24px; color: #900"></th>
          <th colspan="3" style="padding-top: 24px; color: #900"> MRR ($) </th>
          <th rowspan="2" style="padding-top: 24px; color: #900">ARPU ($)</th>
          <th rowspan="2" style="padding-top: 24px; color: #900">Uptake (%)</th>
          <th colspan="4" style="padding-top: 24px; color: #900"> Connections </th>
          <th colspan="4" style="padding-top: 24px; color: #900"> Services </th>
        </tr>
        <tr>
          <!-- MRR -->
          <th style="background: #bbb">last month</th>
          <th style="background: #bbb">current month</th>
          <th style="background: #bbb">pending</th>

          <!-- Connections -->
          <th style="background: #bbb">active</th>
          <th style="background: #bbb">pending</th>
          <th style="background: #bbb">new last month</th>
          <th style="background: #bbb">new current month</th>

          <!-- Services -->
          <th style="background: #bbb">active</th>
          <th style="background: #bbb">pending</th>
          <th style="background: #bbb">new last month</th>
          <th style="background: #bbb">new current month</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total</td>
          <!-- MRR -->
          <td style="text-align: right">{{ formatNumber(lastMonthMRR) }}</td>
          <td style="text-align: right">{{ formatNumber(currentMonthMRR) }}</td>
          <td style="text-align: right">{{ formatNumber(pendingTotalMRR) }}</td>
          <!-- ARPU and uptake -->
          <td style="text-align: right">{{ formatNumber(totalARPU) }}</td>
          <td style="text-align: right">{{ formatNumber(totalUptake) }}</td>
          <!-- Connections -->
          <td style="text-align: right">{{ overviewData.connections.active }}</td>
          <td style="text-align: right">{{ pendingConnections }}</td>
          <td style="text-align: right">{{ overviewData.connections.newLastMonth }}</td>
          <td style="text-align: right">{{ overviewData.connections.newCurrentMonth }}</td>
          <!-- Services -->
          <td style="text-align: right">{{ overviewData.services.active }}</td>
          <td style="text-align: right">{{ overviewData.services.pending }}</td>
          <td style="text-align: right">{{ overviewData.services.newLastMonth }}</td>
          <td style="text-align: right">{{ overviewData.services.newCurrentMonth }}</td>
        </tr>
        <tr>
          <td>Residential</td>
          <!-- MRR -->
          <td style="text-align: right">{{ formatNumber(lastMonthResidentialMRR) }}</td>
          <td style="text-align: right">{{ formatNumber(currentMonthResidentialMRR) }}</td>
          <td style="text-align: right">{{ formatNumber(overviewData.MRR.pending.residential) }}</td>
          <!-- ARPU and uptake -->
          <td style="text-align: right">{{ formatNumber(residentialARPU) }}</td>
          <td style="text-align: right">{{ formatNumber(residentialUptake) }}</td>
          <!-- Connections -->
          <td style="text-align: right">{{ overviewData.connections.residential }}</td>
          <td style="text-align: right">{{ overviewData.connections.pendingResidential }}</td>
          <td></td>
          <td></td>
          <!-- Services -->
          <td style="text-align: right">{{ overviewData.services.residential }}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Commercial</td>
          <!-- MRR -->
          <td style="text-align: right">{{ formatNumber(lastMonthCommercialMRR) }}</td>
          <td style="text-align: right">{{ formatNumber(currentMonthCommercialMRR) }}</td>
          <td style="text-align: right">{{ formatNumber(overviewData.MRR.pending.commercial) }}</td>
          <!-- ARPU and uptake -->
          <td style="text-align: right">{{ formatNumber(commercialARPU) }}</td>
          <td style="text-align: right">{{ formatNumber(commercialUptake) }}</td>
          <!-- Connections -->
          <td style="text-align: right">{{ overviewData.connections.commercial }}</td>
          <td style="text-align: right">{{ overviewData.connections.pendingCommercial }}</td>
          <td></td>
          <td></td>
          <!-- Services -->
          <td style="text-align: right">{{ overviewData.services.commercial }}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>

      <!-- New table: CHURN -->

      <thead>
        <tr>
          <th colspan="5" style="padding-top: 24px; color: #900">Churn</th>
        </tr>
        <tr>
          <th style="background: #bbb"></th>
          <th style="background: #bbb"> Awaiting suspension </th>
          <th style="background: #bbb"> Suspended </th>
          <th style="background: #bbb"> Awaiting cancelation </th>
          <th style="background: #bbb"> Canceled </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Last month</td>
          <td style="text-align: right">{{ overviewData.awaitingSuspension.lastMonth }}</td>
          <td style="text-align: right">{{ overviewData.suspended.lastMonth }}</td>
          <td style="text-align: right">{{ overviewData.awaitingCancelation.lastMonth }}</td>
          <td style="text-align: right">{{ overviewData.canceled.lastMonth }}</td>
        </tr>
        <tr>
          <td>Current month</td>
          <td style="text-align: right">{{ overviewData.awaitingSuspension.currentMonth }}</td>
          <td style="text-align: right">{{ overviewData.suspended.currentMonth }}</td>
          <td style="text-align: right">{{ overviewData.awaitingCancelation.currentMonth }}</td>
          <td style="text-align: right">{{ overviewData.canceled.currentMonth }}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td style="text-align: right">{{ overviewData.awaitingSuspension.total }}</td>
          <td style="text-align: right">{{ overviewData.suspended.total }}</td>
          <td style="text-align: right">{{ overviewData.awaitingCancelation.total }}</td>
          <td style="text-align: right">{{ overviewData.canceled.total }}</td>
        </tr>
      </tbody>
    </table>

    <v-row justify="center" class="mt-10">
      <v-btn outlined color="primary" @click="exportToExcel">
        Download
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { /* roundFloat, */ getARPU, getUptake } from '@/components/reports/helpers'

const {
  toBase64,
  format,
  downloadTable,
  template
} = require('@/components/reports/export/lib.js')

export default {
  name: 'Overview',

  data: () => ({
    table: null,
    overviewData: null,
    ready: false,
    currentMonth: new Date().toISOString().slice(0, 7),
    lastMonth: new Date(new Date().getFullYear(), new Date().getMonth()).toISOString().slice(0, 7),
    totalARPU: null,
    residentialARPU: null,
    commercialARPU: null,
    totalUptake: null,
    residentialUptake: null,
    commercialUptake: null
  }),

  computed: {
    currentMonthMRR () {
      return this.ready ? this.overviewData.dynamic[this.currentMonth] : 0
    },

    currentMonthResidentialMRR () {
      return this.ready ? this.overviewData.residentialDynamic[this.currentMonth] : 0
    },

    currentMonthCommercialMRR () {
      return this.ready ? this.overviewData.commercialDynamic[this.currentMonth] : 0
    },

    lastMonthMRR () {
      return this.ready ? this.overviewData.dynamic[this.lastMonth] : 0
    },

    lastMonthResidentialMRR () {
      return this.ready ? this.overviewData.residentialDynamic[this.lastMonth] : 0
    },

    lastMonthCommercialMRR () {
      return this.ready ? this.overviewData.commercialDynamic[this.lastMonth] : 0
    },

    MRRIncrease () {
      return this.__roundFloat(this.currentMonthMRR - this.lastMonthMRR)
    },

    pendingTotalMRR () {
      return this.__roundFloat(this.overviewData.MRR.pending.residential + this.overviewData.MRR.pending.commercial)
    },

    churn () {
      return this.ready ? this.overviewData.canceled.currentMonth + this.overviewData.suspended.currentMonth : 0
    },

    pendingConnections () {
      return this.ready ? this.overviewData.connections.pendingResidential + this.overviewData.connections.pendingCommercial : 0
    }
  },

  methods: {
    formatNumber (number) {
      return number
        ? number.toString()
          .split('$').join('')
          .split(' ').join('')
          .split('%').join('')
        : ''
    },

    exportToExcel () {
      const ctx = {
        worksheet: 'Overview',
        table: this.table.innerHTML
      }
      const dataURL = 'data:application/vnd.ms-excel;base64,' + toBase64(format(template, ctx))
      downloadTable(dataURL, 'Overview')
    },

    getOverviewData (data) {
      this.overviewData = data
      const { total: totalARPU, residential: residentialARPU, commercial: commercialARPU } = getARPU(this.overviewData)
      const { total: totalUptake, residential: residentialUptake, commercial: commercialUptake } = getUptake(this.overviewData)
      Object.assign(this, {
        totalARPU,
        residentialARPU,
        commercialARPU,
        totalUptake,
        residentialUptake,
        commercialUptake
      })
      this.ready = true
      this.$nextTick(() => {
        this.table = document.getElementById('export-to-excel-table')
      })
    }
  },

  created () {
    this.__getOverview(this.getOverviewData)
  }
}
</script>

<style scoped>
  table {
    font-family: Arial;
    font-size: 12px;
    border-collapse: collapse;
  }
  td, th {
    border: solid 1px #999;
    padding: 4px 8px;
  }
  th {
    background-color: #ddd;
  }
</style>
