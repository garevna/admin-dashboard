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
          v-model="title"
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
        :data="content"
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
          <v-btn
            v-if="title && content && content !== pdf404"
            class="dark-primary-button"
            @click="saveChanges"
          >
            <small style="color: #fff">Update / Save SLA</small>
          </v-btn>
        </v-row>
      </v-bottom-navigation>
    </v-card>
  </v-dialog>
</template>

<script>

const { pdf404 } = require('@/configs').default

export default {
  name: 'ViewPDF',

  props: ['dialog', 'record'],

  data: () => ({
    pdf404: pdf404,
    content: pdf404,
    ready: false,
    disabled: false,
    file: null
  }),

  computed: {
    id: {
      get () {
        return this.record._id
      },
      set (val) {
        this.$emit('update:record', Object.assign(this.record, { _id: val }))
      }
    },
    title: {
      get () {
        return this.record.title
      },
      set (val) {
        this.$emit('update:record', Object.assign(this.record, { title: val }))
      }
    }
  },

  methods: {
    getContent (data) {
      // const { _id, title, content } = data
      this.content = data.content
      this.ready = true
    },

    getLocalFileContent (data) {
      this.content = data || pdf404
      this.ready = true
    },

    readLocalFile (file) {
      this.ready = false
      file && this.__readLocalFile(file)
    },

    showFileContent (data) {
      this.ready = true
    },

    saveChanges () {
      if (this.id) {
        this.__updateSLA({ id: this.id, title: this.title, content: this.content })
      } else {
        this.__uploadNewSLA(this.title, this.file)
      }
    },

    updateId (data) {
      this.id = data
      this.$emit('update:id', data)
      this.$emit('update:title', this.title)
      this.$emit('update:dialog', false)
    },

    close (response) {
      this.$emit('update:title', this.title)
      this.$emit('update:dialog', false)
    },

    uploadSLA (file) {
      this.__uploadSLA(this.title, file)
    },

    setNewSLA (data) {
      //
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
