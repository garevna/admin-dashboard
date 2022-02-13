<template>
  <v-card flat class="transparent mx-auto">
    <v-row class="mt-2" justify="center" align="center">
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
              prepend-inner-icon="mdi-calendar-search"
              readonly
              outlined
              dense
              hide-details
              v-bind="attrs"
              v-on="on"
              color="primary"
              style="max-width: 180px; display: inline-block"
              @click:append-outer="$emit('update:action', true)"
            ></v-text-field>

            <v-btn
              outlined
              small
              color="primary"
              :disabled="!localDate"
              @click="$emit('update:action', true)"
              width="80"
              height="40"
              class="ml-2 mb-3"
              style="display: inline-block"
            >
              Submit
            </v-btn>
          </template>

          <v-date-picker
            v-model="localDate"
            scrollable
            no-title
            color="primary"
            :min="localMin"
            :max="localMax"
            :first-day-of-week="1"
            class="pt-4"
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
  </v-card>
</template>

<script>

export default {
  name: 'SelectDateOfStatusChanging',

  props: ['title', 'date', 'action', 'min', 'max'],

  data: () => ({
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
