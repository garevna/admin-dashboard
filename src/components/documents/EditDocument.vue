<template>
  <v-dialog
    v-model="opened"
    transition="dialog-bottom-transition"
    max-width="80%"
  >
    <v-card>
      <v-toolbar>
        <small>Folder: </small>
        <v-select
          label="Folder:"
          :items="folders"
          v-model="folder"
          @change="edited.folder = true"
          outlined
          dense
          hide-details
          :menu-props="{ bottom: true, offsetY: true }"
          class="mx-2"
          style="max-width: 280px"
        />
        <small class="mr-2">Document title</small>
        <v-text-field
          label="Document title"
          v-model="record.title"
          @change="edited.title = true"
          outlined
          dense
          hide-details
        />

        <v-spacer />

        <v-btn icon @click="opened = false">
          <v-icon large>mdi-close</v-icon>
        </v-btn>

      </v-toolbar>

      <iframe :src="blob" width="100%" height="640" style="background: #dedede"></iframe>

      <v-bottom-navigation class="px-10">
        <v-row justify="space-between" class="mx-4 mt-2">
          <v-file-input
            placeholder="Upload new document"
            chips
            outlined
            dense
            prepend-icon="mdi-file-upload"
            v-model="file"
            @change="readDocument($event)"
            style="max-width: 360px"
            hide-details
          ></v-file-input>
          <!-- <v-spacer /> -->
          <v-btn class="dark-primary-button" @click="saveChanges">
            <small style="color: #fff">Save updates</small>
          </v-btn>
        </v-row>
      </v-bottom-navigation>
    </v-card>
  </v-dialog>
</template>

<script>

const { pdf404 } = require('@/configs').default

export default {
  name: 'EditDocument',

  props: ['dialog', 'folders', 'documentId', 'dir'],

  data: () => ({
    disabled: false,
    file: null,
    blob: null,
    record: {},
    edited: {
      folder: false,
      title: false,
      partners: false,
      content: false
    }
  }),

  computed: {
    opened: {
      get () {
        return this.dialog
      },
      set (val) {
        this.$emit('update:dialog', val)
      }
    },

    folder: {
      get () {
        return this.record?.folder || this.dir || ''
      },
      set (val) {
        Object.assign(this.record, { folder: val })
      }
    }
  },

  watch: {
    documentId: {
      immediate: true,
      handler (id) {
        id && this.__getDocumentContent(id, this.showDocument)
      }
    }
  },

  methods: {
    getDocument (data) {
      this.record = data
      this.showDocument(data.content)
    },

    readDocument (file) {
      file && this.__readLocalDocument(file, this.showDocument)
      this.edited.content = true
    },

    showDocument (data = pdf404) {
      const base64Data = !data.indexOf('data:application/pdf;base64,') ? data.slice('data:application/pdf;base64,'.length) : data

      const tmp = new Uint8Array(atob(base64Data).split('').map(symbol => symbol.charCodeAt(0)))

      this.blob = URL.createObjectURL(new Blob([tmp], { type: 'application/pdf' }))

      Object.assign(this.record, { content: data })
    },

    saveChanges () {
      if (this.record._id) {
        const { folder, title } = this.record
        this.__updateDocument(this.record._id, this.edited.content ? this.record : { folder, title }, this.saved)
      } else {
        this.record.folder = this.folder
        this.record.partners = []
        this.__createDocument(this.record, this.created)
      }
    },

    updateId (data) {
      this.record.id = data
      this.$emit('update:id', data)
      this.$emit('update:title', this.record.title)
      this.$emit('update:dialog', false)
    },

    uploadDocument (file) {
      this.__uploadDocument(this.record.title, file, this.getDocument)
    },

    saved () {
      this.$emit('update:document', this.record)
      this.$emit('update:dialog', false)
    },

    created (data) {
      this.record._id = data._id
      this.saved()
    }
  },

  beforeDestroy () {
    // this.$root.$off('local-document-loaded', this.showDocument)

    // this.$root.$off('document-updated', this.saved)

    // this.$root.$off('new-document-created', this.created)
    this.$root.$off('document-content-received', this.getDocument)
  },

  beforeMount () {
    // this.$root.$on('local-document-loaded', this.showDocument)

    // this.$root.$on('document-updated', this.saved)

    // this.$root.$on('new-document-created', this.created)
    this.$root.$on('document-content-received', this.getDocument)
  }
}

</script>

<style>

.v-dialog {
  overflow-y: hidden !important;
}

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
