<template>
  <v-container>
    <v-card flat class="transparent overflow-auto" v-if="ready" max-width="1400" max-height="700">
      <table id="export-to-excel-table">
        <thead>
          <tr>
            <th rowspan="3" style="background: #bbb">Locality</th>
            <th rowspan="3" style="background: #bbb; color: #900">Premises passed</th>
            <th colspan="8" style="background: #bbb; color: #900">Connections</th>
            <th rowspan="3" style="background: #bbb; color: #900">MRR</th>

            <th colspan="6" style="background: #bbb; color: #900">Services</th>
          </tr>
          <tr>
            <!-- Connections -->
            <th colspan="5" style="background: #bbb">active</th>
            <th colspan="3" style="background: #bbb">pending</th>

            <!-- Services -->
            <th colspan="5" style="background: #bbb">active</th>
            <th rowspan="2" style="background: #bbb">pending</th>
          </tr>
          <tr>
            <!-- Connections -->
            <th style="background: #bbb">total</th>
            <th style="background: #bbb">residential</th>
            <th style="background: #bbb">commercial</th>
            <th style="background: #bbb">new last month</th>
            <th style="background: #bbb">new current month</th>

            <th style="background: #bbb">total</th>
            <th style="background: #bbb">residential</th>
            <th style="background: #bbb">commercial</th>

            <!-- Services -->

            <th style="background: #bbb">total</th>
            <th style="background: #bbb">residential</th>
            <th style="background: #bbb">commercial</th>
            <th style="background: #bbb">new last month</th>
            <th style="background: #bbb">new current month</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(record, locality) in overviewData" :key="locality">
            <td>{{ locality }}</td>
            <td>{{ record.premises || '' }}</td>
            <td>{{ record.connections.active || '' }}</td>
            <td>{{ record.connections.residential || '' }}</td>
            <td>{{ record.connections.commercial || '' }}</td>
            <td>{{ record.connections.newLastMonth || '' }}</td>
            <td>{{ record.connections.newCurrentMonth || '' }}</td>

            <td>{{ record.connections.pending || '' }}</td>
            <td>{{ record.connections.pendingResidential || '' }}</td>
            <td>{{ record.connections.pendingCommercial || '' }}</td>

            <td>{{ record.dynamic[new Date().toISOString().slice(0, 7)] }}</td>

            <td>{{ record.services.active || '' }}</td>
            <td>{{ record.services.residential || '' }}</td>
            <td>{{ record.services.commercial || '' }}</td>
            <td>{{ record.services.newLastMonth || '' }}</td>
            <td>{{ record.services.newCurrentMonth || '' }}</td>
            <td>{{ record.services.pending || '' }}</td>
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
  name: 'Localities',

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
        worksheet: 'Localities',
        table: this.table.innerHTML
      }
      const dataURL = 'data:application/vnd.ms-excel;base64,' + toBase64(format(template, ctx))
      downloadTable(dataURL, 'Localities')
    },

    getLocationsOverview (data) {
      this.overviewData = data
      this.ready = true
      this.$nextTick(() => {
        this.table = document.getElementById('export-to-excel-table')
      })
    }
  },

  mounted () {
    this.__getLocations(this.getLocationsOverview)
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
