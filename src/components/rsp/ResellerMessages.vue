<template>
  <v-container>
    <v-row v-if="!dialog" align="start" justify="center" class="mb-12">
      <v-data-table
        :headers="headers"
        :items="messages"
        item-key="_id"
        :expanded.sync="expanded"
        single-expand
        show-expand
        class="elevation-1"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pa-4">
            <b>{{ item.subject }}</b>
            <div class="pa-3" @click="goto(item)">
              <li v-for="option of item.fields" :key="`${option.section}-${option.field}`">
                {{ option.sectionTitle }}{{ option.sectionTitle ? ':' : '' }} {{ option.title }}
                <v-icon small v-if="option.updated" color="#09b">mdi-checkbox-marked</v-icon>
              </li>
            </div>
          </td>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteMessage(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-row>

    <v-row v-else>
      <ShowCustomerDetails :dialog.sync="dialog" :customerId="customerId" />
    </v-row>
  </v-container>
</template>

<script>

import ShowCustomerDetails from '@/components/customers/ShowCustomerDetails.vue'

import { partnerDetailsHandler } from '@/controllers'

export default {
  name: 'ResellerMessages',

  components: {
    ShowCustomerDetails
  },

  props: ['details'],

  data: () => ({
    messages: [],
    selected: [],
    expanded: [],
    headers: [
      { text: 'Delete', value: 'actions', sortable: false },
      { text: 'Created', value: 'created' },
      { text: 'Modified', value: 'modified' },
      { text: 'Subject', value: 'subject' },
      { text: 'Prompt', value: 'prompt' },
      { text: 'Content', value: 'data-table-expand' }
    ],

    dialog: false,
    customerId: null,
    customerUpdated: false
  }),

  watch: {
    dialog (newVal, oldVal) {
      if (!newVal && oldVal) this.sendRequestForMessages()
    }
  },

  methods: {
    getData (data) {
      this.messages = data.map(item => Object.assign(item, {
        created: new Date(item.created).toISOString().slice(0, 10),
        modified: new Date(item.modified).toISOString().slice(0, 10)
      }))
    },

    deleteMessage (message) {
      this.__deleteMessage(message._id, partnerDetailsHandler()._id, this.callback)
      const index = this.messages.findIndex(item => item._id === message._id)
      index !== -1 && this.messages.splice(index, 1)
    },

    callback (response) {
      // console.log('MESSAGE DELETED', response)
    },

    goto (item) {
      if (item.type === 'update-customer-details') {
        this.customerId = item.customerId
        this.dialog = true
      } else {
        if (item.type === 'update-company-details') {
          this.$root.$emit('go-to-parner-details')
        }
      }
    },

    sendRequestForMessages () {
      this.__getPartnerMessages(partnerDetailsHandler()._id, this.getData)
    }
  },

  beforeDestroy () {
    this.$root.$off('messages-updates-received', this.sendRequestForMessages)
  },

  mounted () {
    this.$root.$on('messages-updates-received', this.sendRequestForMessages)
  },

  beforeMount () {
    this.__getPartnerMessages(partnerDetailsHandler()._id, this.getData)
  }
}
</script>

<style>
  li {
    cursor: pointer !important;
  }
</style>
