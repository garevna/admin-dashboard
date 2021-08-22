<template>
  <v-container>
    <v-row justify="center">
      <v-toolbar flat dense class="transparent mb-4">
        <h5 v-if="!edit">
          <small>{{ record.title }}</small>
          <v-icon @click="edit = true" class="ml-2" color="primary">
            mdi-form-select
          </v-icon>
        </h5>

        <v-combobox
          v-else
          v-model="record.title"
          :items="listOfSLA.map(item => item.title)"
          label="Service SLA"
          append-outer-icon="mdi-check-bold"
          outlined
          dense
          hide-details
          class="ml-4"
          @click:append-outer="save"
          @change="changeContent"
        ></v-combobox>
      </v-toolbar>
    </v-row>

    <v-row justify="center">
      <object
        :data="record.content"
        type="application/pdf"
        width="600"
        height="700"
      ></object>
    </v-row>

    <v-row justify="end">
      <v-btn dark color="primary" @click="saveUpdates">
        Save updates
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

import { pdf404 } from '@/configs'

export default {
  name: 'ShowPDF',

  props: ['id', 'title'],

  data: () => ({
    listOfSLA: [],
    selected: null,
    selectedTitle: '',
    edit: false,
    dialog: false,
    record: {
      _id: null,
      title: 'Not defined',
      content: pdf404
    },
    ready: false,
    disabled: false,
    file: null
  }),

  // watch: {
  //   selected (val) {
  //     if (!val) return
  //     console.log(val)
  //     console.log(this.selected.title)
  //     console.log(this.listOfSLA)
  //   }
  // },

  methods: {
    searchById (id) {
      return this.listOfSLA.find(item => item._id === id)
    },

    searchByTitle (title) {
      return this.listOfSLA.find(item => item.title === title)
    },

    getSLAList (data) {
      // for (const item of data) this.listOfSLA.push(item)
      this.listOfSLA = data
      const selected = this.searchById(item => item._id === this.record._id)
      this.record.title = selected ? selected.title : ''
    },

    getContent (data) {
      this.record = data
      this.ready = true
    },

    changeContent (val) {
      this.selected = this.listOfSLA.find(item => item.title === val)._id
      this.__getSLAContent(this.selected)
    },

    newSLA () {
      this.record = {
        _id: null,
        title: 'Not defined',
        content: pdf404
      }
      this.dialog = true
    },

    save () {
      this.$emit('update:id', this.record._id)
      this.edit = !this.selected
    }
  },

  beforeDestroy () {
    this.$root.$off('sla-list-received', this.getSLAList)
    this.$root.$off('sla-content-received', this.getContent)
  },

  beforeMount () {
    this.$root.$on('sla-list-received', this.getSLAList)
    this.$root.$on('sla-content-received', this.getContent)

    this.__getSLAList()
    this.__getSLAContent(this.id)

    this.selected = this.id
    this.edit = !this.id

    this.ready = false
  }
}

</script>

<style>
.dark-primary-button {
    border-radius: 4px !important;
    background: #900 !important;
    font-size: 1.0rem !important;
    font-weight: bold;
    color: #fff !important;
    height: 40px !important;
    max-width: 240px;
    min-width: 180px;
    text-transform: uppercase !important;
}
</style>
