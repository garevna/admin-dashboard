<template>
  <v-dialog
    v-model="dialog"
    v-if="ready"
    transition="dialog-bottom-transition"
    max-width="80%"
  >
    <v-card>
      <v-toolbar dense>
        <!-- <v-toolbar-title> -->
        <small class="mr-4">SLA name</small>
        <v-text-field
          v-model="record.title"
          outlined
          dense
          hide-details
        />

        <v-spacer />

        <v-btn icon @click="$emit('update:dialog', false)">
          <v-icon large>mdi-close</v-icon>
        </v-btn>

      </v-toolbar>

      <object
        :data="record.content"
        type="application/pdf"
        width="100%"
        height="640"
      ></object>

      <v-bottom-navigation class="px-10">
        <v-row justify="space-between" class="mx-4 mt-2">
          <v-file-input
            placeholder="Upload new SLA"
            chips
            outlined
            dense
            prepend-icon="mdi-file-upload"
            v-model="file"
            @change="readLocalFile($event)"
            style="max-width: 240px"
            hide-details
          ></v-file-input>
          <!-- <v-spacer /> -->
          <v-btn class="dark-primary-button" @click="saveChanges">
            <small style="color: #fff">Update / Save SLA</small>
          </v-btn>
        </v-row>
      </v-bottom-navigation>
    </v-card>
  </v-dialog>
</template>

<script>

import { pdf404 } from '@/configs'

export default {
  name: 'ViewPDF',

  props: ['dialog', 'id', 'title'],

  data: () => ({
    record: {
      id: null,
      title: '',
      content: pdf404
    },
    ready: false,
    disabled: false,
    file: null
  }),

  watch: {
    id: {
      immediate: true,
      handler (val) {
        console.log('ID CHANGED: ', val)
        if (val) {
          this.ready = false
          this.__getSLAContent(val)
        } else {
          this.record = {
            id: null,
            title: '',
            content: pdf404
          }
          console.log(this.record)
          this.ready = true
        }
      }
    }
  },

  methods: {
    getContent (data) {
      console.log('sla-content-received\n', data)
      this.record = data
      this.ready = true
    },

    getLocalFileContent (data) {
      console.log('local-file-content-loaded\n', data)
      this.record.content = data || pdf404
      this.ready = true
    },

    readLocalFile (file) {
      this.ready = false
      file && this.__readLocalFile(file)
    },

    showFileContent (data) {
      console.log('local-file-content-loaded')
      console.log('RECORD:\n', this.record)
      console.log(data)
      // this.record.content = data
      this.ready = true
    },

    // setNewSLA (id) {
    //   this.$root.$off('sla-file-uploaded', this.setNewSLA)
    //   this.service.serviceSLA.value = id
    // },

    saveChanges () {
      console.log('RECORD:\n', this.record)
      if (this.record.id) {
        this.__updateSLA(this.record)
      } else {
        console.log('FILE:\n', this.file)
        this.__uploadNewSLA(this.record.title, this.file)
      }
    },

    updateId (data) {
      console.log('new-sla-created\n', data)
      this.record.id = data
      this.$emit('update:id', data)
      this.$emit('update:title', this.record.title)
      this.$emit('update:dialog', false)
    },

    close (response) {
      console.log('sla-data-updated')
      this.$emit('update:title', this.record.title)
      this.$emit('update:dialog', false)
    },

    uploadSLA (file) {
      console.log(this.record.title, file)
      this.__uploadSLA(this.record.title, file)
    }
  },

  beforeDestroy () {
    this.$root.$off('sla-content-received', this.getContent)
    this.$root.$off('local-file-content-loaded', this.getLocalFileContent)
    this.$root.$off('sla-file-uploaded', this.setNewSLA)
    this.$root.$off('sla-data-updated', this.close)
    this.$root.$off('new-sla-created', this.updateId)
  },

  beforeMount () {
    this.$root.$on('sla-content-received', this.getContent)
    this.$root.$on('local-file-content-loaded', this.getLocalFileContent)
    this.$root.$on('sla-file-uploaded', this.setNewSLA)
    this.$root.$on('sla-data-updated', this.close)
    this.$root.$on('new-sla-created', this.updateId)

    this.__getSLAContent(this.id)
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
