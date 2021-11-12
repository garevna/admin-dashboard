<template>
  <v-container>
    <v-card v-for="field of fields" :key="field.prop" flat class="transparent">
      <v-checkbox v-model="field.selected" :label="field.title" />
    </v-card>
    <v-btn outlined color="primary" @click="sendRequestForData">Submit</v-btn>
  </v-container>
</template>

<script>

import XLSX from 'xlsx'

export default {
  name: 'ExportToExcel',
  data: () => ({
    fields: [
      { title: 'Customer creation date', prop: 'creationDate', selected: true, width: 16 },
      { title: 'Customer unique code', prop: 'uniqueCode', selected: true, width: 30 },
      { title: 'Customer full name', prop: 'fullName', selected: true, width: 30 },
      { title: 'Customer address', prop: 'address', selected: true, width: 60 },
      { title: 'Customer phone (work)', prop: 'phoneWork', selected: false, width: 20 },
      { title: 'Customer phone (mobile)', prop: 'phoneMobile', selected: false, width: 20 },
      { title: 'Customer email (primary)', prop: 'primaryEmail', selected: false, width: 30 },
      { title: 'Customer email (alternative)', prop: 'alternativeEmail', selected: false, width: 30 },
      { title: 'Company name (for commercial only)', prop: 'companyName', selected: false, width: 40 },
      { title: 'Company ABN (for commercial only)', prop: 'companyAbn', selected: false, width: 20 }
    ],
    wscols: []
  }),
  methods: {
    sendRequestForData () {
      this.__getCustomersForExcel(this.fields.filter(field => field.selected).map(field => field.prop))
      this.wscols = this.fields.filter(field => field.selected).map(field => ({ width: field.width }))
    },
    createExcel (data) {
      const sheet = XLSX.utils.json_to_sheet(data)
      sheet['!cols'] = this.wscols
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, sheet, 'customers')
      XLSX.writeFile(wb, 'customers.xlsx')
    }
  },

  mounted () {
    this.$root.$on('customers-for-excel-received', this.createExcel)
  },

  beforeDestroy () {
    this.$root.$off('customers-for-excel-received', this.createExcel)
  }
}
</script>
