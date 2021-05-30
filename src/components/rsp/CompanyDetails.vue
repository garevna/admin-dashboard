<template>
  <v-container class="homefone" v-if="ready">
    <v-card flat class="transparent pa-5 mx-auto" max-width="1440" outlined style="border: solid 1px #900">
      <v-row>
        <v-col cols="10">
          <CompanyDetailsStep :data.sync="schema" step="company" />
          <CompanyDetailsStep :data.sync="schema" step="general" />
          <CompanyDetailsStep :data.sync="schema" step="technic" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn dark color="buttons" @click="saveData">
          SAVE
        </v-btn>
      </v-row>
    </v-card>

    <v-card dark class="primary px-5 py-12 my-12 mx-auto" max-width="960">
      <v-row>
        <CompanyDetailsStep :data.sync="schema" step="userInfo" />
      </v-row>
      <v-row justify="center">
        <v-btn text outlined class="mt-12" @click="saveCredentials">
          SAVE
        </v-btn>
      </v-row>
    </v-card>

  </v-container>
</template>

<script>

import { schema } from '@/configs'

export default {
  name: 'CompanyDetails',
  components: {
    CompanyDetailsStep: () => import('@/components/rsp/CompanyDetailsStep.vue')
  },
  data: () => ({
    ready: false,
    schema: schema,
    steps: Object.keys(schema)
  }),
  methods: {
    getData (data) {
      const details = data.company ? data : data.result ? data.result : {}
      for (const step in details) {
        if (step === 'activeSesions') continue
        for (const prop in details[step]) {
          if (prop === 'password' || prop === 'role') continue
          this.schema[step][prop].value = details[step][prop]
        }
      }
      this.ready = true
    },
    saveData () {
      const result = {}
      for (const stepName of Object.keys(this.schema)) {
        result[stepName] = {}
        const step = this.schema[stepName]
        for (const propName of Object.keys(step)) {
          result[stepName][propName] = step[propName].value
        }
      }
      this.__putClientData(result)
    },
    saveCredentials () {
      this.__putClientCredentials({
        login: this.schema.userInfo.login.value,
        userPhone: this.schema.userInfo.phoneNumber.value,
        password: this.schema.userInfo.password.value
      })
    }
  },
  // watch: {
  //   schema: {
  //     deep: true,
  //     handler (val) {
  //       console.log('RSP DATA CHANGED:\n', val)
  //     }
  //   }
  // },
  mounted () {
    this.__getClientData()
    this.$root.$on('client-data-received', this.getData)
  }
}
</script>
