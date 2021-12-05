<template>
  <v-card flat class="transparent mx-auto" max-width="600">
    <v-toolbar flat class="transparent">
      <v-toolbar-title>
        Documents
      </v-toolbar-title>
      <v-spacer />
      <v-btn text @click="createNewFolder">
        <v-icon @click="edited = index" color="#999">mdi-folder-plus</v-icon>
        New folder
      </v-btn>
    </v-toolbar>

    <v-expansion-panels flat class="transparent mx-auto" v-model="panel">
      <v-expansion-panel v-for="(folder, index) of folders" :key="folder">
        <v-expansion-panel-header @dblclick.stop="edited = index">
          <v-row v-if="edited === index" justify="start" align="center">
            <v-icon class="mr-2">mdi-folder</v-icon>
            <v-text-field v-model="folders[index]" outlined dense hide-details style="max-width: 70%" />
            <v-icon class="ml-2" @click="edited = undefined">mdi-check-bold</v-icon>
          </v-row>
          <v-row v-else justify="start" align="center">
            <v-icon v-if="panel !== index" class="mr-2" color="#999">mdi-folder</v-icon>
            <v-icon v-else class="mr-2" color="#900">mdi-folder-open</v-icon>
            <span>{{ folder }}</span>
            <v-icon small class="ml-2" @click="edited = index">mdi-pencil</v-icon>
            <v-spacer />
            <v-btn v-if="panel === index" text @click.stop="createDocument(folder)">
              <v-icon small>mdi-plus</v-icon>
              <small>New document</small>
            </v-btn>
            <v-spacer />
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-list dense>
            <v-list-item v-for="document of content[folder]" :key="document._id" @click="editDocument(document._id)">
              <v-icon small class="ml-12 mr-2">mdi-file-document-edit-outline</v-icon>
              <small>{{ document.title }}</small>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <EditDocument
      v-if="editDialog"
      :dialog.sync="editDialog"
      :documentId="editedDocumentId"
      :folders="folders"
      :dir="folder"
    />
  </v-card>
</template>

<script>

export default {
  name: 'Documents',

  components: {
    EditDocument: () => import('@/components/documents/EditDocument.vue')
  },

  data: () => ({
    panel: undefined,
    folders: [],
    folder: '',
    content: {},
    edited: undefined,
    editDialog: false,
    editedDocumentId: null
  }),

  methods: {
    getData (data) {
      this.folders = Array.from(new Set(data.map(item => item.folder)))
      this.content = Object.assign({}, ...this.folders.map(folderName => ({ [folderName]: [] })))
      data.forEach(item => this.content[item.folder].push(item))
    },

    createDocument (folder) {
      this.folder = folder

      this.editDocument(null)
    },

    removeDocument (folder, documentId) {
      console.log('Delete document: ', folder, documentId)
    },

    editDocument (id) {
      this.editedDocumentId = id
      this.editDialog = true
    },

    createNewFolder () {
      this.edited = this.folders.push('New folder') - 1
    },

    getNewDocumentId (data) {
      this.__getDocumentsList(this.getData)
      this.editDialog = false
    }
  },

  beforeDestroy () {
    this.$root.$off('new-document-created', this.getNewDocumentId)
  },

  beforeMount () {
    this.$root.$on('new-document-created', this.getNewDocumentId)

    this.__getDocumentsList(this.getData)
  }
}
</script>

<style>
.theme--light.v-expansion-panels .v-expansion-panel {
  background: transparent;
}
</style>
