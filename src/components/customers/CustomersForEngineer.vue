<template>
  <v-container fluid class="scroll-y" style="border: solid 1px #efefef; width: 100%">
    <v-row justify="center" class="mx-1">
      <v-card flat class="transparent pb-12 px-2 mb-12" v-if="ready">
        <!-- <v-card-title>
          <CustomersFilters
            :serviceName.sync="serviceName"
            :type.sync="serviceType"
            :status.sync="status"
            :refresh.sync="refresh"
            :hardRefresh.sync="hardRefresh"
          />
        </v-card-title> -->

        <table class="table-relative">
          <thead>
            <tr>
              <th rowspan="2" class="th-sticky local-td"> <small>Unique code, address and<br>service name</small> </th>
              <th rowspan="2" class="th-sticky local-td"> <small>Partner</small> </th>
              <th colspan="2" class="th-sticky local-td"> PPPOE </th>
              <th colspan="2" class="th-sticky local-td"> IPoE </th>
              <th rowspan="2" class="th-sticky local-td"> <small>Speed In</small> </th>
              <th rowspan="2" class="th-sticky local-td"> <small>Speed Out</small> </th>
              <th rowspan="2" class="th-sticky local-td"> IP </th>
              <th rowspan="2" class="th-sticky local-td"> <small>Routed subnet</small> </th>
              <th rowspan="2" class="th-sticky local-td"> <small>VLAN DGtek</small> </th>
              <th rowspan="2" class="th-sticky local-td"> <small>VLAN RSP</small> </th>
            </tr>
            <tr>
              <th style="top: 96px !important;" class="th-sticky local-td"> <small>Login</small> </th>
              <th style="top: 96px !important;" class="th-sticky local-td"> <small>PWD</small> </th>
              <th style="top: 96px !important;" class="th-sticky local-td"> <small>Login</small> </th>
              <th style="top: 96px !important;" class="th-sticky local-td"><small>PWD</small></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(service, index) of filteredRecords"
              :key="index"
              :class="service.selected ? 'selected-row' : ''"
              style="padding-bottom: 16px; text-align: center"
              @click="clickCallback(service)"
            >
              <td class="local-td">
                <b> {{ customers[service.customerId].uniqueCode }} </b><br>
                <small> {{ customers[service.customerId].address }} </small><br>
                <small> <b style="color: #09b">{{ serviceList[service.id] }}</b> </small>
              </td>
              <td class="local-td text-center">
                {{ getPartner(service.customerId) }}
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service.Login.PPPOE"
                  outlined
                  hide-details
                  dense
                  @input="service.edited = true"
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service.Login.PPPOE }} </span>
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service.PWD.PPPOE"
                  outlined
                  hide-details
                  dense
                  @input="service.edited = true"
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service.PWD.PPPOE }} </span>
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service.Login.IPoE"
                  outlined
                  hide-details
                  dense
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service.Login.IPoE }} </span>
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service.PWD.IPoE"
                  outlined
                  hide-details
                  dense
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service.PWD.IPoE }} </span>
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service['Speed In']"
                  outlined
                  hide-details
                  dense
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service['Speed In'] }} </span>
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service['Speed Out']"
                  outlined
                  hide-details
                  dense
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service['Speed Out'] }} </span>
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service.IP"
                  outlined
                  hide-details
                  dense
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service.IP }} </span>
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service['Routed subnet']"
                  outlined
                  hide-details
                  dense
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service['Routed subnet'] }} </span>
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service['VLAN DGtek']"
                  outlined
                  hide-details
                  dense
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service['VLAN DGtek'] }} </span>
              </td>
              <td class="local-td small-td">
                <v-text-field
                  v-if="service.selected"
                  v-model="service['VLAN RSP']"
                  outlined
                  hide-details
                  dense
                  @input="service.edited = true"
                  @change="changeCallback(service)"
                />
                <span v-else> {{ service['VLAN RSP'] }} </span>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-row>
    <div class="mb-12" style="position: sticky; bottom: 28px; left: 0; background: #f0f0f0; height: 56px; padding: 8px 0; z-index: 101">
      <table class="mx-auto">
        <tr>
          <td style="vertical-align: top">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              dense
              outlined
              style="width: 360px"
              hide-details
            />
          </td>
          <td>
            <v-btn dark class="primary ml-12" @click="save">
              update/save
            </v-btn>
          </td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'CustomersForEngineer',

  data: () => ({
    customers: null,
    partners: null,
    services: null,
    serviceList: null,
    filteredRecords: [],
    ready: false,
    search: ''
  }),

  watch: {
    search (val) {
      const value = val.toLowerCase()
      const customers = Object.keys(this.customers)
        .filter(key => this.customers[key].uniqueCode.toLowerCase().indexOf(value) !== -1 || this.customers[key].address.toLowerCase().indexOf(value) !== -1)

      const services = Object.keys(this.serviceList)
        .filter(key => this.serviceList[key].toLowerCase().indexOf(value) !== -1)

      this.filteredRecords = this.services
        .filter(record => customers.includes(record.customerId))
        .concat(this.services.filter(record => services.includes(record.id)))
    }
  },

  methods: {
    getServiceIndex (service) {
      return this.services.findIndex(record => record.customerId === service.customerId && record.id === service.id)
    },

    getPartner (customerId) {
      return this.partners[this.customers[customerId].resellerId]
        ? this.partners[this.customers[customerId].resellerId].uniqueCode
        : 'Removed'
    },

    getRecordIndex (service) {
      return this.filteredRecords.findIndex(record => record.customerId === service.customerId && record.id === service.id)
    },

    selectRow (service) {
      for (const service of this.services) Object.assign(service, { selected: false, edited: false })
      for (const service of this.filteredRecords) Object.assign(service, { selected: false, edited: false })

      Object.assign(this.filteredRecords[this.getRecordIndex(service)], { selected: true })
      Object.assign(this.services[this.getServiceIndex(service)], { selected: true })
    },

    getPartners (data) {
      this.partners = Object.assign({}, ...data.map(partner => ({ [partner._id]: { uniqueCode: partner.uniqueCode, name: partner.company.name } })))
      this.sendRequest()
    },

    getServiceList (data) {
      this.serviceList = data
    },

    getEngineeringData (data) {
      this.customers = data.customers
      this.services = data.services.map(service => Object.assign(service, { selected: false }))
      this.filteredRecords = this.services

      this.ready = true
    },

    clickCallback (record) {
      this.selectRow(record)
    },

    changeCallback (record) {
      Object.assign(record, { edited: true })
    },

    save () {
      const result = this.services.filter(service => service.edited)

      this.__patchCustomers(result, this.callback)
    },

    callback (data) {
      // console.log('Updated', data)
    },

    sendRequest () {
      this.__getCustomersEngineeringData(this.getEngineeringData)
    },

    updatesCallback (data) {
      // if (Array.isArray(data) && data.length) {
      //   // this.ready = false
      //   this.sendRequest()
      // }
    }
  },

  created () {
    this.__getResellersList(this.getPartners)
    this.__getServiceList(this.getServiceList)
  },

  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>

<style>

.local-td {
  padding: 4px;
}

.table-relative {
  position: relative !important;
  border-collapse: collapse;
}
.th-sticky {
  position: sticky !important;
  top: 64px !important; /* Don't forget this, required for the stickiness */
  height: 32px;
  background: #fbfbfb;
  color: #045;
  z-index: 100;
  background: #eee;
  border: solid 1px #fff;
  /* box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4); */
}
.small-td input {
  font-size: 12px !important;
}
.selected-row {
  background: #efefef;
}
</style>
