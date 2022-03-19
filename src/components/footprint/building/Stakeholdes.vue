<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="600">
    <v-container v-for="sectionName of ['management', 'owner']" :key="sectionName">
      <h5 style="text-transform: uppercase"><small>{{ sectionName }}</small></h5>
      <v-row justify="center" v-for="(prop, propName) in schema[sectionName]" :key="propName" class="my-0">
        <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex" justify="end">
          <small>{{ prop.title }}</small>
        </v-col>
        <v-col cols="8" col-lg="6" col-xl="5">
          <v-text-field
            v-if="textField(prop)"
            v-model="prop.value"
            :label="prop.title"
            :rules="[prop.required ? rules.required : (value) => true, rule(prop)]"
            outlined
            dense
            hide-details
          />
          <v-text-field
            v-if="prop.type === 'mobile'"
            v-model="prop.value"
            prefix="+61"
            :rules="[prop.required ? rules.required : (value) => true, rules.mobile]"
            label="prop.title"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-4" />
    </v-container>
    <v-row justify="end" class="mt-12">
      <v-btn v-if="accessRights === 2" dark color="primary" @click="saveDetails">
        Save updates
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { testTextField } from '@/helpers'
import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

const { buildingSchema, rules } = require('@/configs').default

export default {
  name: 'Stakeholders',

  props: ['buildingData'],

  data: () => ({
    worker: window[Symbol.for('map.worker')],
    accessRights: accessRightsHandler().access[roleHandler()].buildings,
    ready: false,
    address: '',
    schema: {
      management: buildingSchema.management,
      owner: buildingSchema.owner
    },
    rules: rules,
    sections: ['management', 'owner']
  }),

  methods: {
    textField (item) {
      return testTextField(item.type)
    },

    rule (item) {
      return this.rules[item.type]
    },

    exit () {
      this.$router.push({ name: 'buildings' }).catch(failure => console.warn('Router failure:\n', failure))
    },

    saveDetails () {
      const result = { manament: {}, owner: {} }

      for (const section of this.sections) {
        result[section] = Object.assign({}, ...Object.keys(this.schema[section]).map(key => ({ [key]: this.schema[section][key].value })))
      }

      this.worker.patchBuildingDetails(this.buildingData._id, { management: result.management, owner: result.owner }, this.updated)
    },

    updated (data) {
      this.$dispatchProgressEvent(false)
      this.$root.$emit('open-message-popup', { messageType: data.address, messageText: 'Building detals updated' })
    }
  },

  mounted () {
    this.address = this.buildingData.address
    for (const section of this.sections) {
      for (const propName in this.schema[section]) {
        this.schema[section][propName].value = this.buildingData[section] ? this.buildingData[section][propName] || '' : ''
      }
    }
  }
}
</script>
