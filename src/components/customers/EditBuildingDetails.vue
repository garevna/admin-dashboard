<template>
  <v-card flat class="transparent mx-auto">
    <!-- <fieldset class="my-4 pa-8">
      <legend class="ml-4"><h5>Building details</h5></legend> -->
      <!-- <v-toolbar class="transparent" style="box-shadow: none">

      </v-toolbar> -->
      <v-card flat class="transparent mt-0" v-if="schema">
        <v-container>
          <v-row justify="center">
            <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex">
              <small>Building address</small>
            </v-col>
            <v-col cols="8" col-lg="6" col-xl="5">
              {{ schema.address.value }}
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="4" col-lg="3" col-xl="2" class="d-none d-md-flex mb-8">
              <small>Building unique code</small>
            </v-col>
            <v-col cols="8" col-lg="6" col-xl="5">
              {{ schema.buildingUniqueCode.value }}
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

              <GeoscapeAutocomplete
                v-if="prop.type === 'address'"
                :value.sync="prop.value"
                style="margin-top: -14px!important; margin-bottom: 8px!important;"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card-actions class="my-8">
        <v-spacer />
        <v-btn dark class="buttons" @click="saveBuildingDetails">
          Update/save details
        </v-btn>
      </v-card-actions>
    <!-- </fieldset> -->
  </v-card>
</template>

<script>

import { buildingSchema, rules } from '@/configs'
import { testTextField, getBuildingUniqueCode } from '@/helpers'

export default {
  name: 'EditBuildingDetails',
  components: {
    GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue')
  },
  props: {
    buildingData: Object,
    buildingId: {
      type: String,
      required: false
    },
    postCode: {
      type: String,
      required: false
    }
  },
  data: () => ({
    ready: false,
    schema: buildingSchema,
    buildingDetails: {},
    rules: rules,
    buildingType: null,
    sections: ['management', 'owner']
  }),
  computed: {},
  watch: {
    buildingData: {
      deep: true,
      immediate: true,
      handler (data) {
        this.getBuildingDetails(data)
      }
    }
  },
  methods: {
    getBuildingDetails (data) {
      if (!data) return
      const buildingDetails = data.result ? data.result : data
      const {
        address,
        addressComponents,
        status
      } = buildingDetails

      this.schema.address.value = address
      this.schema.addressComponents = Object.assign({}, addressComponents)
      this.$emit('update:postCode', addressComponents.postCode)
      this.schema.buildingUniqueCode.value = getBuildingUniqueCode(addressComponents)
      this.schema.status = status === 'UnderConstruction' ? 'BuildCommenced' : status

      for (const section of this.sections) {
        for (const propName in this.schema[section]) {
          this.schema[section][propName].value = buildingDetails[section][propName] || ''
        }
      }
    },

    getNewBuildingId (data) {
      if (data.status === 200) {
        this.$emit('update:buildingId', data.key || data.result)
      }
    },
    sendMessage (event) {
      this.$root.$emit('open-message-popup', {
        messageTyle: 'Building details',
        messageText: 'Data updated'
      })
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
      const result = {
        address: this.schema.address.value,
        addressComponents: this.schema.addressComponents,
        management: {},
        owner: {},
        status: this.schema.status
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
    }
  },

  beforeDestroy () {
    this.$root.$off('building-data-received', this.getBuildingDetails)
    this.$root.$off('buildings-data-saved', this.sendMessage)
    this.$root.$off('new-building-created', this.getNewBuildingId)
  },

  mounted () {
    this.$root.$on('building-data-received', this.getBuildingDetails)
    this.$root.$on('buildings-data-saved', this.sendMessage)
    this.$root.$on('new-building-created', this.getNewBuildingId)

    if (this.buildingId) return this.__getBuildingById(this.buildingId)
    else this.getBuildingDetails(this.buildingData)
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
