<template>
  <v-container>
    <v-row align="start" justify="start">
      <v-subheader>
        <h5>SLA</h5>
      </v-subheader>
    </v-row>
    <v-row align="start" justify="center">
      <v-col cols="12" md="5" lg="4" xl="3">
        <v-list dense max-height="600" style="overflow-y: auto" outlined class="mb-5">
          <v-list-item-group>
            <v-list-item
              v-for="(item, index) of listOfSLA"
              :key="item._id"
            >
              <v-list-item-content style="padding: 0 !important">
                <v-row justify="space-between" align="center">
                  <v-col cols="8">
                    <v-text-field
                      v-if="index === editing"
                      v-model="item.title"
                      dense
                      hide-details
                      outlined
                      append-outer-icon="mdi-check-bold"
                      @click:append-outer="saveItemTitle"
                    />
                    <span v-else @dblclick.stop="edit(item)">
                      <v-icon small @click.stop="remove(item)">mdi-delete</v-icon>
                      <small>{{ item.title }}</small>
                      <v-icon small @click.stop="edit(item)">mdi-pencil</v-icon>
                    </span>
                  </v-col>
                  <v-col cols="3">
                    <v-btn icon @click.stop="selected = index" class="ml-5">
                      <v-icon small>mdi-eye</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-row justify="space-between" class="mx-4 mt-2">
          <v-btn text @click="addNewSLA">
            <v-icon>mdi-plus</v-icon>
            Add new SLA
          </v-btn>
        </v-row>
      </v-col>

      <v-col cols="12" md="5" lg="5" xl="4">
        <v-card flat class="transparent mx-auto" style="margin-top: -40px">
          <h5><small>{{ typeof selected === 'number' ? listOfSLA[selected].title : '...' }}</small></h5>
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

  watch: {
    selected (index) {
      if (index) this.__getSLAContent(this.listOfSLA[index]._id, this.getSLAContent)
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
      this.listOfSLA.push({
        _id: null,
        title: 'New SLA'
      })

      this.content = pdf404

      this.selected = this.listOfSLA.length - 1

      this.__createSLA({ title: 'New SLA', content: this.content }, this.finishCreation)
    },

    finishCreation (data) {
      this.listOfSLA[this.selected]._id = data
    },

    edit (sla) {
      console.log(sla)
      console.log(this.selected)
      this.editing = this.listOfSLA.findIndex(item => item._id === sla._id)
      console.log(this.editing)
    },

    remove (item) {
      this.__removeSLA(item._id, this.finishRemoving)
      this.toBeRemoved = item._id
    },

    finishRemoving () {
      console.log('REMOVE FINISHED: ', this.toBeRemoved)
      const index = this.listOfSLA.findIndex(item => item._id === this.toBeRemoved)
      console.log(index)
      index !== -1 && this.listOfSLA.splice(index, 1)
      this.toBeRemoved = null
      this.selected = null
    },

    saveItemTitle () {
      if (!this.listOfSLA[this.editing]._id) return
      this.__updateSLA({ id: this.listOfSLA[this.editing]._id, title: this.listOfSLA[this.editing].title })
      this.editing = null
    },

    saveItemContent () {
      this.__updateSLA({ id: this.listOfSLA[this.selected]._id, content: this.content })
    },

    saveNewSLA () {
      console.log(this.listOfSLA[this.editing].title)
      console.log(this.content)
      this.__createNewSLA({ title: this.listOfSLA[this.editing].title, content: this.content }, this.finishCreation)
    }
  },

  beforeDestroy () {
    // this.$root.$off('sla-list-received', this.getSLAList)
    // this.$root.$off('sla-content-received', this.getSLAContent)
    this.$root.$off('local-file-content-loaded', this.getLocalFileContent)

    // this.$root.$off('new-sla-created', this.finishCreation)
    // this.$root.$off('sla-removed', this.finishRemoving)
  },

  beforeMount () {
    // this.$root.$on('sla-list-received', this.getSLAList)
    // this.$root.$on('sla-content-received', this.getSLAContent)
    this.$root.$on('local-file-content-loaded', this.getLocalFileContent)

    // this.$root.$on('sla-removed', this.finishRemoving)
    // this.$root.$on('new-sla-created', this.finishCreation)

    this.__getSLAList(this.getSLAList)

    this.ready = false
  }
}
</script>
