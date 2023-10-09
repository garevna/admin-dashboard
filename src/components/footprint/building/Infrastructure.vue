<template>
  <v-container class="width-900 mb-12">
    <v-row justify="center" align="center" class="outlined-row mt-0">
      <v-col cols="4">
        <span class="mr-4">Number of dwellings</span>
        <v-text-field v-model="numberOfDwellings" outlined dense hide-details style="display: inline-block; width: 100px" />
      </v-col>
      <v-col cols="5">
        <v-checkbox
          v-model="customerInstallApprovalRequired"
          label="Customer install approval required"
          class="mx-8"
        />
      </v-col>
      <v-col cols="3">
        <v-checkbox
          v-model="inductionRequired"
          label="Induction required"
        />
      </v-col>
    </v-row>

    <v-row justify="center" class="my-12">
      <table width="600" class="mx-auto" v-if="infrastructure">
        <tbody>
          <tr>
            <td width="140">
              Infrastructure type
            </td>
            <td width="400">
              <v-text-field
                v-model="infrastructure.type"
                label="Infrastructure type"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
        </tbody>
      </table>
    </v-row>

    <v-row justify="center" class="my-12">
      <table width="600" class="mx-auto">
        <thead>
          <tr>
            <th style="text-align: left">Equipment</th>
            <th>Planned</th>
            <th>Installed</th>
            <th>Exist</th>
          </tr>
        </thead>
        <tbody v-if="infrastructure">
          <tr v-for="(item, key) of infrastructureEquipment" :key="key">
            <td>
              <small>{{ infrastructureEquipmentTitles[key] }}</small>
            </td>
            <td>
              <v-checkbox
                v-model="infrastructure[key].planned"
                hide-details
                class="checkbox-no-label mx-auto"
              />
            </td>
            <td>
              <v-checkbox
                v-model="infrastructure[key].installed"
                hide-details
                class="checkbox-no-label mx-auto"
              />
            </td>
            <td>
              <v-checkbox
                v-if="Object.keys(item).includes('exist')"
                v-model="infrastructure[key].exist"
                hide-details
                class="checkbox-no-label mx-auto"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </v-row>

    <v-row justify="end">
      <v-btn v-if="accessRights === 2" dark color="primary" @click="updateInfrastructure" class="mt-8">
        Save updates
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

import {
  infrastructureEquipmentTitles,
  infrastructureEquipment
} from '@/configs/buildingSchemaSections'

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'Infrasructure',

  props: ['buildingData'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    accessRights: accessRightsHandler().access[roleHandler()].buildings,
    numberOfDwellings: '',
    customerInstallApprovalRequired: false,
    inductionRequired: false,
    infrastructure: null,
    infrastructureEquipmentTitles,
    infrastructureEquipment
  }),

  methods: {
    updateInfrastructure () {
      this.$dispatchProgressEvent(true)
      const { numberOfDwellings, customerInstallApprovalRequired, inductionRequired, infrastructure } = this

      this.worker.patchBuildingDetails(this.buildingData._id, {
        numberOfDwellings,
        customerInstallApprovalRequired,
        inductionRequired,
        infrastructure
      }, this.updated)
    },

    updated (data) {
      this.$dispatchProgressEvent(false)
      this.$root.$emit('open-message-popup', { messageType: data.address, messageText: 'Building detals updated' })
    }
  },

  mounted () {
    this.numberOfDwellings = this.buildingData.numberOfDwellings
    this.customerInstallApprovalRequired = this.buildingData.customerInstallApprovalRequired
    this.inductionRequired = this.buildingData.inductionRequired

    const { infrastructureSchema } = require('@/configs/buildingSchemaSections/infrastructureSchema')

    this.infrastructure = Object.assign({}, this.__clone(infrastructureSchema), this.buildingData.infrastructure)
  }
}
</script>

<style scoped>
tr, td {
  max-height: 24px !important;
  vertical-align: super;
}

.outlined-row {
  border: solid 1px #ddd !important;
  border-radius: 4px !important;
  margin: 0;
  padding: 16px;
  background: #f5f5f5;
}

.width-900 {
  max-width: 900px !important;
}

.checkbox-no-label {
  width: 40px !important;
}
</style>
