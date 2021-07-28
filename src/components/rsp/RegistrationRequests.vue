<template>
  <v-card flat class="transparent pb-12 px-12" v-if="ready">
    <v-card-title>
      <strong>Leads requests</strong>
      <v-spacer />
      <v-btn text @click="refresh" class="mr-12 mb-5">
        <v-icon>mdi-refresh</v-icon>
        Refresh
      </v-btn>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="requests"
      item-key="_id"
      :search="search"
      :expanded.sync="expanded"
      show-expand
      :single-expand="true"
      @click:row="showDetails"
    >
      <template v-slot:item.reject="{ item }">
          <v-icon
            small
            color="#888"
            class="table-icon-button"
            @click="reject(item)"
          > mdi-trash-can </v-icon>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-card flat class="transparent pa-5">
            <table>
              <tbody>
                <tr>
                  <td style="vertical-align: super">
                    <p><small class="mr-4">Partner's unique code (XX)</small></p>
                  </td>
                  <td>
                    <v-text-field
                      v-model="item.uniqueCode"
                      :rules="[rules.required, rules.counter, rules.test, rules.letters]"
                      @input="testInput(item)"
                      outlined
                      dense
                      style="max-width: 80px"
                    />
                  </td>
                  <td style="vertical-align: super">
                    <v-btn
                      :disabled="disabled"
                      @click="confirm(item)"
                      dark
                      color="primary"
                      class="ml-4"
                    >
                      Confirm request
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card>
        </td>
      </template>
    </v-data-table>

    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      dense
      outlined
      hide-details
      style="display: inline-block; width: 280px"
    ></v-text-field>
    <span class="ml-12"><small>Total number of requests: {{ requests.length }}</small></span>

    <v-dialog
      v-if="details"
      v-model="details"
      scrollable
      max-width="900px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dense flat>
          <v-spacer />
          <v-btn icon @click="details = false">
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <CompanyDetails
          :opened.sync="details"
          :details="requestDetails"
        />
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>

let uniqueCodeList = []

export default {
  name: 'RegistrationRequests',
  components: {
    CompanyDetails: () => import('@/components/rsp/CompanyDetails.vue')
  },
  data: () => ({
    ready: false,
    disabled: true,
    search: '',
    expanded: [],
    uniqueCode: '',
    headers: [
      { text: 'Reject', value: 'reject', sortable: false },
      {
        text: 'Company name',
        align: 'start',
        sortable: false,
        value: 'company.name'
      },
      { text: 'ABN', value: 'company.abn' },
      { text: 'Address', value: 'company.address' },
      { text: 'Primary contact', value: 'company.primaryContact' },
      { text: 'Phone (mobile)', value: 'company.phoneMobile' },
      { text: 'Phone (work)', value: 'company.phoneWork' },
      { text: 'Confirm', value: 'data-table-expand', sortable: false }
    ],
    uniqueCodeList: [],
    requests: null,
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length === 2 || 'Exact 2 characters',
      test: value => !uniqueCodeList.includes(value) || 'Allready in use',
      letters: value => value.split('')
        .filter(symbol => symbol.charCodeAt(0) < 91 && symbol.charCodeAt(0) > 64).length === 2 || 'Invalid symbols'
    },
    details: false,
    requestDetails: null
  }),

  methods: {
    getUniqueCodeList (data) {
      this.uniqueCodeList = data
      uniqueCodeList = data
    },

    getData (data) {
      this.requests = data
      this.ready = true
    },

    refresh () {
      this.requests = null
      this.ready = false
      this.__refreshRegistrationRequests()
    },

    showDetails (details) {
      this.requestDetails = details
      this.details = true
    },

    testInput (item) {
      this.disabled = Object.keys(this.rules)
        .filter(key => typeof this.rules[key](item.uniqueCode) === 'string').length > 0
    },

    partnerCreated (data) {
      this.$nextTick(() => this.refresh())
    },

    confirm (request) {
      this.expanded = []
      this.ready = false
      this.__confirmRegistrationRequest(request._id, request.uniqueCode)
    },

    reject (request) {
      this.$root.$emit('open-confirmation-popup', {
        title: 'Reject leads request',
        message: 'Are you sure you wish to reject this request?',
        source: request._id
      })
    },

    rejectConfirmed (id) {
      this.expanded = []
      this.ready = false
      this.__rejectRegistrationRequest(id)
    }
  },

  beforeMount () {
    this.$root.$on('partner-created', this.partnerCreated)
    this.$root.$on('unique-code-list-received', this.getUniqueCodeList)
    this.$root.$on('operation-confirmed', this.rejectConfirmed)
    this.$root.$on('registration-requests-received', this.getData)
    this.__getRegistrationRequests()
    this.__getUniqueCodeList()
  },

  beforeDestroy () {
    this.$root.$off('partner-created', this.refresh)
    this.$root.$off('unique-code-list-received', this.getUniqueCodeList)
    this.$root.$off('operation-confirmed', this.rejectConfirmed)
    this.$root.$off('registration-requests-received', this.getData)
  }
}

</script>

<style scoped>
.table-icon-button {
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 4px;
}
</style>
