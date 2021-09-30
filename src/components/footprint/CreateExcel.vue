<template>
  <v-card flat class="transparent mx-auto mt-4 mb-12" max-width="960">
    <!-- <v-toolbar flat class="transparent my-4"> -->
      <!-- <h5>Create excel table: select the fields to include</h5> -->
    <!-- </v-toolbar> -->
    <!-- <v-row justify="center" class="my-12">
      <v-checkbox
        :value="true"
        hide-details
        readonly
        color="primary"
        label="Address"
      />
    </v-row> -->
    <v-row justify="center" class="my-12">
      <v-col cols="4">
        <v-card class="transparent py-3 px-5" min-height="480">
          <v-row v-for="(prop, propName) in simple" :key="propName">
            <v-checkbox
              v-model="prop.selected"
              hide-details
              color="primary"
              :label="prop.header"
            />
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="4" v-for="(section, sectionName) of sections" :key="sectionName" max-width="360">
        <v-card class="transparent py-2 px-4" min-height="480">
          <h5>
            <small>{{ sectionName }}</small>
          </h5>
          <div v-for="(prop, propName) in section" :key="propName">
            <v-checkbox
              v-model="prop.selected"
              hide-details
              color="primary"
              :label="prop.title"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn @click="createExcelTable" dark color="primary" class="mb-12">
        Create excel table
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import {
  access,
  concierge,
  corporation,
  // infrastructureFields,
  // infrastructureTitles,
  // level,
  management,
  marketing,
  owner,
  simpleFields
} from '@/configs/buildingSchemaSections'

export default {
  name: 'CreateExcel',

  data: () => ({
    // ready: false,
    simple: simpleFields,

    sectionNames: ['access', 'concierge', 'corporation', 'management', 'owner', 'marketing'],
    schema: [
      access,
      concierge,
      corporation,
      // infrastructureFields,
      // infrastructureTitles,
      // level,
      management,
      owner,
      marketing
    ],
    sections: {}
  }),

  methods: {
    createExcelTable () {
      const request = [
        { header: 'Address', width: 45, key: 'address' },
        { header: 'Status', width: 15, key: 'status' }
      ]
      for (const key in this.simple) {
        if (this.simple[key].selected) {
          request.push({
            header: this.simple[key].header,
            key,
            width: this.simple[key].width || 12
          })
        }
      }
      for (const section in this.sections) {
        for (const key in this.sections[section]) {
          if (this.sections[section][key].selected) {
            request.push({
              header: this.sections[section][key].title,
              key: `${section}.${key}`,
              width: this.sections[section][key].width || 12
            })
          }
        }
        console.log(request)
      }
      this.__createBuildingExcelFile(request)
    },
    excelFileCreated (data) {
      console.log(data)
    }
  },

  beforeDestroy () {
    this.$root.$off('buildings-excel-file-created', this.excelFileCreated)
  },

  beforeMount () {
    this.$root.$on('buildings-excel-file-created', this.excelFileCreated)

    this.schema.forEach((section, index) => {
      this.sections[this.sectionNames[index]] = Object.assign({}, ...Object.keys(section).map(key => ({ [key]: { selected: false, title: section[key].title } })))
    })
    // this.ready = true
  }
}
</script>
