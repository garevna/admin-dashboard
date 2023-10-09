<template>
  <v-container>
    <v-card flat class="transparent overflow-auto" v-if="ready" max-width="1400" max-height="700">
      <table id="export-to-excel-table">
        <thead>
          <tr>
            <th style="background: #bbb">Post code</th>
            <th style="background: #bbb">Premises passed</th>
            <th style="background: #bbb">Active connections</th>
            <th style="background: #bbb">MRR</th>
            <th style="background: #bbb">Total spent</th>
            <th style="background: #bbb">RoI</th>
            <th style="background: #bbb">Uptake</th>
            <th style="background: #bbb">ARPU</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(record, postCode) in overviewData" :key="postCode">
            <td>{{ postCode }}</td>
            <td>{{ record.premisesPassed || '' }}</td>
            <td>{{ record.activeCustomers || '' }}</td>
            <td>{{ record.MRR }}</td>
            <td>{{ record.totalSpent }}</td>
            <td>{{ record.ROI }}</td>
            <td>{{ record.uptake }}</td>
            <td>{{ record.ARPU }}</td>
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
  name: 'Buildings',

  data: () => ({
    table: null,
    partnersData: null,
    ready: false,
    currentMonth: new Date().toISOString().slice(0, 7),
    lastMonth: new Date(new Date().getFullYear(), new Date().getMonth()).toISOString().slice(0, 7)
  }),

  methods: {
    exportToExcel () {
      const ctx = {
        worksheet: 'Postal codes',
        table: this.table.innerHTML
      }
      const dataURL = 'data:application/vnd.ms-excel;base64,' + toBase64(format(template, ctx))
      downloadTable(dataURL, 'Postcodes')
    },

    getBuildingsOverview (data) {
      this.overviewData = data
      this.ready = true
      this.$nextTick(() => {
        this.table = document.getElementById('export-to-excel-table')
      })
    }
  },

  mounted () {
    this.__getBuildingsOverview(this.getBuildingsOverview)
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
