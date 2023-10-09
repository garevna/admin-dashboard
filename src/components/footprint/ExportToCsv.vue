<template>
  <v-card flat class="transparent mx-auto mt-4 mb-12" max-width="600">
    <v-row justify="start" v-for="(field, index) in schema" :key="index">
      <v-checkbox
        v-model="field.selected"
        hide-details
        color="primary"
        :label="field.title"
      />
    </v-row>
    <v-row justify="center" class="my-12">
      <v-btn @click="createRequestedFields" dark color="primary" class="my-12">
        Export to csv
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

const { buildingSchemaForExportToCsv } = require('@/configs').default

export default {
  name: 'ExportToCsv',

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    schema: buildingSchemaForExportToCsv.map(item => Object.assign(item, { selected: false }))
  }),

  methods: {
    createRequestedFields () {
      this.$root.$emit('progress-event', true)
      this.$root.$emit('show-snack-bar', 'Wait please.')
      const requestedFields = this.schema.filter(item => item.selected)
        .map(item => ({ prop: item.prop, title: item.title, defaultValue: item.defaultValue }))

      this.worker.exportBuildingsToCsv(requestedFields, this.blobCreated)
    },

    blobCreated (blob) {
      this.$root.$emit('progress-event', false)
      this.$root.$emit('hide-snack-bar')
      const link = Object.assign(document.createElement('a'), {
        href: URL.createObjectURL(blob),
        download: 'buildings.csv',
        style: 'visibility: hidden'
      })

      document.body.appendChild(link).click()
      document.body.removeChild(link)
    }
  }
}
</script>
