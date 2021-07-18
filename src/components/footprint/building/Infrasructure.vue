<template>
  <table width="360" class="mx-auto">
    <tbody>
      <tr>
        <td width="100">
          <v-checkbox
            v-model="marketing.foyer"
            label="Foyer"
            hide-details
            style="width: 100px"
          />
        </td>
        <td v-if="marketing.foyer">
          <v-text-field
            v-model="marketing.foyerDetails"
            label="Foyer details"
            outlined
            dense
            hide-details
          />
        </td>
      </tr>

      <tr>
        <td>
          <v-checkbox
            v-model="marketing.lift"
            label="Lift"
            hide-details
            style="width: 100px"
          />
        </td>
        <td v-if="marketing.lift">
          <v-text-field
            v-model="marketing.foyerDetails"
            label="Lift details"
            outlined
            dense
            hide-details
          />
        </td>
      </tr>

      <tr></tr>

      <tr>
        <td></td>
        <td>
          <v-text-field
            v-model="marketing.other"
            label="Other marketing"
            outlined
            dense
            hide-details
          />
        </td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align: right">
          <v-btn dark color="primary" @click="updateMarketing" class="mt-8">
            Save updates
          </v-btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'Infrasructure',

  props: ['buildingData'],

  data: () => ({
    marketing: { foyer: false, foyerDetails: '', lift: false, liftDetails: '', other: '' }
  }),

  methods: {
    updateMarketing () {
      this.__patchBuildingDetails({ marketing: this.marketing })
    }
  },

  mounted () {
    this.marketing = this.buildingData.marketing || this.marketing
  }
}
</script>

<style scoped>
tr, td {
  height: 24px !important;
  vertical-align: super;
}
</style>
