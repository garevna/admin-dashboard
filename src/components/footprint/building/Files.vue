<template>
  <v-card flat class="transparent mx-auto" max-width="960">
    <v-toolbar flat class="transparent" style="margin-top: -80px!important">
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="primary"></v-tabs-slider>

          <v-tab v-for="item of endpoints" :key="item">
            {{ tabs[item] }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab" class="transparent">
      <v-tab-item v-for="item of endpoints" :key="item">
        <v-card v-if="ready[item]" flat class="transparent mt-12">
          <v-toolbar flat class="transparent">
            <v-spacer />
            <v-file-input
              v-if="accessRights === 2"
              accept="application/pdf"
              placeholder="Click here to choose a file"
              prepend-icon="mdi-file-upload"
              outlined
              label=""
              hide-details
              dense
              @change="upload(item, $event)"
            />

            <v-btn v-if="accessRights === 2" dark @click="save(item)" color="primary" class="ml-4">
              <v-icon class="mr-4"> mdi-file-upload </v-icon>
              UPLOAD
            </v-btn>
          </v-toolbar>
          <object
            :data="content[item]"
            type="application/pdf"
            width="100%"
            height="640"
          ></object>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

const { pdf404 } = require('@/configs').default

export default {
  name: 'Files',

  props: ['buildingData'],

  data: () => ({
    accessRights: accessRightsHandler().access[roleHandler()].buildings,
    buildingId: null,
    files: null,
    tab: null,
    ready: {
      design: false,
      approoval: false,
      inspect: false,
      install: false,
      scope: false
    },
    endpoints: ['approoval', 'design', 'inspect', 'install', 'scope'],
    tabs: {
      approoval: 'Approval',
      design: 'Design',
      inspect: 'Inspect',
      install: 'Install',
      scope: 'Scope'
    },
    content: {
      design: pdf404,
      approoval: pdf404,
      inspect: pdf404,
      install: pdf404,
      scope: pdf404
    }
  }),

  methods: {
    getData (section, data) {
      Object.assign(this.content, { [section]: data?.indexOf('data:application/pdf;base64') !== 0 ? pdf404 : data })
      Object.assign(this.ready, { [section]: true })
    },
    getApprooval (data) {
      this.getData('approoval', data)
    },
    getDesign (data) {
      this.getData('design', data)
    },
    getScope (data) {
      this.getData('scope', data)
    },
    getInspect (data) {
      this.getData('inspect', data)
    },
    getInstall (data) {
      this.getData('install', data)
    },
    upload (section, file) {
      const reader = Object.assign(new FileReader(), {
        onload: function (event) {
          Object.assign(this.content, { [section]: event.target.result })
        }.bind(this),
        onerror: error => console.warn(error)
      })

      reader.readAsDataURL(file)
    },

    save (section) {
      this.__createFile(this.buildingId, section, this.content[section], this.callback)
    },

    callback (data) {
      // console.log(data)
    }
  },

  created () {
    if (this.buildingData) {
      this.buildingId = this.buildingData._id
      for (const section of this.endpoints) {
        this.__getFile(this.buildingId, section, this[`get${section[0].toUpperCase()}${section.slice(1)}`])
      }
    }
  }
}
</script>
