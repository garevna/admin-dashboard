<template>
  <table width="360" class="mx-auto">
    <tbody>
      <tr>
        <td width="100">
          <v-checkbox
            v-model="marketing.foyer"
            label="Foyer"
            hide-details
            style="width: 100px"
          />
        </td>
        <td v-if="marketing.foyer">
          <v-text-field
            v-model="marketing.foyerDetails"
            label="Foyer details"
            outlined
            dense
            hide-details
          />
        </td>
      </tr>

      <tr>
        <td>
          <v-checkbox
            v-model="marketing.lift"
            label="Lift"
            hide-details
            style="width: 100px"
          />
        </td>
        <td v-if="marketing.lift">
          <v-text-field
            v-model="marketing.liftDetails"
            label="Lift details"
            outlined
            dense
            hide-details
          />
        </td>
      </tr>

      <tr />

      <tr>
        <td width="180" class="mt-2">
          Parking availability
        </td>
        <td>
          <v-text-field
            v-model="marketing.parkingAvailability"
            label="Parking availability"
            outlined
            dense
            hide-details
          />
        </td>
      </tr>

      <tr style="margin-top: 32px">
        <td width="180">
          Existing competitors
        </td>
        <td>
          <v-text-field
            v-model="marketing.existingCompetitors"
            label="Existing competitors"
            outlined
            dense
            hide-details
          />
        </td>
      </tr>

      <tr></tr>

      <tr>
        <td> Other marketing </td>
        <td>
          <v-text-field
            v-model="marketing.other"
            label="Other marketing"
            outlined
            dense
            hide-details
          />
        </td>
      </tr>

      <tr>
        <td></td>
        <td style="text-align: right">
          <v-btn v-if="accessRights === 2" dark color="primary" @click="updateMarketing" class="mt-8">
            Save updates
          </v-btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'Marketing',

  props: ['buildingData'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    accessRights: accessRightsHandler().access[roleHandler()].buildings,
    buildingId: null,
    marketing: {
      foyer: false,
      foyerDetails: '',
      lift: false,
      liftDetails: '',
      parkingAvailability: '',
      existingCompetitors: [],
      other: ''
    }
  }),

  methods: {
    updateMarketing () {
      this.worker.patchBuildingDetails(this.buildingId, { access: this.access }, this.updated)
      this.worker.patchBuildingDetails(this.buildingId, { marketing: this.marketing }, this.updated)
    },

    updated (data) {
      this.$dispatchProgressEvent(false)
      this.$root.$emit('open-message-popup', { messageType: data.address, messageText: 'Building detals updated' })
    }
  },

  mounted () {
    this.buildingId = this.buildingData._id
    this.marketing = this.buildingData.marketing || this.marketing
  }
}
</script>

<style scoped>
tr, td {
  /* height: 24px !important; */
  vertical-align: super;
  padding: 4px 16px;
}
</style>
