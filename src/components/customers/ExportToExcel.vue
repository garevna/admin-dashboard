<template>
  <v-container>
    <v-row justify="center">
      <table class="mx-auto">
        <tbody>
          <tr>
            <td width="360">
              <SearchBuildingByAddress :building.sync="building" />
            </td>
            <td width="280">
              <SelectPartner :partner.sync="partner" />
            </td>
            <td width="240">
              <SelectServiceStatus :status.sync="status" />
            </td>
          </tr>
        </tbody>
      </table>
    </v-row>

    <v-row justify="center">
      <v-col cols="4">
        <v-card flat class="transparent mt-12">
          <v-card-text v-for="field of fields" :key="field.prop" style="margin: -24px 0">
            <v-checkbox v-model="field.selected" :label="field.title" hide-details dense />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card flat class="transparent mt-12">
          <v-card-text v-for="defaultField of defaultFields" :key="defaultField.prop" style="margin: -24px 0">
            <v-checkbox v-model="defaultField.selected" :label="defaultField.title" hide-details dense disabled />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card flat class="transparent mt-12">
          <v-card-text v-for="specialField of specialFields" :key="specialField.prop" style="margin: -24px 0">
            <v-checkbox v-model="specialField.selected" :label="specialField.title" hide-details dense />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-12">
      <v-btn outlined color="primary" @click="sendRequestForData"> Submit </v-btn>
    </v-row>
  </v-container>
</template>

<script>

import XLSX from 'xlsx'

export default {
  name: 'ExportToExcel',

  components: {
    SearchBuildingByAddress: () => import('@/components/inputs/SearchBuildingByAddress.vue'),
    SelectPartner: () => import('@/components/inputs/SelectPartner.vue'),
    SelectServiceStatus: () => import('@/components/inputs/SelectServiceStatus.vue')
  },

  data: () => ({
    building: null,
    partner: null,
    status: null,

    fields: [
      { title: 'Customer creation date', prop: 'customerCreationDate', selected: true, width: 16 },
      { title: 'Customer unique code', prop: 'uniqueCode', selected: true, width: 25 },
      { title: 'Customer address', prop: 'address', selected: true, width: 45 },
      { title: 'Customer full name', prop: 'fullName', selected: true, width: 20 },
      { title: 'Partner name', prop: 'partnerName', selected: false, width: 20 },
      { title: 'Customer phone (work)', prop: 'phoneWork', selected: false, width: 20 },
      { title: 'Customer phone (mobile)', prop: 'phoneMobile', selected: false, width: 20 },
      { title: 'Customer email (primary)', prop: 'primaryEmail', selected: false, width: 20 },
      { title: 'Customer email (alternative)', prop: 'alternativeEmail', selected: false, width: 20 },
      { title: 'Company name (for commercial only)', prop: 'companyName', selected: false, width: 20 },
      { title: 'Company ABN (for commercial only)', prop: 'companyAbn', selected: false, width: 20 }
    ],

    defaultFields: [
      { title: 'Service name', prop: 'serviceName', selected: true, width: 24 },
      { title: 'Service status', prop: 'serviceStatus', selected: true, width: 12 },
      { title: 'Service activation date', prop: 'activationDate', selected: true, width: 12 },
      { title: 'Service cancelation date', prop: 'canceledDate', selected: true, width: 12 }
    ],

    specialFields: [
      { title: 'IP', prop: 'IP', selected: true, width: 14 },
      { title: 'Login (PPPOE)', prop: 'Login.PPPOE', selected: true, width: 16 },
      { title: 'PWD (PPPOE)', prop: 'PWD.PPPOE', selected: true, width: 16 },
      { title: 'Login (IPoE)', prop: 'Login.IPoE', selected: true, width: 16 },
      { title: 'PWD (IPoE)', prop: 'PWD.IPoE', selected: true, width: 16 },
      { title: 'Speed In', prop: 'Speed In', selected: false, width: 8 },
      { title: 'Speed Out', prop: 'Speed Out', selected: false, width: 8 },
      { title: 'Routed subnet', prop: 'Routed subnet', selected: false, width: 12 },
      { title: 'VLAN DGtek', prop: 'VLAN DGtek', selected: false, width: 12 },
      { title: 'VLAN RSP', prop: 'VLAN RSP', selected: false, width: 12 }
    ],
    wscols: []
  }),

  methods: {
    sendRequestForData () {
      const requestOptions = {
        fields: {
          simple: this.fields.filter(field => field.selected).map(field => field.prop),
          special: this.specialFields.filter(field => field.selected).map(field => field.prop)
        },
        buildingId: this.building?.buildingId,
        partnerId: this.partner?.id,
        serviceStatus: this.status
      }
      this.__getCustomersForExcel(requestOptions, this.createExcel)
      this.wscols = this.fields
        .filter(field => field.selected)
        .map(field => ({ width: field.width }))
    },

    createExcel (data /*, sheetName */) {
      const sheet = XLSX.utils.json_to_sheet(data)
      sheet['!cols'] = this.wscols
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, sheet, 'customers')
      XLSX.writeFile(wb, 'customers.xlsx')
    }
  }
}
</script>
