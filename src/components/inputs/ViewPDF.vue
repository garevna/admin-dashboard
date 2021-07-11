<template>
  <v-dialog
    v-model="dialog"
     v-if="ready"
    transition="dialog-bottom-transition"
    max-width="80%"
  >
    <v-toolbar dense>
      <v-toolbar-title style="width: 360px" color="primary">
        <v-text-field
          v-model="record.title"
          outlined
          dense
          hide-details
          prepend-inner-icon="mdi-square-edit-outline"
          append-outer-icon="mdi-content-save"
          @click:append-outer="saveChanges"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
  </v-dialog>
</template>

<script>

export default {
  name: 'ViewPDF',

  props: ['dialog', 'id', 'title'],

  data: () => ({
    record: null,
    ready: false
  }),

  methods: {
    getContent (data) {
      console.log('PDF CONTENT RECEIVED:\n', data)
      this.record = data
      this.ready = true
    },

    saveChanges () {
      this.$root.$on('sla-data-updated', this.close)
      this.__updateSLA(this.record)
    },

    close (response) {
      console.log(response)
      this.$emit('update:title', this.record.title)
      this.$emit('update:dialog', false)
    }
  },

  beforeDestroy () {
    this.$root.$off('sla-content-received', this.getContent)
  },

  beforeMount () {
    this.$root.$on('sla-content-received', this.getContent)
    this.__getSLAContent(this.id)
  }
}

</script>
