<template>
  <v-card dark flat class="transparent mx-auto mt-12" width="480" v-if="ready">
    <v-toolbar dark class="primary">
      <h5 style="color: #fff">
        <small>{{ postCode || '' }}</small>
      </h5>
      <v-spacer />
      <v-btn small color="#ff9" text @click="exportToExcel">
        Export
        <v-icon small class="ml-4">mdi-table-large</v-icon>
      </v-btn>
    </v-toolbar>
    <v-expansion-panels
      v-model="panel"
      flat
      light
      active-class="building-expansion-panel-active"
      @change="showExpanded"
    >
      <v-expansion-panel
        flat
        v-for="(building, index) in buildings"
        :key="index"
      >
        <v-expansion-panel-header hide-actions class="text-left">
          <table width="100%">
            <tr>
              <td width="320">
                <v-icon>{{ activeIndex === index ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}</v-icon>
                <b>{{ building.address }}</b>
              </td>
            </tr>
          </table>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="100%">
            <tr
              v-for="(option, num) of options"
              :key="num"
              class="building-options"
              style="cursor: pointer;"
            >
              <td>
                <v-icon small class="ml-5">mdi-file-outline</v-icon>
                {{ option }}
              </td>
              <td style="text-align: right">
                <span>
                  {{ optionValues[num] || '' }}
                </span>
              </td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

export default {
  name: 'BuildingList',

  props: ['postCode'],

  data: () => ({
    panel: [],
    activeIndex: undefined,
    ready: false,
    buildings: null,
    options: ['Premises passed', 'Active connections', 'MRR', 'Total spent', 'RoI', 'Uptake', 'ARPU']
  }),

  computed: {
    optionValues () {
      return typeof this.activeIndex === 'number'
        ? [
          this.buildings[this.activeIndex].premisesPassed,
          this.buildings[this.activeIndex].activeConnections,
          `$${this.buildings[this.activeIndex].MRR}`,
          `$${this.buildings[this.activeIndex].totalSpent}`,
          `$${this.buildings[this.activeIndex].ROI}`,
          `${this.buildings[this.activeIndex].uptake}%`,
          `$${this.buildings[this.activeIndex].ARPU}`
        ]
        : []
    }
  },

  watch: {
    postCode (val) {
      this.ready = false
      this.activeIndex = undefined
      if (val) this.__getBuildingsByPostCode(val, this.showBuildings)
    }
  },

  methods: {
    showBuildings (buildings) {
      this.buildings = buildings
      this.ready = true
    },

    showExpanded (value) {
      this.activeIndex = value
    },

    exportToExcel () {
      this.$router.push({ path: `/export-postcode-overview/${this.postCode}` })
    }
  },

  created () {
    this.__getBuildingsByPostCode(this.postCode, this.showBuildings)
  }
}
</script>

<style>
.building-expansion-panel-active {
  color: #004 !important;
}

.building-options {
  cursor: pointer;
}
.building-options:hover {
  background: #eee;
  color: #900;
}
</style>
