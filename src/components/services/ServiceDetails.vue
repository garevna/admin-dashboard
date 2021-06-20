<template>
  <v-container style="margin-bottom: 320px">
    <v-card flat class="transparent mx-auto" max-width="700">
      <v-row justify="center" align="center">
          <v-spacer />
          <v-btn icon @click="$router.push({ name: 'services-list' })">
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
            <tr style="vertical-align: baseline">
              <td width="160" class="d-none d-md-flex">
                Type (residential/commercial)
              </td>
              <td width="*">
                <SwitchValues
                  label="Residential/commercial"
                  :value.sync="service.serviceType.value"
                  :states="['residential', 'commercial']"
                  hide-details
                  class="mb-8"
                />
              </td>
            </tr>
            <tr v-for="(prop, propName) in service" :key="propName">
              <td class="d-none d-md-flex" v-if="propName !== 'serviceType'">
                {{ prop.title }}
              </td>
              <td>
                <v-text-field
                  v-if="propName !== 'serviceType' && textField(prop)"
                  v-model="prop.value"
                  :label="prop.title"
                  :rules="[prop.required ? rules.required : (value) => true, rule(prop)]"
                  outlined
                  dense
                  class="my-1"
                  hide-details
                />
              </td>
            </tr>
            <tr style="height: 48px;"></tr>
            <tr style="margin-top: 48px!important">
              <td class="d-none d-md-flex">
                <!-- <v-btn outlined text color="buttons" @click="$emit('update:dialog', false)">Exit</v-btn> -->
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
        console.log(value)
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
      console.log(data)
      for (const prop in this.service) {
        this.service[prop].value = data[prop]
      }
      this.ready = true
    },

    saveServiceDetails () {
      console.log(this.service)
      for (const prop in this.service) {
        console.log(prop, this.service[prop])
        // if (prop === 'serviceType') continue
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
