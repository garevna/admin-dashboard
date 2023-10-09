<template>
  <v-card flat class="transparent mx-auto" max-width="800">
    <table style="width: 100%">
      <tbody>
        <tr>
          <td width="100"><small> to riser </small></td>
          <td>
            <v-text-field
              v-model="access.toRiser"
              outlined
              dense
              hide-details
            />
          </td>
        </tr>
        <tr>
          <td><small> to MDF </small></td>
          <td>
            <v-text-field
              v-model="access.toMDF"
              outlined
              dense
              hide-details
            />
          </td>
        </tr>
        <tr>
          <td><small> to building </small></td>
          <td>
            <v-text-field
              v-model="access.toBuilding"
              outlined
              dense
              hide-details
            />
          </td>
        </tr>
        <tr>
          <td><small> to car park </small></td>
          <td>
            <v-text-field
              v-model="access.toCarPark"
              outlined
              dense
              hide-details
            />
          </td>
        </tr>
      </tbody>
    </table>

    <v-row justify="center" class="my-8">
      <v-expansion-panels v-model="timePicker" flat dense>
        <v-expansion-panel class="local-expansion-panel transparent">
          <v-expansion-panel-header>
            <p>
              <v-icon>mdi-clock-time-four</v-icon>
              <b>Installation access times</b>
            </p>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <TimePicker
              title="From"
              :time.sync="access.installationAccessTimes.from"
            />
            <TimePicker
              title="to"
              :time.sync="access.installationAccessTimes.to"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row justify="end" class="my-8">
      <v-btn v-if="accessRights === 2" dark color="primary" @click="updateAccess" class="mt-8">
        Save updates
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'
import TimePicker from '@/components/inputs/TimePicker.vue'

export default {
  name: 'Access',

  components: {
    TimePicker
  },

  props: ['buildingData'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    accessRights: accessRightsHandler().access[roleHandler()].buildings,
    access: {
      toRiser: '',
      toMDF: '',
      toBuilding: '',
      toCarPark: '',
      installationAccessTimes: { from: '10:00', to: '18:00' }
    },
    timePicker: null
  }),

  methods: {
    updateAccess () {
      this.$dispatchProgressEvent(true)
      this.worker.patchBuildingDetails(this.buildingId, { access: this.access }, this.updated)
    },

    updated (data) {
      this.$dispatchProgressEvent(false)
      this.$root.$emit('open-message-popup', { messageType: data.address, messageText: 'Building detals updated' })
    }
  },

  mounted () {
    this.buildingId = this.buildingData._id
    this.access = this.buildingData.access || this.access
  }
}
</script>

<style scoped>
tr, td {
  height: 24px !important;
  vertical-align: super;
}

.local-expansion-panel {
  border: solid 1px #ddd !important;
  border-radius: 4px !important;
}
</style>
