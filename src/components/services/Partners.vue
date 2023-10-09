<template>
  <v-row align="start" justify="center" v-if="ready">
    <v-col style="max-width: 480px">
      <ShortList
        title="All partners"
        :list="partners"
        :selected.sync="selectedPartner"
        :height="480"
        :disabled="selectedPartners"
      />
    </v-col>

    <v-col style="vertical-align: middle; max-width: 140px; padding-top: 25vh">
      <v-btn text v-if="selectedPartner" @click="selectPartner" style="width: 100%; text-align: center;">
        Add <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn text v-if="deselectedPartner" @click="deselectPartner" style="width: 100%; text-align: center;">
        <v-icon>mdi-chevron-left</v-icon> Remove
      </v-btn>
    </v-col>

    <v-col style="max-width: 480px; text-align: center">
      <ShortList
        title="Current service partners"
        :list="selectedPartners"
        :selected.sync="deselectedPartner"
        :height="480"
      />

      <!-- <v-row justify="end" class="mt-8 mr-12">
        <v-btn text dark class="primary" @click="saveServicePartners">
          SAVE UPDATES
        </v-btn>
      </v-row> -->
    </v-col>
  </v-row>
</template>

<script>

import ShortList from '@/components/inputs/ShortList.vue'

export default {
  name: 'Partners',

  components: {
    ShortList
  },

  props: ['servicePartners'],

  data: () => ({
    ready: false,
    partners: [],
    selectedPartner: null,
    deselectedPartner: null
  }),

  computed: {
    selectedPartners: {
      get () {
        return this.servicePartners.map(id => ({ id, text: this.getName(id) }))
      },
      set (data) {
        this.$emit('update:servicePartners', data.map(partner => partner.id))
      }
    }
    // disabled () {
    //   return this.partners.filter(partner => this.servicePartners.includes(partner.id))
    // }
  },

  methods: {
    getName (id) {
      return this.partners ? this.partners.find(item => item.id === id)?.text : 'Partner is not available.'
    },

    getPartnersList (data) {
      this.partners = data.map(partner => ({ text: partner.name, id: partner.id }))
      this.ready = true
    },

    selectPartner () {
      this.deselectedPartner = null
      this.selectedPartners.push(this.partners.find(item => item.id === this.selectedPartner))
      this.$emit('update:servicePartners', this.selectedPartners.map(partner => partner.id))
    },

    deselectPartner () {
      this.selectedPartner = null
      const index = this.selectedPartners.findIndex(item => item.id === this.deselectedPartner)
      index !== -1 && this.selectedPartners.splice(index, 1)
      this.$emit('update:servicePartners', this.selectedPartners.map(partner => partner.id))
      this.deselectedPartner = null
    }
  },

  beforeMount () {
    this.__getResellersShortList(this.getPartnersList)
  }
}

</script>
