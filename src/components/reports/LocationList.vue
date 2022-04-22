<template>
  <v-card flat overflow-auto class="transparent" max-height="420">
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
                <td class="ml-12"><b> {{ locationData.totalOnNetBuildings }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td colspan="2"> Total premises passed </td>
                <td class="ml-12"><b> {{ locationData.premises }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td colspan="2"> Total connections </td>
                <td class="ml-12"><b> {{ locationData.connections.active }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td width="32"></td>
                <td width="240"> Residential: </td>
                <td class="ml-12"><b> {{ locationData.connections.residential }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> Commercial: </td>
                <td class="ml-12"><b> {{ locationData.connections.commercial }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td>New last month: </td>
                <td class="ml-12"><b> {{ locationData.connections.newLastMonth }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td>New current month: </td>
                <td class="ml-12"><b> {{ locationData.connections.newCurrentMonth }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> Pending: </td>
                <td><b> {{ locationData.connections.pendingResidential + locationData.connections.pendingCommercial }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td><b> {{  }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td><b> {{  }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td><b> {{  }} </b></td>
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

  props: [],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    list: null,
    selected: undefined,
    ready: false
  }),

  computed: {
    selectedItem () {
      return this.list && typeof this.selected === 'number' ? Object.keys(this.list)[this.selected] : null
    }
  },

  watch: {
    selected (val) {
      console.log(val)
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
      console.log(data)
    },

    dataReceivedCallback (data) {
      console.log(data)
      this.list = data
      this.ready = true
    }
  },

  created () {
    // this.sendRequestForBuildings()
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
