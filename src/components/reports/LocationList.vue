<template>
  <v-card flat class="transparent overflow-y-auto mb-12" max-height="420">
    <v-expansion-panels
      flat
      dense
      focusable
      class="transparent"
      active-class="expanded-panel-active-class"
      v-model="selected"
      v-if="ready"
    >
      <v-expansion-panel
        flat
        class="special-panel transparent"
        v-for="(locationData, locationName) of list"
        :key="locationName"
      >
        <v-expansion-panel-header
          :expand-icon="getIcon(locationName)"
          disable-icon-rotate
          style="heigh: 32px!important"
        >
          {{ locationName }}
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <table style="border-spacing: 0;">
            <tbody>
              <tr class="hovered-row">
                <td colspan="2"> Total on-net buildings </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.totalOnNetBuildings || '0' }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td colspan="2"> Total premises passed </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.premises || '0' }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td colspan="2"> Total connections </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.connections.active }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td width="32"></td>
                <td width="240"> Residential: </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.connections.residential }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> Commercial: </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.connections.commercial }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td>New last month: </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.connections.newLastMonth }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td>New current month: </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.connections.newCurrentMonth }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> Pending: </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.connections.pendingResidential + locationData.connections.pendingCommercial }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td colspan="2"> Total services </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.services.active }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> New last month </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.services.newLastMonth }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> New current month </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.services.newCurrentMonth }}
                </td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> Pending</td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  {{ locationData.services.pending }}
                </td>
              </tr>
              <tr class="hovered-row clicable-row" @click="$emit('update:locationName', locationName)">
                <td colspan="2"> MRR </td>
                <td width="100" style="font-weight: bold; text-align: right!important;">
                  <span style="color: #999">$</span>{{ MRR }}
                </td>
              </tr>
            </tbody>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

export default {
  name: 'LocationList',

  props: ['locationName'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    list: null,
    selected: undefined,
    ready: false,
    currentMonth: new Date().toISOString().slice(0, 7)
  }),

  computed: {
    selectedItem () {
      this.$emit('update:locationName', null)
      return this.list && typeof this.selected === 'number' ? Object.keys(this.list)[this.selected] : null
    },
    MRR () {
      return this.selectedItem ? this.list[this.selectedItem].dynamic[this.currentMonth] : 0
    }
  },

  methods: {
    getIcon (itemName) {
      return itemName === this.selectedItem ? 'mdi-folder-open-outline' : 'mdi-folder-outline'
    },

    sendRequestForBuildings () {
      this.worker.getBuildingsList('lit', this.receiveBuildingList)
    },

    receiveBuildingList (data) {
      // console.log(data)
    },

    dataReceivedCallback (data) {
      this.list = data
      this.ready = true
    }
  },

  created () {
    this.__getLocations(this.dataReceivedCallback)
  }
}
</script>

<style>

.hovered-row:hover {
  background: #eee;
}

.hovered-row td {
  padding-left: 16px;
  padding-right: 16px;
}

.clicable-row:hover {
  background: #9004;
  color: #900;
  cursor: pointer;
}

/* .hovered-row:hover td {
  padding-left: 16px;
  padding-right: 16px;
} */

.expanded-panel-active-class {
  color: #900;
  background: #900;
}

.special-panel .v-expansion-panel-header {
  /* height: 32px !important; */
  padding: 8px 24px !important;
  min-height: 24px !important;
}

.special-panel .v-expansion-panel-content__wrap {
  padding-top: 16px !important;
  margin: 0 32px !important;
  border: solid 1px #ddd;
  border-radius: 4px;
}

.special-panel .v-expansion-panel-content__wrap p,
.special-panel .v-expansion-panel-content__wrap li {
  font-size: 13px;
}
</style>
