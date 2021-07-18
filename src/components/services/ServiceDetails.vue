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
                      ></v-combobox>
                    </td>

                    <td width="180">
                      <v-btn outlined dense color="primary" :disabled="!selectedId" @click="dialog = true">
                        <v-icon small>mdi-open-in-new</v-icon>
                        <small>Update selected</small>
                      </v-btn>
                    </td>

                    <td width="180">
                      <v-btn outlined dense color="primary" @click="dialog = true">
                        <v-icon small>mdi-open-in-new</v-icon>
                        <small>Upload new SLA</small>
                      </v-btn>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <v-row justify="end" class="mt-8 mb-12">
          <v-btn dark class="buttons" @click="saveServiceDetails">
            Update/save details
          </v-btn>
        </v-row>

        <v-row justify="center" class="mt-12">
          <p><b>Partners</b></p>
        </v-row>
        <v-row justify="center">
          <Partners :servicePartners.sync="partnersList" />
        </v-row>

        <v-row justify="end" class="mt-2 mr-12">
          <v-btn text dark class="primary" @click="saveServicePartners">
            UPDATE PARTNERS
          </v-btn>
        </v-row>

        <v-row justify="start" class="my-8">
          <v-btn outlined text color="buttons" @click="$router.push({ name: 'services-list' })">Exit</v-btn>
        </v-row>
      </v-card>
    </fieldset>

    <ViewPDF
      :dialog.sync="dialog"
      :id.sync="selectedId"
      :title.sync="serviceSLA"
    />
  </v-container>
</template>

<script>

import { serviceSchema, rules } from '@/configs'
import { SwitchValues } from '@/components/inputs'
import { testTextField } from '@/helpers'

import Partners from '@/components/services/Partners.vue'

export default {
  name: 'ServiceDetails',
  components: {
    SwitchValues,
    Partners,
    ViewPDF: () => import('@/components/inputs/ViewPDF.vue')
  },

  props: ['serviceId'],

  data: () => ({
    service: null,
    partnersList: [],
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

      this.disabled = Boolean(value) && Boolean(selected)

      this.service.serviceSLA.value = selected ? selected._id : null
    },
    service: {
      deep: true,
      handler (data) {
        this.selectedId = data.serviceSLA.value
      }
    },
    partnersList: {
      deep: true,
      immediate: true,
      handler (data) {
        if (data) {
          console.log('SERVICE PARTNERS LIST CHANGED')
          data.forEach(item => console.log(item))
        }
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
      console.log(data)
      // this.service.partners.value = data.partnerNames
      this.partnersList = data.partners
      for (const prop in this.service) {
        if (prop === 'partners') continue
        this.service[prop].value = data[prop]
      }

      this.ready = true
    },

    getSLAList (data) {
      for (const item of data) this.listOfSLA.push(item)
      const selected = this.listOfSLA.find(item => item._id === this.service.serviceSLA.value)
      this.serviceSLA = selected ? selected.title : ''
      this.service.serviceSLA.title = selected ? selected.title : ''
    },

    // uploadSLA (file) {
    //   this.$root.$on('sla-file-uploaded', this.setNewSLA)
    //   this.__uploadSLA(this.serviceSLA, file)
    // },

    // setNewSLA (id) {
    //   console.log('ID OF UPLOADED: ', id)
    //   this.$root.$off('sla-file-uploaded', this.setNewSLA)
    //   this.service.serviceSLA.value = id
    // },

    saveServiceDetails () {
      for (const prop in this.service) {
        this.service[prop] = this.service[prop].value
      }
      this.service.partners = this.partnersList || []

      if (this.serviceId) {
        this.__updateServiceDetails(this.serviceId, this.service)
      } else {
        this.__createNewService(this.service)
      }
    },

    saveServicePartners () {
      this.__patchServiceDetails(this.serviceId, { partners: this.partnersList })
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
.partners-col {
  border: solid 1px #aaa;
  border-radius: 4px;
  padding: 8px 16px;
  text-align: left;
}
</style>
