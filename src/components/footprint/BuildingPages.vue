<template>
  <v-container class="homefone">
    <v-stepper v-model="step" class="homefone" style="box-shadow: none;">
      <v-stepper-items flat class="page-content transparent mx-auto mt-6 mb-12">
        <transition name="current-component" v-if="ready">
          <component
            :is="currentComponent"
            :buildingData="buildingData"
          />
        </transition>
      </v-stepper-items>
    </v-stepper>

    <v-row justify="center" class="homefone py-12 mx-0 px-0">
      <v-stepper-header
        elevation="0"
        class="homefone text-center mx-auto py-12 d-none d-md-block"
        style="box-shadow: none; position: fixed; top: 80px; width: 100%; height: 100px; z-index: 12;"
      >
        <v-btn
          class="mx-1"
          :class="{ active: buildingStep, tab: !buildingStep }"
          @click="step = 1"
        >
          {{ steps[0] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: accessStep, tab: !accessStep }"
          @click="step = 2"
        >
          {{ steps[1] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: levelStep, tab: !levelStep }"
          @click="step = 3"
        >
            {{ steps[2] }}
          </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: infrastructureStep, tab: !infrastructureStep }"
          @click="step = 4"
        >
          {{ steps[3] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: stakeholderStep, tab: !stakeholderStep }"
          @click="step = 5"
        >
          {{ steps[4] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: filesStep, tab: !filesStep }"
          @click="step = 6"
        >
          {{ steps[5] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: otherStep, tab: !otherStep }"
          @click="step = 7"
        >
          {{ steps[6] }}
        </v-btn>
      </v-stepper-header>
    </v-row>
  </v-container>
</template>

<script>

import GeneralInfo from '@/components/footprint/building/GeneralInfo.vue'
import Access from '@/components/footprint/building/Access.vue'
import Levels from '@/components/footprint/building/Levels.vue'
import Infrastructure from '@/components/footprint/building/Infrastructure.vue'
import Stakeholdes from '@/components/footprint/building/Stakeholdes.vue'
import Files from '@/components/footprint/building/Files.vue'
import Other from '@/components/footprint/building/Other.vue'

export default {
  name: 'BuildingPages',

  components: {
    GeneralInfo,
    Access,
    Levels,
    Infrastructure,
    Stakeholdes,
    Files,
    Other
  },

  props: {
    opened: Boolean,
    buildingId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    ready: false,
    step: 1,
    steps: ['General info', 'Access', 'Levels', 'Infrastructure', 'Stakeholdes', 'Files', 'Other'],
    pages: [
      GeneralInfo,
      Access,
      Levels,
      Infrastructure,
      Stakeholdes,
      Files,
      Other
    ],
    currentComponent: GeneralInfo,
    buildingData: null
  }),

  computed: {
    buildingStep () {
      return this.step === 1
    },
    accessStep () {
      return this.step === 2
    },
    levelStep () {
      return this.step === 3
    },
    infrastructureStep () {
      return this.step === 4
    },
    stakeholderStep () {
      return this.step === 5
    },
    filesStep () {
      return this.step === 6
    },
    otherStep () {
      return this.step === 7
    }
  },

  watch: {
    step (value) {
      this.currentComponent = this.pages[value - 1]
    }
  },

  methods: {
    getData (data) {
      this.buildingData = data.result
      this.ready = true
    },
    goToGeneralInfo () {
      this.step = 1
      this.currentComponent = GeneralInfo
    },
    goToAccess () {
      this.step = 2
      this.currentComponent = Access
    },
    goToLevels () {
      this.step = 3
      this.currentComponent = Levels
    },
    goToInfrastructure (data) {
      this.step = 4
      this.currentComponent = Infrastructure
    },
    goToStakeholders (data) {
      this.step = 5
      this.currentComponent = Stakeholdes
    },
    goToFiles (data) {
      this.step = 6
      this.currentComponent = Files
    },
    goToOther (data) {
      this.step = 7
      this.currentComponent = Other
    }
  },

  beforeDestroy () {
    this.$root.$off('building-details', this.getData)
  },

  mounted () {
    this.$root.$on('building-details', this.getData)
    this.__getBuildingById(this.buildingId)
    this.$vuetify.goTo(0)
  }
}
</script>

<style>

.tab {
  background: #fbfbfb!important;
  border: solid 1px #900;
}

.page-content {
  top:64px;
}

.active {
  background: #900!important;
  color: #fff!important;
}

.current-component-enter-active {
  animation: fade-component .4s .4s ease-in both;
}

.current-component-leave-active {
  animation: fade-component .4s reverse ease-out both;
}

@keyframes fade-component {
  0% {
    opacity: 0;
    transform: translate(-200px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
