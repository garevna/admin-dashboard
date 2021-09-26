<template>
  <v-dialog v-model="dialog" max-width="540" class="pa-4">
    <v-card flat height="360">
      <v-toolbar dark dense color="#999">
        <v-icon class="mr-4"> mdi-account-box </v-icon>
        <v-toolbar-title> Customer details </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="transparent" @click="dialog = false">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <p>Customer name: <b>{{ name }}</b></p>
      </v-card-text>
      <v-card-text class="text-center">
        <p>Address: <b>{{ address }}</b></p>
      </v-card-text>
      <v-card-text class="text-center">
        <p>Phone: <b>{{ phone }}</b></p>
      </v-card-text>
      <v-row justify="center" style="width: 100%">
        <v-btn outlined color="primary" @click="dialog = false">OK</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'CustomerInfo',
  data: () => ({
    name: '',
    address: '',
    phone: '',
    dialog: false
  }),

  methods: {
    open (data) {
      const { name, address, phone } = data
      this.name = name
      this.address = address
      this.phone = phone
      this.dialog = true
    }
  },

  beforeDestroy () {
    this.$root.$off('open-customer-info-popup', this.open)
  },

  mounted () {
    this.$root.$on('open-customer-info-popup', this.open)
  }
}
</script>
