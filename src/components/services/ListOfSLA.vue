<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col class="ml-12">
        <h5>SLA list</h5>
        <div class="pa-4" style="height: 480px; width: 480px; border: solid 1px #ddd; padding: 16px; overflow-y: auto">
          <table>
            <tbody>
              <tr v-for="item of listOfSLA" :key="item._id">
                <td width="420">
                  <v-text-field
                    v-if="item._id === editing"
                    v-model="item.title"
                    dense
                    hide-details
                    outlined
                    append-outer-icon="mdi-check-bold"
                    @click:append-outer="saveItemTitle"
                  />
                  <span v-else @dblclick.stop="edit(item)">
                    <v-icon small color="primary" @click.stop="remove(item)">mdi-delete</v-icon>
                    {{ item.title }}
                    <v-icon small color="#09b" @click.stop="edit(item)">mdi-pencil</v-icon>
                  </span>
                </td>
                <td width="60">
                  <v-btn icon @click.stop="selected = item._id" class="ml-5">
                    <v-icon small color="#09b">mdi-eye</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <v-row justify="space-between" class="mx-4 mt-2">
          <v-btn text @click="addNewSLA">
            <v-icon>mdi-plus</v-icon>
            Add new SLA
          </v-btn>
        </v-row>
      </v-col>

      <v-col class="mr-12">
        <v-card flat class="transparent mx-auto" style="margin-top: -40px">
          <h5><small>{{ selected ? listOfSLA[selectedIndex].title : '...' }}</small></h5>
          <object
            :data="content"
            type="application/pdf"
            width="100%"
            height="600"
          ></object>

          <v-row justify="space-between" class="mx-4 mt-2">
            <v-file-input
              placeholder="Upload another file"
              outlined
              dense
              prepend-icon="mdi-file-upload"
              v-model="file"
              @change="readLocalFile($event)"
              style="max-width: 320px"
              hide-details
            ></v-file-input>

            <v-btn outlined @click="saveItemContent">
              Save updates
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

const { pdf404 } = require('@/configs').default

export default {
  name: 'ListOfSLA',

  data: () => ({
    ready: false,
    listOfSLA: [],
    selected: null,
    toBeRemoved: null,
    editing: null,
    file: null,
    content: pdf404
  }),

  computed: {
    selectedIndex () {
      return this.listOfSLA.findIndex(item => item._id === this.selected)
    },
    editingIndex () {
      return this.listOfSLA.findIndex(item => item._id === this.editing)
    }
  },

  watch: {
    selected (id) {
      if (id) this.__getSLAContent(id, this.getSLAContent)
      else this.content = pdf404
    }
  },

  methods: {
    getSLAList (data) {
      this.listOfSLA = data
    },

    getSLAContent (data) {
      this.content = data.content
    },

    readLocalFile (file) {
      this.ready = false
      file && this.__readLocalFile(file, this.getLocalFileContent)
    },

    getLocalFileContent (data) {
      this.content = data || pdf404
      this.ready = true
    },

    addNewSLA () {
      this.__createSLA({ title: 'New SLA', content: pdf404 }, this.created)
    },

    created (data) {
      const newSLA = {
        _id: data,
        title: 'New SLA',
        content: pdf404
      }
      this.listOfSLA.push(newSLA)
      this.selected = data
      this.content = pdf404
    },

    edit (sla) {
      this.editing = sla._id
    },

    remove (item) {
      this.__removeSLA(item._id, this.removed)
      this.toBeRemoved = item._id
    },

    removed () {
      const index = this.listOfSLA.findIndex(item => item._id === this.toBeRemoved)
      index !== -1 && this.listOfSLA.splice(index, 1)
      this.toBeRemoved = null
      this.selected = null
    },

    saveItemTitle () {
      if (!this.editing) return
      this.__updateSLA({ id: this.editing, title: this.listOfSLA[this.editingIndex].title }, this.saved)
      this.editing = null
    },

    saveItemContent () {
      this.__updateSLA({ id: this.selected, content: this.content }, this.saved)
    },

    saveNewSLA () {
      this.__createNewSLA({ title: this.listOfSLA[this.editingIndex].title, content: this.content }, this.finishCreation)
    },

    saved (data) {
      // console.log(data)
    }
  },

  beforeDestroy () {
    this.$root.$off('local-file-content-loaded', this.getLocalFileContent)
  },

  beforeMount () {
    this.$root.$on('local-file-content-loaded', this.getLocalFileContent)

    this.__getSLAList(this.getSLAList)

    this.ready = false
  }
}
</script>
