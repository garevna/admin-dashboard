<template>
  <v-card flat class="transparent mx-auto" width="960" v-if="ready">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-spacer />
      <v-btn icon @click="exit">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <fieldset class="my-4 pa-8">
      <legend class="ml-4"><h5>Building details</h5></legend>
      <v-card flat class="transparent mt-0" v-if="schema">
        <v-container>
          <v-row justify="center">
            <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex">
              <small>Building address</small>
            </v-col>
            <v-col cols="8" col-lg="6" col-xl="5">
              <GeoscapeAutocomplete :buildingAddressData.sync="buildingData" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex mb-8">
              <small>Building unique code</small>
            </v-col>
            <v-col cols="8" col-lg="6" col-xl="5">
              <v-text-field
                v-model="schema.buildingUniqueCode"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-0">
            <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex mb-8">
              <small>Footprint</small>
            </v-col>
            <v-col cols="8" col-lg="6" col-xl="5">
              <v-select
                :items="footprintOptions"
                item-text="title"
                item-value="value"
                v-model="schema.status"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex mb-8">
              <small>Estimated service delivery time</small>
            </v-col>
            <v-col cols="8" col-lg="6" col-xl="5">
              <v-text-field
                v-model="schema.estimatedServiceDeliveryTime"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container v-for="sectionName of ['management', 'owner']" :key="sectionName">
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
      </v-card>
      <v-card-actions class="my-8">
        <v-btn outlined color="buttons" @click="exit">Exit</v-btn>
        <v-spacer />
        <v-btn dark class="buttons" @click="saveBuildingDetails">Save</v-btn>
      </v-card-actions>
    </fieldset>
  </v-card>
</template>

<script>

import { buildingSchema, rules, footprintOptions } from '@/configs'
import { testTextField, getBuildingUniqueCode } from '@/helpers'
import { buildingStatusHandler } from '@/controllers/data-handlers'

export default {
  name: 'EditBuildingDetails',
  components: {
    GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue')
  },
  props: ['buildingId'],
  data: () => ({
    ready: false,
    schema: buildingSchema,
    footprintOptions: footprintOptions,
    buildingDetails: {},
    rules: rules,
    buildingType: null,
    value: null
  }),
  computed: {
    buildingData: {
      get () {
        const { address, addressComponents, coordinates, relatedBuildingIds, buildingUniqueCode, status } = this.schema
        return { address, addressComponents, coordinates, relatedBuildingIds, buildingUniqueCode, status }
      },
      set (data) {
        Object.assign(this.schema, data)
      }
    },
    buildingUniqueCode: {
      get () {
        return this.schema.buildingUniqueCode
      },
      set (value) {
        this.schema.buildingUniqueCode = value
      }
    }
  },
  watch: {
    schema: {
      deep: true,
      handler (data) {
        this.schema.buildingUniqueCode = getBuildingUniqueCode(data.addressComponents)
        console.log(this.schema.buildingUniqueCode)
      }
    }
  },
  methods: {
    getData (response) {
      console.log(response)
      const { address, addressComponents, coordinates, relatedBuildingIds, estimatedServiceDeliveryTime } = response.result
      Object.assign(this.schema, {
        address,
        addressComponents,
        coordinates,
        relatedBuildingIds,
        buildingUniqueCode: getBuildingUniqueCode(response.result.addressComponents),
        status: buildingStatusHandler(),
        estimatedServiceDeliveryTime
      })

      for (const sectionName of ['management', 'owner']) {
        for (const propName in this.schema[sectionName]) {
          this.schema[sectionName][propName].value = response.result[sectionName][propName]
        }
      }

      console.log(this.schema)
      this.ready = true
    },
    getNewBuildingId (data) {
      console.log('NEW BUILDING CREATED EVENT:\n', data)
      // this.$emit('update:buildingId', data)
    },
    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },
    textField (item) {
      return testTextField(item.type)
    },
    rule (item) {
      return this.rules[item.type]
    },
    saveBuildingDetails () {
      console.log('this.schema.estimatedServiceDeliveryTime: ', this.schema.estimatedServiceDeliveryTime)
      const result = {
        address: this.schema.address,
        addressComponents: this.schema.addressComponents,
        management: {},
        owner: {},
        status: this.schema.buildingStatus,
        estimatedServiceDeliveryTime: this.schema.estimatedServiceDeliveryTime
      }
      for (const section of ['management', 'owner']) {
        for (const propName in this.schema[section]) {
          Object.assign(result[section], { [propName]: this.schema[section][propName].value })
        }
      }

      this.$root.$emit('progress-event', true)

      if (this.buildingId) {
        this.__putBuildingDetails(this.buildingId, result)
      } else {
        this.__postBuildingDetails(result)
      }
    },
    sendMessage (event) {
      console.log('SAVE EVENT:\n', event)
      console.log('ROUTE: ', this.$route.name)
      console.log('ADDRESS: ', this.schema.address)
      this.$root.$emit('open-message-popup', {
        messageType: this.schema.address,
        messageText: 'Building details updated'
      })
      this.$router.push({ name: 'buildings' })
    },
    exit () {
      this.$router.push({ name: 'buildings' })
    }
  },
  beforeDestroy () {
    this.$root.$off('building-details', this.getData)
    this.$root.$off('buildings-data-saved', this.sendMessage)
    this.$root.$off('new-building-created', this.getNewBuildingId)
  },
  mounted () {
    if (this.buildingId) {
      this.$root.$on('building-details', this.getData)
      this.__getBuildingById(this.buildingId)
    }

    this.$root.$on('building-data-updated', this.sendMessage)
    this.$root.$on('new-building-created', this.getNewBuildingId)
  }
}
</script>

<style scoped>
table {
  width: 100%;
  /* margin-bottom: 160px; */
}
tr {
  margin-bottom: 32px;
}
td {
  /* border: dotted 1px red; */
  font-size: 14px;
  padding: 4px 12px;
}
</style>
