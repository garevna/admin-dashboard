<template>
  <v-row justify="center" class="mt-12">
    <v-btn
      :dark="active[0]"
      :class="active[0] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
      height="64"
      width="160"
      @click="setActive(0)"
    >
      <Overview style="position: absolute; left: -12px" />
      <b class="ml-8"> Overview </b>
    </v-btn>

    <v-btn
      :dark="active[1]"
      :class="active[1] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
      height="64"
      width="160"
      @click="setActive(1)"
    >
      <Financials style="position: absolute; left: -12px" />
      <b class="ml-8"> Financials </b>
    </v-btn>

    <v-btn
      :dark="active[2]"
      :class="active[2] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
      height="64"
      width="160"
      @click="setActive(2)"
    >
      <Buildings style="position: absolute; left: -12px" />
      <b class="ml-8"> Buildings </b>
    </v-btn>

    <v-btn
      :dark="active[3]"
      :class="active[3] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
      height="64"
      width="160"
      @click="setActive(3)"
    >
      <ARPU style="position: absolute; left: -12px" />
      <b class="ml-8"> ARPU </b>
    </v-btn>

    <v-btn
      :dark="active[4]"
      :class="active[4] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
      height="64"
      width="160"
      @click="setActive(4)"
    >
      <Forecast style="position: absolute; left: -12px" />
      <b class="ml-8"> Forecast </b>
    </v-btn>

    <v-btn
      v-if="partnersReady"
      :dark="active[5]"
      :class="active[5] ? 'primary mx-2 text-left' : 'transparent mx-2 text-left'"
      height="64"
      width="160"
      @click="setActive(5)"
    >
      <Partners style="position: absolute; left: -12px" />
      <b class="ml-8"> Partners </b>
    </v-btn>

    <v-btn
      :dark="active[6]"
      :class="active[6] ? 'primary mx-2 pl-4 text-left' : 'transparent mx-2 pl-4 text-left'"
      height="64"
      width="200"
      @click="setActive(6)"
    >
      <Performance :active="active[6]" />
      <b class="ml-8"> Network<br>Performance </b>
    </v-btn>
  </v-row>

</template>

<script>

import {
  Overview,
  Financials,
  Forecast,
  ARPU,
  Buildings,
  Partners,
  Performance
} from '@/components/icons'

export default {
  name: 'MainReportTabs',

  components: {
    Overview,
    Financials,
    Forecast,
    ARPU,
    Buildings,
    Partners,
    Performance
  },

  props: ['tab', 'partnersReady'],

  data: () => ({
    active: [true, false, false, false, false, false, false]
  }),

  watch: {
    tab: {
      immediate: true,
      handler (val) {
        this.setActive(val)
      }
    }
  },

  methods: {
    setActive (index) {
      this.active = [false, false, false, false, false, false, false]
      this.active[index] = true
      this.$emit('update:tab', index)
    }
  }
}
</script>
