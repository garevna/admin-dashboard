<template>
  <v-container>
    <v-card flat class="transparent overflow-auto" v-if="ready" max-width="1400" max-height="700">
      <table id="export-to-excel-table">
        <thead>
          <tr>
            <th rowspan="3" style="background: #bbb">Partner</th>
            <th colspan="6" style="background: #bbb">MRR</th>
            <th colspan="6" style="background: #bbb">Connections</th>
            <th colspan="5" style="background: #bbb">Services</th>
            <th colspan="4" style="background: #bbb">Churn</th>
          </tr>

          <tr>
            <!-- MRR -->
            <th colspan="2" style="background: #bbb">last month</th>
            <th colspan="2" style="background: #bbb">current month</th>
            <th colspan="2" style="background: #bbb">pending</th>

            <!-- Connections -->
            <th colspan="2" style="background: #bbb">active</th>
            <th colspan="2" style="background: #bbb">pending</th>
            <th colspan="2" style="background: #bbb">new</th>

            <!-- Services -->
            <th rowspan="2" style="background: #bbb">residential</th>
            <th rowspan="2" style="background: #bbb">commercial</th>
            <th rowspan="2" style="background: #bbb">pending</th>
            <th colspan="2" style="background: #bbb">new</th>

            <!-- Churn -->
            <th rowspan="2" style="background: #bbb">Awaiting suspension</th>
            <th rowspan="2" style="background: #bbb">Awaiting cancelation</th>
            <th rowspan="2" style="background: #bbb">Suspended</th>
            <th rowspan="2" style="background: #bbb">Canceled</th>
          </tr>

          <tr>
            <!-- MRR last month -->
            <th style="background: #bbb">residential</th>
            <th style="background: #bbb">commercial</th>

            <th style="background: #bbb">residential</th>
            <th style="background: #bbb">commercial</th>

            <!-- MRR pending -->
            <th style="background: #bbb">residential</th>
            <th style="background: #bbb">commercial</th>

            <!-- Connections active -->
            <th style="background: #bbb">residential</th>
            <th style="background: #bbb">commercial</th>

            <!-- Connections pending -->
            <th style="background: #bbb">residential</th>
            <th style="background: #bbb">commercial</th>

            <!-- Connections new -->
            <th style="background: #bbb">last month</th>
            <th style="background: #bbb">current month</th>

            <!-- Services new -->
            <th style="background: #bbb">last month</th>
            <th style="background: #bbb">current month</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(partner, index) of partnersData" :key="index">
            <td>{{ partner.name }}</td>
            <!-- MRR -->
            <td>{{ partner.MRR.lastMonth.residential }}</td>
            <td>{{ partner.MRR.lastMonth.commercial }}</td>
            <td>{{ partner.MRR.residential }}</td>
            <td>{{ partner.MRR.commercial }}</td>
            <td>{{ partner.MRR.pending.residential }}</td>
            <td>{{ partner.MRR.pending.commercial }}</td>

            <!-- Connections -->
            <td>{{ partner.connections.residential || '' }}</td>
            <td>{{ partner.connections.commercial || '' }}</td>
            <td>{{ partner.connections.pendingResidential || '' }}</td>
            <td>{{ partner.connections.pendingCommercial || '' }}</td>
            <td>{{ partner.connections.newLastMonth || '' }}</td>
            <td>{{ partner.connections.newCurrentMonth || '' }}</td>

            <!-- Services -->
            <td>{{ partner.services.residential || '' }}</td>
            <td>{{ partner.services.commercial || '' }}</td>
            <td>{{ partner.services.pending || '' }}</td>
            <td>{{ partner.services.newLastMonth || '' }}</td>
            <td>{{ partner.services.newCurrentMonth || '' }}</td>

            <!-- Churn -->
            <td>{{ partner.awaitingSuspension.total || '' }}</td>
            <td>{{ partner.awaitingCancelation.total || '' }}</td>
            <td>{{ partner.suspended.total || '' }}</td>
            <td>{{ partner.canceled.total || '' }}</td>
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
  name: 'Partners',

  data: () => ({
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
        worksheet: 'Partners',
        table: this.table.innerHTML
      }
      const dataURL = 'data:application/vnd.ms-excel;base64,' + toBase64(format(template, ctx))
      downloadTable(dataURL, 'Partners')
    },

    getPartnersOverviewData (response) {
      if (response.status !== 200) return console.log(response)
      this.partnersData = response.result
      this.ready = true
      this.$nextTick(() => {
        this.table = document.getElementById('export-to-excel-table')
      })
    }
  },

  mounted () {
    this.__getPartnersOverview(this.getPartnersOverviewData)
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
