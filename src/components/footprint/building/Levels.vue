<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="960">
    <table style="width: 600px" class="my-8">
      <tr>
        <td width="100" style="text-align: left !important">Avg floor height</td>
        <td width="100" style="text-align: left !important">Number of levels</td>
      </tr>
      <tr>
        <td>
          <v-text-field
            v-model="buildingData.avgFloorHeight"
            outlined
            dense
            hide-details
            style="width: 80px"
          />
        </td>
        <td>
          <v-text-field
            v-model="buildingData.numberOfLevels"
            outlined
            dense
            hide-details
            style="width: 80px"
          />
        </td>
      </tr>
    </table>

    <v-expansion-panels flat inset dense focusable>
      <v-expansion-panel v-for="(level, index) of levels" :key="index" class="transparent expansion-panel-header-outlined">
        <v-expansion-panel-header outlined>
          {{ level.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card flat class="transparent mx-auto my-4" width="900">
            <v-text-field
              v-model="level.name"
              label="Level name or number"
              prepend-icon="mdi-pencil"
              outlined
              dense
              hide-details
              class="my-4"
              style="max-width: 480px"
            />
            <v-text-field
              v-model="level.ownerOfExistingCAC"
              label="Owner of existing CAC"
              prepend-icon="mdi-pencil"
              outlined
              dense
              style="max-width: 480px"
            />
            <table>
              <thead>
                <tr>
                  <th width="180" style="text-align: left">Equipment</th>
                  <th width="100"> Planned </th>
                  <th width="100"> Installed </th>
                  <th width="100"> Exist </th>
                  <th width="420"> Details </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="equipment in equipmentNames"
                  :key="equipment"
                >
                  <td style="height: 16px">{{ equipment }}</td>
                  <td style="text-align: center; height: 16px">
                    <v-checkbox v-model="level.planned[equipment]" dense hide-details class="check-box" />
                  </td>
                  <td style="text-align: center; height: 16px">
                    <v-checkbox v-model="level.installed[equipment]" dense hide-details class="check-box" />
                  </td>
                  <td width="80" style="text-align: center; height: 16px">
                    <v-checkbox
                      v-if="equipment === 'customerAccessCabling' || equipment === 'gPOinRisers'"
                      v-model="level.exist[equipment]"
                      dense
                      hide-details
                      class="check-box"
                    />
                  </td>
                  <td width="280">
                    <v-text-field v-model="level.details[equipment]" outlined dense hide-details />
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-row justify="end" class="mt-8">
      <v-btn v-if="accessRights === 2" outlined color="primary" class="mr-2" @click="addLevel">
        <v-icon>mdi-plus</v-icon>
        Add level
      </v-btn>
      <v-btn v-if="accessRights === 2" dark color="primary" @click="updateDetails">
        <v-icon>mdi-content-save</v-icon>
        Save updates
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { levelSchema, equipmentNames } from '@/configs/buildingSchemaSections'
import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'Levels',

  props: ['buildingData'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    accessRights: accessRightsHandler().access[roleHandler()].buildings,
    buildingId: '',
    address: '',
    levels: [],
    equipmentNames: equipmentNames
  }),

  methods: {
    addLevel () {
      this.levels.push(this.__clone(levelSchema))
    },

    updateDetails () {
      this.$dispatchProgressEvent(true)
      this.worker.patchBuildingDetails(this.buildingId, {
        avgFloorHeight: this.buildingData.avgFloorHeight,
        numberOfLevels: this.buildingData.numberOfLevels,
        levels: this.levels
      }, this.updated)
    },

    updated (data) {
      this.$dispatchProgressEvent(false)
      this.$root.$emit('open-message-popup', { messageType: data.address, messageText: 'Building detals updated' })
    }
  },

  mounted () {
    this.buildingId = this.buildingData._id
    this.levels = this.buildingData.levels.map(level => Object.assign(this.__clone(levelSchema), level))
  }
}
</script>

<style scoped>

.check-box {
  width: 16px;
  margin: 0 auto;
}

.table-cell-width-border {
  border: solid 1px #999 !important;
  border-radius: 4px;
  padding: 4px 16px;
  vertical-align: super;
}

.expansion-panel-header-outlined {
  border: solid 1px #ddd !important;
  border-radius: 4px !important;
}

.outlined {
  display: inline-block;
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 4px 12px;
}
</style>
