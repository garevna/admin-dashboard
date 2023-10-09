<template>
  <v-container>
    <v-card flat class="transparent overflow-auto" v-if="ready" max-width="1400" max-height="700">
      <table id="export-to-excel-table">
        <thead>
          <tr>
            <th colspan="8" class="text-right" style="background: #ddd">
              <h5><small>Post code: </small><span style="color: #900">{{ postCode }}</span></h5>
            </th>
          </tr>
          <tr>
            <th style="background: #bbb">Address</th>
            <th style="background: #bbb">Premises passed</th>
            <th style="background: #bbb">Active connections</th>
            <th style="background: #bbb">MRR ($)</th>
            <th style="background: #bbb">Total spent ($)</th>
            <th style="background: #bbb">RoI ($)</th>
            <th style="background: #bbb">Uptake (%)</th>
            <th style="background: #bbb">ARPU ($)</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(record, index) in overviewData" :key="index">
            <td class="text-left">{{ record.address }}</td>
            <td>{{ record.premisesPassed || '' }}</td>
            <td>{{ record.activeConnections || '' }}</td>
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
  name: 'Postcode',

  data: () => ({
    postCode: '',
    table: null,
    partnersData: null,
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

    getPostcodeOverview (data) {
      this.overviewData = data
      this.ready = true
      this.$nextTick(() => {
        this.table = document.getElementById('export-to-excel-table')
      })
    }
  },

  mounted () {
    this.postCode = this.$route.params.postcode
    this.__getBuildingsByPostCode(this.postCode, this.getPostcodeOverview)
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
