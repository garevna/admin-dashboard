<template>
  <v-card flat class="transparent mx-auto" max-width="640">
      <table>
        <tbody>
          <tr>
            <td width="240">
              <v-checkbox
                label="Master"
                v-model="isMaster"
                @change="changeMaster($event)"
              />
            </td>
            <td width="240">
              <v-checkbox
                label="Slave"
                v-model="isSlave"
                @change="changeSlave($event)"
              />
            </td>
          </tr>
          <tr v-if="isMaster && Array.isArray(slaves)">
            <td colspan="2">
              <h5>
                <small>Slaves</small>
              </h5>
              <table>
                <tbody>
                  <tr v-for="building of slaves" :key="building.id" class="mb-12">
                    <td>
                      {{ building.address }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr v-if="isSlave">
            <td colspan="2">
              <v-select
                v-model="masterBuildingId"
                :items="items"
                outlined
                hide-details
                label="Master building"
                :menu-props="{ bottom: true, offsetY: true }"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table class="my-12">
        <tbody>
          <tr>
            <td class="pr-4">
              Building Connection Costs
            </td>
            <td>
              <v-text-field
                label="Building Connection Costs"
                v-model="buildingConnectionCosts"
                outlined
                dense
              />
            </td>
          </tr>
          <tr>
            <td class="pr-4">
              Internal Installation Costs
            </td>
            <td>
              <v-text-field
                label="Internal Installation Costs"
                v-model="internalInstallationCosts"
                outlined
                dense
              />
            </td>
          </tr>
        </tbody>
      </table>

      <v-row justify="center" class="my-12">
        <v-btn dark class="primary my-12" @click="saveBuildingDetails">
          update / save
        </v-btn>
      </v-row>
  </v-card>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'OtherBuildingDetails',

  props: ['buildingData'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    accessRights: accessRightsHandler().access[roleHandler()].buildings,
    isMaster: false,
    isSlave: false,
    items: [],
    slaves: [],
    ready: false
  }),

  computed: {
    masterBuildingId: {
      get () {
        return this.ready ? this.buildingData.addressComponents.masterBuildingId : null
      },
      set (val) {
        const { addressComponents } = this.buildingData
        Object.assign(addressComponents, { masterBuildingId: val })
        this.$emit('update:buildingData', Object.assign(this.buildingData, { addressComponents }))
      }
    },

    buildingConnectionCosts: {
      get () {
        return this.buildingData.addressComponents.buildingConnectionCosts
      },
      set (val) {
        const { addressComponents } = this.buildingData
        Object.assign(addressComponents, { buildingConnectionCosts: val })
        this.$emit('update:buildingData', Object.assign(this.buildingData, { addressComponents }))
      }
    },

    internalInstallationCosts: {
      get () {
        return this.buildingData.addressComponents.internalInstallationCosts
      },
      set (val) {
        const { addressComponents } = this.buildingData
        Object.assign(addressComponents, { internalInstallationCosts: val })
        this.$emit('update:buildingData', Object.assign(this.buildingData, { addressComponents }))
      }
    }
  },

  methods: {
    exit () {
      this.$router.push({ name: 'buildings' }).catch(failure => console.warn('Router failure:\n', failure))
    },

    saveBuildingDetails () {
      this.$dispatchProgressEvent(true)
      this.worker.patchBuildingDetails(this.buildingData._id, { addressComponents: this.buildingData.addressComponents }, this.sendMessage)

      const masterId = this.buildingData.addressComponents.masterBuildingId
      if (masterId) this.worker.getBuildingDetailsById(masterId, this.updateMaster)
    },

    updateMaster (masterDetails) {
      const { addressComponents } = masterDetails

      if (!Array.isArray(addressComponents.slaves)) addressComponents.slaves = []

      if (this.buildingData.isSlave) {
        if (!addressComponents.slaves.includes(this.buildingData._id)) {
          addressComponents.slaves.push(this.buildingData._id)
          this.worker.patchBuildingDetails(masterDetails._id, { addressComponents }, this.sendMessage)
        }
      } else {
        const index = addressComponents.slaves.indexOf(this.buildingData._id)
        if (index !== -1) {
          addressComponents.slaves.splice(index, 1)
          this.worker.patchBuildingDetails(masterDetails._id, { addressComponents }, this.sendMessage)
        }
      }
    },

    sendMessage (event) {
      this.$dispatchProgressEvent(false)
      this.$root.$emit('open-message-popup', {
        messageType: this.buildingData.address,
        messageText: 'Building details updated'
      })
    },

    changeMaster (val) {
      const { addressComponents } = this.buildingData
      Object.assign(addressComponents, { isMaster: val })

      if (val && this.isSlave) {
        this.isSlave = false
        Object.assign(addressComponents, { isSlave: false })
      }
      this.$emit('update:buildingData', Object.assign(this.buildingData, { addressComponents }))
    },

    changeSlave (val) {
      const { addressComponents } = this.buildingData
      Object.assign(addressComponents, { isSlave: val })

      if (val && this.isMaster) {
        this.isMaster = false
        Object.assign(addressComponents, { isMaster: false })
      }

      this.$emit('update:buildingData', Object.assign(this.buildingData, { addressComponents }))

      val && !this.items.length && this.worker.getMasterBuildingsList(this.getMasterList)
    },

    getSlavesList (data) {
      this.slaves = data
    },

    getMasterList (data) {
      this.items = data.map(item => ({
        text: item.address,
        value: item.id
      }))
      this.ready = true
    }
  },

  beforeMount () {
    const { isMaster = false, isSlave = false, /* masterBuildingId, */ slaves = [] } = this.buildingData.addressComponents
    this.isMaster = isMaster
    this.isSlave = isSlave
    if (isSlave) this.worker.getMasterBuildingsList(this.getMasterList)
    if (isMaster) {
      if (slaves.length > 0) this.worker.getBuildingsByList(slaves, this.getSlavesList)
      else this.worker.getSlavesForMaster(this.buildingData._id, this.getSlavesList)
    }
  }
}
</script>
