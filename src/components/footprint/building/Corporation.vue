<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="600">
    <v-row justify="center" v-for="(prop, propName) in corporation" :key="propName" class="my-0">
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
          :label="prop.title"
          outlined
          dense
          hide-details
        />

        <p v-if="prop.type === 'address' && !editAddress">
          <small style="display: inline-block; border: solid 1px #aaa; border-radius: 4px; padding: 6px 12px; width: 360px">{{ prop.value }}</small>
          <v-icon small @click="editAddress = true" class="ml-2">mdi-pencil</v-icon>
        </p>

        <GeoscapeAutocomplete
          v-if="prop.type === 'address' && editAddress"
          :buildingAddressData.sync="prop.value"
        />
      </v-col>
    </v-row>

    <v-row justify="end" class="mt-12">
      <v-btn dark color="primary" @click="saveCorporationDetails">
        Save updates
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { buildingSchema, rules } from '@/configs'
import { testTextField } from '@/helpers'

import GeoscapeAutocomplete from '@/components/inputs/GeoscapeAutocomplete.vue'

export default {
  name: 'Corporation',

  components: {
    GeoscapeAutocomplete
  },

  props: ['buildingData'],

  data: () => ({
    ready: false,
    address: '',
    corporation: buildingSchema.corporation,
    rules: rules,
    editAddress: false
  }),

  methods: {
    textField (item) {
      return testTextField(item.type)
    },

    rule (prop) {
      return prop.value ? this.rules[prop.type] : value => true
    },

    exit () {
      this.$router.push({ name: 'buildings' })
    },

    saveCorporationDetails () {
      const corporation = {}

      for (const propName in this.corporation) {
        corporation[propName] = propName === 'headOfficeAddress'
          ? this.corporation.headOfficeAddress.value.address
          : this.corporation[propName].value
      }

      this.__patchBuildingDetails(this.buildingData._id, { corporation })
    }
  },

  mounted () {
    if (!this.buildingData.corporation) this.buildingData.corporation = { headOfficeAddress: '...' }
    for (const propName in this.corporation) {
      this.corporation[propName].value = this.buildingData.corporation ? this.buildingData.corporation[propName] || '' : ''
    }
  }
}
</script>
