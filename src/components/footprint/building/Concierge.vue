<template>
  <v-card flat class="transparent mx-auto mb-12" max-width="600">
    <v-row justify="center" v-for="(prop, propName) in concierge" :key="propName" class="my-0">
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
      </v-col>
    </v-row>

    <v-row justify="end" class="mt-12">
      <v-btn dark color="primary" @click="saveConciergeDetails">
        Save updates
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

import { testTextField } from '@/helpers'

const { buildingSchema, rules } = require('@/configs').default

export default {
  name: 'Concierge',

  props: ['buildingData'],

  data: () => ({
    ready: false,
    address: '',
    concierge: buildingSchema.concierge,
    rules: rules
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
    saveConciergeDetails () {
      const concierge = {}

      for (const propName in this.concierge) {
        concierge[propName] = this.concierge[propName].value
      }

      this.__patchBuildingDetails(this.buildingData._id, { concierge })
    }
  },

  mounted () {
    for (const propName in this.concierge) {
      this.concierge[propName].value = this.buildingData.concierge ? this.buildingData.concierge[propName] : ''
    }
  }
}
</script>
