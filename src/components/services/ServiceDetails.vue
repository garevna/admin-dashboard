<template>
  <v-container style="margin-bottom: 320px">
    <v-card flat class="transparent mx-auto" max-width="700">
      <v-row justify="right" align="center" style="margin-bottom: -60px; margin-right:-67px;">
          <v-spacer />
          <v-btn
            @click="$router.push({ name: 'services-list' })"
            icon
            color="#aaa"
            class="pl-2"
            style="background: #fbfbfb; border-radius: 50%; box-shadow: 0 0 4px #0007"
          >
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </v-row>
    </v-card>
    <fieldset class="mt-4 pa-8 mb-12 mx-auto" style="max-width: 800px; border: solid 1px #bbb; box-shadow: 0 0 3px #0007">
      <legend class="ml-4" style="background: #fbfbfb; border-radius: 8px; border: solid 1px #bbb; padding: 4px 8px">
        <h5><small>Service details</small></h5>
      </legend>
      <v-card flat class="transparent mt-0" v-if="ready">
        <table width="100%">
          <tbody>
            <tr v-for="(prop, propName) in service" :key="propName">
              <td class="d-none d-md-flex">
                <p class="right-title"><small>{{ prop.title }}</small></p>
              </td>
              <td v-if="prop.type === 'switcher'">
                <SwitchValues
                  label="Residential/commercial"
                  :value.sync="service.serviceType.value"
                  :states="['residential', 'commercial']"
                  hide-details
                  class="mb-8"
                />
              </td>
              <td v-if="propName !== 'serviceType' && textField(prop)">
                <v-text-field
                  v-model="prop.value"
                  :label="prop.title"
                  :rules="[prop.required ? rules.required : (value) => true, rule(prop)]"
                  outlined
                  dense
                  class="my-1"
                  hide-details
                />
              </td>
              <td v-if="prop.type === 'checkbox'" class="td-checkbox">
                <v-checkbox
                  v-model="prop.value"
                  :label="prop.title"
                  dense
                  hide-details
                />
              </td>
            </tr>
            <tr style="height: 48px;"></tr>
            <tr style="margin-top: 48px!important">
              <td class="d-none d-md-flex">
                <v-btn outlined text color="buttons" @click="$router.push({ name: 'services-list' })">Exit</v-btn>
              </td>
                <td colspan="2" class="text-right">
                <v-spacer />
                <v-btn dark class="buttons" @click="saveServiceDetails">
                  Update/save details
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </fieldset>
  </v-container>
</template>

<script>

import { serviceSchema, rules } from '@/configs'
import { SwitchValues } from '@/components/inputs'
import { testTextField } from '@/helpers'

export default {
  name: 'ServiceDetails',
  components: {
    SwitchValues
  },

  props: ['serviceId'],

  data: () => ({
    service: null,
    rules: rules,
    ready: false
  }),

  watch: {
    'service.serviceType': {
      handler (value) {
        // console.log(value)
      }
    }
  },

  methods: {
    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },
    textField (item) {
      return testTextField(item.type)
    },
    rule (item) {
      return this.rules[item.type]
    },
    getData (data) {
      for (const prop in this.service) {
        this.service[prop].value = data[prop]
      }
      this.ready = true
    },

    saveServiceDetails () {
      for (const prop in this.service) {
        this.service[prop] = this.service[prop].value
      }
      if (this.serviceId) {
        this.__updateServiceDetails(this.serviceId, this.service)
      } else {
        this.__createNewService(this.service)
      }
    },

    showResult (data) {
      this.$router.push({ name: 'services-list' })
    }
  },
  beforeDestroy () {
    this.$root.$off('service-data-received', this.getData)
    this.$root.$off('service-data-updated', this.getData)
    this.$root.$off('new-service-created', this.getData)
  },
  mounted () {
    this.$vuetify.goTo(0)
    this.service = JSON.parse(JSON.stringify(serviceSchema))
    if (this.serviceId) {
      this.$root.$on('service-data-received', this.getData)
      this.__getServiceDetails(this.serviceId)
    } else {
      this.ready = true
    }

    this.$root.$on('service-data-updated', this.showResult)
    this.$root.$on('new-service-created', this.showResult)
  }
}
</script>

<style>
.right-title {
  width: 100%;
  text-align: right;
  margin-right: 16px;
}
tr {
  vertical-align: super;
}
td {
  height: 32px !important;
  text-align: right!important;
}
</style>
