<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="600">
    <v-toolbar flat class="transparent">
      <v-toolbar-title>
        {{ address }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="exit">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container v-for="sectionName of ['management', 'owner']" :key="sectionName">
      <v-divider class="my-4" />
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
    </v-container>
    <v-row justify="end" class="mt-12">
      <v-btn dark color="primary" @click="saveDetails">
        Save updates
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { buildingSchema, rules } from '@/configs'
import { testTextField } from '@/helpers'

export default {
  name: 'Stakeholders',

  props: ['buildingData'],

  data: () => ({
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
      this.$router.push({ name: 'buildings' })
    },
    saveDetails () {
      const result = { manament: {}, owner: {} }

      for (const section of this.sections) {
        for (const propName in this.schema[section]) {
          result[section][propName] = this.schema[section][propName].value
        }
      }
      console.log({ management: result.management, owner: result.owner })
      // this.__patchBuildingDetails({ management: result.management, owner: result.owner })
    }
  },

  mounted () {
    this.address = this.buildingData.address
    for (const section of this.sections) {
      for (const propName in this.schema[section]) {
        this.schema[section][propName].value = this.buildingData[section][propName] || ''
      }
    }
  }
}
</script>
