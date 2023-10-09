<template>
  <v-container>
    <v-row justify="center">
      <v-toolbar flat dense class="transparent mb-4">
        <h5>
          <small>{{ record.title }}</small>
        </h5>

        <v-spacer />

        <v-select
          v-model="selectedId"
          :items="listOfSLA"
          item-text="title"
          item-value="_id"
          label="Service SLA"
          single-line
          outlined
          class="ml-4"
          style="max-width: 320px"
          hide-details
        ></v-select>
      </v-toolbar>
    </v-row>

    <v-row justify="center" v-if="ready">
      <object
        :data="record.content"
        type="application/pdf"
        width="600"
        height="700"
      ></object>
    </v-row>

    <v-row justify="end">
      <v-btn v-if="access && changed" dark color="primary" @click="$emit('update:save', true)">
        Save updates
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

const { pdf404 } = require('@/configs').default

export default {
  name: 'ShowPDF',

  props: ['id', 'save', 'access'],

  data: () => ({
    listOfSLA: [],
    dialog: false,
    record: {
      _id: null,
      title: 'Not defined',
      content: pdf404
    },
    ready: false,
    selectedId: null,
    changed: false
  }),

  watch: {
    selectedId (val) {
      val ? this.__getSLAContent(val, this.getContent) : this.newSLA()
      this.$emit('update:id', val)
      this.changed = true
    }
  },

  methods: {
    searchById (id) {
      return this.listOfSLA.find(item => item._id === id)
    },

    searchByTitle (title) {
      return this.listOfSLA.find(item => item.title === title)
    },

    getSLAList (data) {
      this.listOfSLA = data
    },

    getContent (data) {
      this.record = data
      this.ready = true
    },

    newSLA () {
      this.record = {
        _id: null,
        title: 'Not defined',
        content: pdf404
      }
      this.ready = true
    }
  },

  beforeMount () {
    this.__getSLAList(this.getSLAList)

    // this.id ? this.__getSLAContent(this.id, this.getContent) : this.newSLA()

    this.selectedId = this.id

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
