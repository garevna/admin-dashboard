<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="500">
    <v-toolbar flat class="transparent">
      <v-toolbar-title>
        <p>
          <b class="outlined mr-4">
            {{ buildingUniqueCode }}
          </b>
          <small>{{ buildingData.address }}</small>
        </p>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="exit">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider class="mb-5" />

    <table style="width: 600px" class="my-8">
      <tr>
        <td width="100">Avg floor height</td>
        <td width="100">Number of levels</td>
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

    <!-- <v-divider class="mb-5" /> -->

    <v-expansion-panels flat inset dense focusable>
      <v-expansion-panel v-for="(level, index) of levels" :key="level.name" class="transparent expansion-panel-header-outlined">
        <v-expansion-panel-header outlined>
          {{ levelNames[index] }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card flat class="transparent mx-auto my-4" width="480">
            <v-text-field
              v-model="levelNames[index]"
              label="Level name or number"
              prepend-inner-icon="mdi-pencil"
              outlined
              dense
              hide-details
              class="my-4"
              style="max-width: 480px"
            />
            <v-text-field
              v-model="level.ownerOfExistingCAC"
              label="Owner of existing CAC"
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
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="equipment in ['router', 'splicingBox', 'splitter', 'oftu', 'gPOinRisers', 'uPSinRisers', 'customerAccessCabling', 'rack']"
                  :key="equipment"
                >
                  <td style="height: 16px">{{ equipment }}</td>
                  <td style="text-align: center; height: 16px">
                    <v-checkbox v-model="level.planned[equipment]" dense hide-details style="width: 16px; margin: 0 auto" />
                  </td>
                  <td style="text-align: center; height: 16px">
                    <v-checkbox v-model="level.installed[equipment]" dense hide-details style="width: 16px; margin: 0 auto" />
                  </td>
                  <td style="text-align: center; height: 16px">
                    <v-checkbox
                      v-if="equipment === 'customerAccessCabling' || equipment === 'gPOinRisers'"
                      v-model="level.exist[equipment]"
                      dense
                      hide-details
                      style="width: 16px; margin: 0 auto"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-row justify="end" class="mt-8">
      <v-btn outlined color="primary" class="mr-2">
        <v-icon>mdi-plus</v-icon>
        Add level
      </v-btn>
      <v-btn dark color="primary" @click="updateDetails">
        <v-icon>mdi-content-save</v-icon>
        Save updates
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { getBuildingUniqueCode } from '@/helpers'

export default {
  name: 'Levels',

  props: ['buildingData'],

  data: () => ({
    buildingId: '',
    address: '',
    levelNames: []
  }),

  computed: {
    levels () {
      const [gPOinRisers, customerAccessCabling] = [false, false]
      return this.buildingData.levels.map(level => level.exist ? level : Object.assign(level, { exist: { gPOinRisers, customerAccessCabling } }))
    },
    buildingUniqueCode () {
      return getBuildingUniqueCode(this.buildingData.addressComponents)
    }
  },

  methods: {
    exit () {
      this.$router.push({ name: 'buildings' })
    },
    updateDetails () {
      this.levels.forEach((level, index) => { level.name = this.levelNames[index] })
      console.log('LEVELS:\n', this.levels)
      this.__patchBuildingDetails(this.buildingId, { levels: this.levels })
    }
  },

  mounted () {
    this.buildingId = this.buildingData._id
    this.levelNames = this.levels.map(level => level.name)
    console.log(this.buildingUniqueCode)
    console.log(this.buildingId)
  }
}
</script>

<style scoped>
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
