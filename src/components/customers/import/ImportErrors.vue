<template>
  <v-card flat class="transparent mx-auto" max-width="1080">
    <v-row justify="center">
      <table class="my-12">
        <tbody>
          <tr>
            <td width="360" v-if="fatalErrors.length" style="vertical-align: top;">
              <CustomersErrorsList
                title="Fatal errors:"
                type="fatal-errors"
                :items="fatalErrors"
              />
            </td>
            <td width="360" v-if="errors.length" style="vertical-align: top;">
              <CustomersErrorsList
                title="Errors:"
                type="errors"
                :items="errors"
              />
            </td>
            <td width="360" v-if="warnings.length" style="vertical-align: top;">
              <CustomersErrorsList
                title="Warnings:"
                type="warnings"
                :items="warnings"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </v-row>
  </v-card>
</template>

<script>

import {
  fatalErrorsController,
  errorsController,
  warningsController
} from '@/components/customers/import/controllers'

export default {
  name: 'ImportErrors',

  components: {
    CustomersErrorsList: () => import('@/components/customers/import/CustomersErrorsList.vue')
  },

  data: () => ({
    fatalErrors: null,
    errors: null,
    warnings: null
  }),

  computed: {
    ready () {
      return this.readyFatals && this.readyErrors && this.readyWarnings
    }
  },

  methods: {
    refreshFatalErrors (data) {
      this.fatalErrors = data
      this.readyFatals = true
    },
    refreshErrors (data) {
      this.errors = data
      this.readyErrors = true
    },
    refreshWarnings (data) {
      this.warnings = data
      this.readyWarnings = true
    }
  },

  beforeMount () {
    this.fatalErrors = fatalErrorsController.get()
    this.errors = errorsController.get()
    this.warnings = warningsController.get()
  },

  mounted () {
    this.$root.$on('fatal-errors-updated', this.refreshFatalErrors)
    this.$root.$on('errors-updated', this.refreshErrors)
    this.$root.$on('warnings-updated', this.refreshWarnings)
  },

  beforeDestroy () {
    this.$root.$off('fatal-errors-updated', this.refreshFatalErrors)
    this.$root.$off('errors-updated', this.refreshErrors)
    this.$root.$off('warnings-updated', this.refreshWarnings)
  }
}
</script>
