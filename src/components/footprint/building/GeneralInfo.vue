<template>
  <v-card flat class="transparent mx-auto" width="900">
    <v-toolbar flat class="transparent">
      <v-spacer />
      <v-btn icon @click="exit">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <fieldset class="my-4 pa-8">
      <legend class="ml-4"><h5> General info </h5></legend>
      <v-card flat class="transparent mt-0" v-if="schema">
        <table>
          <tr>
            <td width="160"> Building address </td>
            <td>
              <GeoscapeAutocomplete :buildingAddressData.sync="buildingAddressDetails" />
            </td>
          </tr>
          <tr>
            <td width="160"> Building unique code </td>
            <td>
              <p style="border: solid 1px #999; border-radius: 4px; padding: 4px 16px;">
                <b>{{ buildingUniqueCode }}</b>
              </p>
            </td>
          </tr>
        </table>

        <v-row justify="center" class="outlined-row mt-0">
          <table style="width: 480px">
            <tr>
              <td width="240">Footprint</td>
              <td width="240">Estimated service delivery time</td>
            </tr>
            <tr>
              <td width="180">
                <v-select
                  :items="footprintOptions"
                  v-model="status"
                  outlined
                  dense
                  hide-details
                />
              </td>
              <td width="180">
                <v-text-field
                  v-model="buildingData.estimatedServiceDeliveryTime"
                  outlined
                  dense
                  hide-details
                />
              </td>
            </tr>
          </table>
        </v-row>

        <v-row justify="center" class="mt-8">
          <v-expansion-panels
            v-model="panel"
            flat
            dense
            class="transparent"
          >
            <v-expansion-panel class="local-expansion-panel transparent" dense>
              <v-expansion-panel-header>
                <p>
                  <v-icon>mdi-format-list-checkbox</v-icon>
                  <b>Marketing</b>
                </p>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <Marketing :buildingData="buildingData" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-card>

      <v-card-actions class="my-8">
        <v-btn outlined color="buttons" @click="exit">Exit</v-btn>
        <v-spacer />
        <v-btn dark class="buttons" @click="saveBuildingDetails">Save</v-btn>
      </v-card-actions>
    </fieldset>
  </v-card>
</template>

<script>

import { buildingSchema, rules /*, footprintOptions */ } from '@/configs'
import { testTextField, convertBuildingStatus, getBuildingUniqueCode } from '@/helpers'
// import { buildingStatusHandler } from '@/controllers/data-handlers'

import Marketing from '@/components/footprint/building/Marketing.vue'
// import Infrasructure from '@/components/footprint/building/Infrasructure.vue'

export default {
  name: 'GeneralInfo',

  components: {
    Marketing,
    // Infrasructure,
    GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue')
  },

  props: ['buildingData'],

  data: () => ({
    ready: false,
    schema: buildingSchema,
    footprintOptions: ['LIT', 'Footprint', 'BuildCommenced', 'ComingSoon', 'Other'].map(item => convertBuildingStatus(item)),
    buildingDetails: {},
    buildingUniqueCode: '',
    rules: rules,
    buildingType: null,
    value: null,
    panel: null
  }),

  computed: {
    status: {
      get () {
        console.log(this.buildingData.status, convertBuildingStatus(this.buildingData.status))
        return convertBuildingStatus(this.buildingData.status)
      },
      set (value) {
        console.log(value, convertBuildingStatus(value))
        Object.assign(this.buildingData.status, { status: convertBuildingStatus(value) })
      }
    },
    buildingAddressDetails: {
      get () {
        const { address, addressComponents, coordinates, relatedBuildingIds, status } = this.buildingData
        return { address, addressComponents, coordinates, relatedBuildingIds, status }
      },
      set (data) {
        console.log(data.addressComponents)
        this.buildingUniqueCode = getBuildingUniqueCode(data.addressComponents)
        Object.assign(this.schema, data)
      }
    }
  },

  watch: {
    // buildingDetails: {
    //   deep: true,
    //   handler (data) {
    //     console.log('WATCHER: buildingDetails\n', data)
    //     this.__getBuildingByAddress(data.address)
    //     this.buildingUniqueCode = getBuildingUniqueCode(data.addressComponents)
    //     console.log(this.buildingUniqueCode)
    //   }
    // }
    buildingUniqueCode (val) {
      console.log(this.buildingAddressDetails.address)
      this.__getBuildingByAddress(this.buildingAddressDetails.address)
    }
  },

  methods: {
    getData (data) {
      console.log('Building details', data)
    },
    getNewBuildingId (data) {
      console.log('NEW BUILDING CREATED EVENT:\n', data)
      // this.$emit('update:buildingId', data)
    },
    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },
    textField (item) {
      return testTextField(item.type)
    },
    rule (item) {
      return this.rules[item.type]
    },
    saveBuildingDetails () {
      console.log('this.estimatedServiceDeliveryTime: ', this.estimatedServiceDeliveryTime)
      const result = {
        address: this.schema.address,
        addressComponents: this.schema.addressComponents,
        management: {},
        owner: {},
        status: this.schema.buildingStatus,
        estimatedServiceDeliveryTime: this.schema.estimatedServiceDeliveryTime
      }
      for (const section of ['management', 'owner']) {
        for (const propName in this.schema[section]) {
          Object.assign(result[section], { [propName]: this.schema[section][propName].value })
        }
      }

      this.$root.$emit('progress-event', true)

      if (this.buildingId) {
        this.__putBuildingDetails(this.buildingId, result)
      } else {
        this.__postBuildingDetails(result)
      }
    },
    sendMessage (event) {
      console.log('SAVE EVENT:\n', event)
      console.log('ROUTE: ', this.$route.name)
      console.log('ADDRESS: ', this.schema.address)
      this.$root.$emit('open-message-popup', {
        messageType: this.schema.address,
        messageText: 'Building details updated'
      })
      this.$router.push({ name: 'buildings' })
    },
    exit () {
      this.$router.push({ name: 'buildings' })
    }
  },
  beforeDestroy () {
    this.$root.$off('building-details', this.getData)
    this.$root.$off('buildings-data-saved', this.sendMessage)
    this.$root.$off('new-building-created', this.getNewBuildingId)
  },
  mounted () {
    this.$root.$on('building-details', this.getData)
    // if (this.buildingId) {
    //   this.$root.$on('building-details', this.getData)
    //   this.__getBuildingById(this.buildingId)
    // }

    this.buildingUniqueCode = getBuildingUniqueCode(this.buildingAddressDetails.addressComponents)

    this.$root.$on('building-data-updated', this.sendMessage)
    this.$root.$on('new-building-created', this.getNewBuildingId)
  }
}
</script>

<style scoped>
table {
  width: 100%;
  /* margin-bottom: 160px; */
}
tr {
  margin-bottom: 32px;
}
td {
  /* border: dotted 1px red; */
  font-size: 14px;
  padding: 4px 12px;
}

.outlined-row {
  border: solid 1px #ddd !important;
  border-radius: 4px !important;
  margin: 16px;
  padding: 24px;
  background: #f5f5f5;
}

.local-expansion-panel {
  border: solid 1px #ddd !important;
  border-radius: 4px !important;
}
</style>
