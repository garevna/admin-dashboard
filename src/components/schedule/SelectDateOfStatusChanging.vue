<template>
  <v-card flat class="transparent">
    <v-row class="mt-2">
      <v-col>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="localDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="localDate"
              :label="title"
              prepend-icon="mdi-calendar"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
              color="primary"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="localDate"
            scrollable
            color="primary"
            :min="localMin"
            :max="localMax"
          >

            <v-spacer />

            <v-btn text color="primary" @click="modal = false">
              Cancel
            </v-btn>

            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-btn
        outlined
        small
        color="primary"
        :disabled="!localDate"
        @click="$emit('update:action', true)"
        width="270"
      >
        Submit
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'SelectDateOfStatusChanging',

  props: ['title', 'date', 'action', 'min', 'max'],

  data: () => ({
    menu: false,
    modal: false
  }),

  computed: {
    localMin () {
      return this.min
        ? typeof this.min === 'string'
          ? this.min
          : new Date().toISOString().slice(0, 10)
        : null
    },

    localMax () {
      return this.max
        ? typeof this.max === 'string'
          ? this.max
          : new Date().toISOString().slice(0, 10)
        : null
    },

    localDate: {
      get () {
        return this.date
      },
      set (value) {
        this.$emit('update:date', value)
      }
    }
  }
}
</script>
