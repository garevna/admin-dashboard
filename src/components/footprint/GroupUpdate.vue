<template>
  <v-dialog max-width="600" v-model="opened">
    <v-card flat class="homefone">
      <v-toolbar flat class="transparent">
        <v-spacer />
        <v-btn icon @click="opened = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card flat class="transparent mx-auto px-auto">
        <table class="mx-auto">
          <tr>
            <td width="240">Footprint</td>
            <td width="240">Estimated service delivery time</td>
          </tr>
          <tr>
            <td>
              <v-select
                :items="footprintOptions"
                item-text="text"
                item-value="value"
                v-model="status"
                outlined
                dense
                hide-details
                :menu-props="{ bottom: true, offsetY: true }"
              />
            </td>
            <td>
              <v-text-field
                v-model="estimatedServiceDeliveryTime"
                outlined
                dense
                hide-details
              />
            </td>
          </tr>
          <tr>
            <td style="text-align: left">
              <v-btn outlined color="buttons" @click="opened = false" class="my-10">
                Exit
              </v-btn>
            </td>
            <td style="text-align: right">
              <v-btn dark class="buttons my-10" @click="updateItems">
                Save updates
              </v-btn>
            </td>
          </tr>
        </table>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>

// import { convertBuildingStatus } from '@/helpers'
import { buildingStatusHandler } from '@/controllers/data-handlers'

const { footprintOptions } = require('@/configs').default

export default {
  name: 'GroupUpdate',

  props: ['dialog', 'items'],

  data: () => ({
    buildings: null,
    status: null,
    estimatedServiceDeliveryTime: null,
    footprintOptions: [
      { text: 'On-net', value: 'LIT' },
      { text: 'Footprint', value: 'Footprint' },
      { text: 'Construction commenced', value: 'BuildCommenced' },
      { text: 'Coming soon', value: 'ComingSoon' },
      { text: 'N/A', value: 'Other' }
    ]
  }),

  computed: {
    opened: {
      get () {
        return this.dialog
      },
      set (val) {
        this.$emit('update:dialog', val)
      }
    }
  },

  methods: {
    updateItems () {
      this.$root.$emit('progress-event', true)
      console.log('STATUS: ', this.status)
      buildingStatusHandler(footprintOptions.find(item => item.value === this.status))
      console.log('buildingStatusHandler: ', buildingStatusHandler())
      console.log(this.items)

      const data = {
        status: this.status,
        estimatedServiceDeliveryTime: this.estimatedServiceDeliveryTime
      }
      window[Symbol.for('map.worker')].patchGroupDetails(this.items.map(item => item.id), data, this.finishUpdates)
    },

    finishUpdates (data) {
      this.$root.$emit('progress-event', false)
      console.log('FINISH GROUP UPDARES\n', data)
      this.items.forEach(item => Object.assign(item, { status: this.status, estimatedServiceDeliveryTime: this.estimatedServiceDeliveryTime }))
      this.opened = false
    }
  },

  mounted () {
    this.buildings = JSON.parse(JSON.stringify(this.items))
    this.status = this.buildings[0].status
    this.estimatedServiceDeliveryTime = this.buildings[0].estimatedServiceDeliveryTime
  }
}
</script>
