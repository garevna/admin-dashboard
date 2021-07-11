<template>
  <v-container style="margin-bottom: 180px">
    <v-card flat class="transparent mx-auto" max-width="960">
      <v-row justify="end" align="center" style="margin-bottom: -60px; margin-right:-20px;">
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
    <fieldset class="mt-4 pa-8 mb-12 mx-auto" style="max-width: 960px; border: solid 1px #bbb; box-shadow: 0 0 3px #0007">
      <legend class="ml-4" style="background: #fbfbfb; border-radius: 4px; border: solid 1px #bbb; padding: 4px 8px">
        <h5><small>Service details</small></h5>
      </legend>
      <v-card flat class="transparent mt-0" v-if="ready">
        <table width="100%">
          <tbody>
            <tr v-for="(prop, propName) in service" :key="propName">
              <td width="280">
                <p class="right-title mr-4"><small>{{ propName !== 'serviceSLA' ? prop.title : 'Service SLA' }}</small></p>
              </td>

              <td v-if="prop.type === 'switcher'" width="*">
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

              <td v-if="prop.type === 'sla'">
                <table>
                  <tr>
                    <td width="320">
                      <v-combobox
                        v-model="serviceSLA"
                        :items="listOfSLA.map(item => item.title)"
                        label="Service SLA"
                        outlined
                        dense
                        append-outer-icon="mdi-open-in-new"
                        @click:append-outer="showPDF"
                      ></v-combobox>
                      <!-- <v-btn icon v-if="selectedId" @click="showPDF">
                        <v-icon>mdi-open-in-new</v-icon>
                      </v-btn> -->
                    </td>
                    <td width="240">
                      <v-file-input
                        label="Upload new service SLA"
                        chips
                        style="width: 0px"
                        prepend-icon="mdi-file-pdf"
                        @change="uploadSLA($event)"
                        :disabled="disabled"
                        class="ml-2"
                      ></v-file-input>
                    </td>
                  </tr>
                </table>
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

    <ViewPDF
      v-if="selectedId"
      :dialog.sync="dialog"
      :id="selectedId"
      :title.sync="serviceSLA"
    />
  </v-container>
</template>

<script>

import { serviceSchema, rules } from '@/configs'
import { SwitchValues } from '@/components/inputs'
import { testTextField } from '@/helpers'

export default {
  name: 'ServiceDetails',
  components: {
    SwitchValues,
    ViewPDF: () => import('@/components/inputs/ViewPDF.vue')
  },

  props: ['serviceId'],

  data: () => ({
    service: null,
    serviceSLA: '',
    selectedId: null,
    dialog: false,
    listOfSLA: [],
    disabled: true,
    rules: rules,
    ready: false
  }),

  watch: {
    serviceSLA (value) {
      const selected = this.listOfSLA.find(item => item.title === value)
      console.log(value, selected)

      this.disabled = Boolean(value) && Boolean(selected)

      this.service.serviceSLA.value = selected ? selected._id : null
    },
    service: {
      deep: true,
      handler (data) {
        console.log('Service details changed\n', data.serviceSLA.value)

        this.selectedId = data.serviceSLA.value
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

    showPDF () {
      this.dialog = Boolean(this.selectedId)
    },

    getData (data) {
      for (const prop in this.service) {
        this.service[prop].value = data[prop]
      }

      this.ready = true
    },

    getSLAList (data) {
      for (const item of data) this.listOfSLA.push(item)
      console.log('SERVICE SLA VALUE: ', this.service.serviceSLA.value)
      const selected = this.listOfSLA.find(item => item._id === this.service.serviceSLA.value)
      this.serviceSLA = selected ? selected.title : ''
      this.service.serviceSLA.title = selected.title
      console.log('SERVICE SLA TITLE: ', selected)
    },

    uploadSLA (file) {
      this.$root.$on('sla-file-uploaded', this.setNewSLA)
      this.__uploadSLA(this.serviceSLA, file)
    },

    setNewSLA (id) {
      console.log('ID OF UPLOADED: ', id)
      this.$root.$off('sla-file-uploaded', this.setNewSLA)
      this.service.serviceSLA.value = id
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

    this.$root.$off('sla-list-received', this.getSLAList)
  },
  mounted () {
    this.service = JSON.parse(JSON.stringify(serviceSchema))
    this.$root.$on('sla-list-received', this.getSLAList)
    this.__getSLAList()

    if (this.serviceId) {
      this.$root.$on('service-data-received', this.getData)

      this.__getServiceDetails(this.serviceId)
    } else {
      this.ready = true
    }

    this.$root.$on('service-data-updated', this.showResult)
    this.$root.$on('new-service-created', this.showResult)

    this.$vuetify.goTo(0)
  }
}
</script>

<style>
.right-title {
  width: 100%;
  text-align: right;
  padding-right: 16px;
}
tr {
  vertical-align: super;
}
td {
  height: 32px !important;
  text-align: right!important;
}
</style>
