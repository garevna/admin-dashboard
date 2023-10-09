<template>
  <v-card flat class="transparent mx-auto" width="900">
    <v-card flat class="transparent mt-0" v-if="generalBuildingData">
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
            <v-text-field v-model="generalBuildingData.uniqueCode" dense hide-details outlined />
          </td>
        </tr>
        <tr>
          <td width="160"> Building name </td>
          <td>
            <v-text-field v-model="generalBuildingData.buildingName" dense hide-details outlined />
          </td>
        </tr>
      </table>

      <v-row justify="center" class="outlined-row mt-0">
        <table style="width: 480px">
          <tr>
            <td>Footprint</td>
            <td v-if="generalBuildingData.status === 'LIT'">Connection date</td>
            <td>Estimated service delivery time</td>
          </tr>
          <tr>
            <td width="180">
              <v-select
                :items="footprintOptions"
                item-text="text"
                item-value="value"
                v-model="generalBuildingData.status"
                outlined
                dense
                hide-details
                :menu-props="{ bottom: true, offsetY: true }"
              />
            </td>
            <td width="200" v-if="generalBuildingData.status === 'LIT'">
              <DatePicker
                :date.sync="buildingAddressDetails.addressComponents.buildingConnectionDate"
              />
            </td>
            <td width="180">
              <v-text-field
                v-model="generalBuildingData.estimatedServiceDeliveryTime"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
        </table>
      </v-row>

      <v-row justify="center" class="outlined-row mt-0">
        <table style="width: 600px">
          <tr>
            <td width="280">Building class</td>
            <td width="280">Building type</td>
            <td width="280">Established/new</td>
          </tr>
          <tr>
            <td width="180">
              <v-select
                v-if="ready"
                :items="buildingClassOptions"
                v-model="generalBuildingData.addressComponents.buildingClass"
                outlined
                dense
                hide-details
                :menu-props="{ bottom: true, offsetY: true }"
              />
            </td>
            <td width="180">
              <v-select
                v-if="ready"
                :items="buildingTypeOptions"
                v-model="generalBuildingData.addressComponents.buildingType"
                outlined
                dense
                hide-details
                :menu-props="{ bottom: true, offsetY: true }"
              />
            </td>
            <td width="180">
              <v-select
                v-if="ready"
                :items="buildingCategoryOptions"
                v-model="generalBuildingData.addressComponents.buildingCategory"
                outlined
                dense
                hide-details
                :menu-props="{ bottom: true, offsetY: true }"
              />
            </td>
          </tr>
        </table>
      </v-row>

      <v-card-actions class="my-8">
        <v-btn outlined color="buttons" @click="exit">Exit</v-btn>
        <v-spacer />
        <v-btn v-if="accessRights === 2" dark class="buttons" @click="saveBuildingDetails">
          Save updates
        </v-btn>
      </v-card-actions>

      <v-row justify="center" class="mt-8">
        <v-expansion-panels
          v-model="panel"
          flat
          dense
          class="transparent"
        >
          <v-expansion-panel
            class="local-expansion-panel transparent"
            dense
            v-for="section of ['Marketing', 'Concierge']"
            :key="section"
          >
            <v-expansion-panel-header>
              <h5>
                <small>
                  <small>
                    <v-icon>mdi-format-list-checkbox</v-icon>
                    {{ section }}
                  </small>
                </small>
              </h5>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <component :is="section" :buildingData="buildingDetails" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>

import {
  convertBuildingStatus,
  getBuildingUniqueCode,
  getGeneralBuildingData
} from '@/helpers'

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'GeneralInfo',

  components: {
    DatePicker: () => import('@/components/inputs/DatePicker.vue'),
    Marketing: () => import('@/components/footprint/building/Marketing.vue'),
    Concierge: () => import('@/components/footprint/building/Concierge.vue'),
    GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue')
  },

  props: ['buildingData'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    accessRights: accessRightsHandler().access[roleHandler()].buildings,
    ready: false,
    generalBuildingData: null,
    footprintOptions: [
      { text: 'On-net', value: 'LIT' },
      { text: 'Footprint', value: 'Footprint' },
      { text: 'Construction commenced', value: 'BuildCommenced' },
      { text: 'Coming soon', value: 'ComingSoon' },
      { text: 'N/A', value: 'Other' }
    ],
    buildingClassOptions: null,
    buildingTypeOptions: null,
    buildingCategoryOptions: null,
    generalInfoUpdated: false,
    panel: null
  }),

  computed: {
    address: {
      get () {
        return this.buildingData.address
      },
      set (value) {
        this.$emit('update:buildingData', Object.assign(this.buildingData, { address: value }))
      }
    },

    buildingDetails: {
      get () {
        return this.__clone(this.buildingData)
      },
      set (data) {
        // console.log(data)
      }
    },

    status: {
      get () {
        return convertBuildingStatus(this.generalBuildingData.status)
      },
      set (value) {
        Object.assign(this.generalBuildingData.status, { status: convertBuildingStatus(value) })
      }
    },

    buildingAddressDetails: {
      get () {
        const { address, addressComponents, coordinates, status } = this.buildingData
        return { address, addressComponents, coordinates, status }
      },
      set (data) {
        if (JSON.stringify(data.addressComponents) !== JSON.stringify(this.buildingData.addressComponents)) {
          Object.assign(this.generalBuildingData, {
            addressComponents: data.addressComponents,
            address: data.address,
            coordinates: data.coordinates,
            uniqueCode: getBuildingUniqueCode(data.addressComponents)
          })
          this.$emit('update:buildingData', Object.assign(this.buildingData, this.generalBuildingData))
        }
      }
    }
  },

  methods: {
    getBuildingSettings (data) {
      this.buildingClassOptions = data.buildingClass
      this.buildingTypeOptions = data.buildingType
      this.buildingCategoryOptions = data.buildingCategory
      this.ready = true
    },

    saveBuildingDetails () {
      this.$dispatchProgressEvent(true)
      this.worker.patchBuildingDetails(this.buildingData._id, this.generalBuildingData, this.sendMessage)
      this.generalInfoUpdated = true
    },

    sendMessage (event) {
      this.$dispatchProgressEvent(false)
      this.$root.$emit('open-message-popup', {
        messageType: this.generalBuildingData.address,
        messageText: 'Building details updated'
      })
    },

    exit () {
      this.$router.push({ name: 'buildings' }).catch(failure => console.warn('Router failure:\n', failure))
      this.generalInfoUpdated && this.$root.$emit('building-general-data-changed', this.generalBuildingData)
    }
  },

  created () {
    this.__getBuildingSettings(this.getBuildingSettings)
  },

  mounted () {
    this.generalBuildingData = getGeneralBuildingData(this.buildingData)
  }
}
</script>

<style scoped>

.v-expansion-panel-header {
  padding: 12px 16px !important;
}

table {
  width: 100%;
}
tr {
  margin-bottom: 32px;
}
td {
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
