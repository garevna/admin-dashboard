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
            <p style="border: solid 1px #999; border-radius: 4px; padding: 4px 16px;">
              <b>{{ buildingUniqueCode }}</b>
            </p>
          </td>
        </tr>
      </table>

      <v-row justify="center" class="outlined-row mt-0">
        <table style="width: 480px">
          <tr>
            <td width="320">Footprint</td>
            <td width="240">Estimated service delivery time</td>
          </tr>
          <tr>
            <td width="180">
              <v-select
                :items="footprintOptions"
                item-text="text"
                item-value="value"
                v-model="buildingData.status"
                outlined
                dense
                hide-details
                :menu-props="{ bottom: true, offsetY: true }"
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

      <v-card-actions class="my-8">
        <v-btn outlined color="buttons" @click="exit">Exit</v-btn>
        <v-spacer />
        <v-btn dark class="buttons" @click="saveBuildingDetails">Save updates</v-btn>
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
              <component :is="section" :buildingData="buildingData" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>

import { convertBuildingStatus, getBuildingUniqueCode, getGeneralBuildingData } from '@/helpers'

import Marketing from '@/components/footprint/building/Marketing.vue'
import Concierge from '@/components/footprint/building/Concierge.vue'

export default {
  name: 'GeneralInfo',

  components: {
    Marketing,
    Concierge,
    GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue')
  },

  props: ['buildingData'],

  data: () => ({
    ready: false,
    generalBuildingData: null,
    footprintOptions: [
      { text: 'On-net', value: 'LIT' },
      { text: 'Footprint', value: 'Footprint' },
      { text: 'Construction commenced', value: 'BuildCommenced' },
      { text: 'Coming soon', value: 'ComingSoon' },
      { text: 'N/A', value: 'Other' }
    ],
    buildingDetails: {},
    address: '',
    addressComponents: {},
    buildingType: null,
    value: null,
    panel: null
  }),

  computed: {
    buildingUniqueCode () {
      return getBuildingUniqueCode(this.buildingData.addressComponents)
    },
    status: {
      get () {
        return convertBuildingStatus(this.buildingData.status)
      },
      set (value) {
        Object.assign(this.buildingData.status, { status: convertBuildingStatus(value) })
      }
    },
    buildingAddressDetails: {
      get () {
        const { address, addressComponents, coordinates, status } = this.buildingData
        return { address, addressComponents, coordinates, status }
      }
    }
  },

  methods: {
    saveBuildingDetails () {
      this.$root.$emit('progress-event', true)
      const { address, addressComponents, coordinates, status, estimatedServiceDeliveryTime } = this.buildingData
      this.__patchBuildingDetails(this.buildingData._id, { address, addressComponents, coordinates, status, estimatedServiceDeliveryTime })
    },

    sendMessage (event) {
      this.$root.$emit('open-message-popup', {
        messageType: this.generalBuildingData.address,
        messageText: 'Building details updated'
      })
    },

    exit () {
      this.$router.push({ name: 'buildings' }).catch(failure => console.warn('Router failure:\n', failure))
    }
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
