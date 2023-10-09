<template>
  <v-container>
    <v-card flat class="transparent overflow-auto mx-auto" v-if="ready" max-width="600" max-height="700">
      <table id="export-to-excel-table">
        <thead>
          <tr>
            <th style="background: #bbb">Year-month</th>
            <th style="background: #bbb">Total MRR ($)</th>
            <th style="background: #bbb">Residential MRR ($)</th>
            <th style="background: #bbb">Commercial MRR ($)</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(record, index) in dynamics" :key="index">
            <td class="text-left">{{ record.date }}</td>
            <td class="text-right">{{ record.all }}</td>
            <td class="text-right">{{ record.residential }}</td>
            <td class="text-right">{{ record.commercial }}</td>
          </tr>
        </tbody>
      </table>
    </v-card>
    <v-row justify="center" class="mt-8">
      <v-btn outlined color="primary" @click="exportToExcel">
        Download
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

const {
  toBase64,
  format,
  downloadTable,
  template
} = require('@/components/reports/export/lib.js')

export default {
  name: 'MRRDynamic',

  data: () => ({
    dynamics: null,
    table: null,
    ready: false,
    currentMonth: new Date().toISOString().slice(0, 7),
    lastMonth: new Date(new Date().getFullYear(), new Date().getMonth()).toISOString().slice(0, 7)
  }),

  computed: {
    churn () {
      return this.ready ? this.partnersData.canceled.currentMonth + this.partnersData.suspended.currentMonth : 0
    }
  },

  methods: {
    exportToExcel () {
      const ctx = {
        worksheet: this.postCode,
        table: this.table.innerHTML
      }
      const dataURL = 'data:application/vnd.ms-excel;base64,' + toBase64(format(template, ctx))
      downloadTable(dataURL, this.postCode)
    },

    getOverviewData (data) {
      const { dynamic, residentialDynamic, commercialDynamic } = data

      const dates = Object.keys(dynamic).sort()

      this.dynamics = dates.map(date => ({
        date,
        all: dynamic[date],
        residential: residentialDynamic[date],
        commercial: commercialDynamic[date]
      }))

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
  td {
    text-align: right;
  }
</style>
