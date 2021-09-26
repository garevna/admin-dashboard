<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dark dense color="#900">
        <v-icon class="mr-4"> mdi-account-box </v-icon>
        <v-toolbar-title> Confirm operation </v-toolbar-title>
        <v-spacer />
        <v-btn icon class="transparent" @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h5>{{ title }}</h5>
      </v-card-text>
      <v-card-text class="text-center">
        <p>{{ message }}</p>
      </v-card-text>
      <v-card-text class="text-center pb-8">
        <v-btn dark color="primary" @click="confirm" class="mr-4">Confirm</v-btn>
        <v-btn outlined color="primary" @click="dialog = false">Cancel</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'Confirmation',

  data: () => ({
    title: '',
    message: '',
    dialog: false
  }),

  methods: {
    confirm () {
      this.$root.$emit('operation-confirmed', this.source)
      this.dialog = false
    },

    open (data) {
      this.source = data.source
      this.title = data.title || 'Confirm deletion'
      this.message = data.message || 'Are you sure you want to delete the data?'
      this.dialog = true
    }
  },

  beforeDestroy () {
    this.$root.$off('open-confirmation-popup', this.open)
  },

  mounted () {
    this.$root.$on('open-confirmation-popup', this.open)
  }
}
</script>
