<template>
  <v-card flat class="transparent overflow-y-auto" max-height="420">
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
                <td colspan="2"> Total services </td>
                <td class="ml-12"><b> {{ locationData.services.active }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> New last month </td>
                <td><b> {{ locationData.services.newLastMonth }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> New current month </td>
                <td><b> {{ locationData.services.newCurrentMonth }} </b></td>
              </tr>
              <tr class="hovered-row">
                <td></td>
                <td> Pending</td>
                <td><b> {{ locationData.services.pending }} </b></td>
              </tr>
              <tr class="hovered-row clicable-row" @click="$emit('update:locationName', locationName)">
                <td colspan="2"> MRR </td>
                <td class="ml-12"><b> {{ locationData.MRR }} </b></td>
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
    ready: false
  }),

  computed: {
    selectedItem () {
      this.$emit('update:locationName', null)
      return this.list && typeof this.selected === 'number' ? Object.keys(this.list)[this.selected] : null
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
