<template>
  <v-container class="homefone">
    <v-stepper v-model="step" class="homefone" style="box-shadow: none;">
      <v-divider class="mb-5" />
      <v-stepper-items flat class="page-content transparent mx-auto mt-6 mb-12">
        <v-card flat class="transparent mx-auto" max-width="900" v-if="ready">
          <v-toolbar flat class="transparent">
            <v-toolbar-title>
              <h5>
                <b class="outlined mr-4">
                  {{ buildingData.buildingUniqueCode }}
                </b>
                <small>{{ buildingData.address }}</small>
              </h5>
            </v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="exit">
              <v-icon large>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>

        <v-divider class="mx-auto mb-12" style="max-width: 900px" />

        <transition name="current-component" v-if="ready">
          <component
            :is="currentComponent"
            :buildingData.sync="buildingData"
            class="mb-8"
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
          :class="{ active: corporationStep, tab: !corporationStep }"
          @click="step = 2"
        >
          {{ steps[1] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: accessStep, tab: !accessStep }"
          @click="step = 3"
        >
          {{ steps[2] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: levelStep, tab: !levelStep }"
          @click="step = 4"
        >
            {{ steps[3] }}
          </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: infrastructureStep, tab: !infrastructureStep }"
          @click="step = 5"
        >
          {{ steps[4] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: stakeholderStep, tab: !stakeholderStep }"
          @click="step = 6"
        >
          {{ steps[5] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: filesStep, tab: !filesStep }"
          @click="step = 7"
        >
          {{ steps[6] }}
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: otherStep, tab: !otherStep }"
          @click="step = 8"
        >
          {{ steps[7] }}
        </v-btn>
      </v-stepper-header>
    </v-row>
  </v-container>
</template>

<script>

import GeneralInfo from '@/components/footprint/building/GeneralInfo.vue'
import Corporation from '@/components/footprint/building/Corporation.vue'
import Access from '@/components/footprint/building/Access.vue'
import Levels from '@/components/footprint/building/Levels.vue'
import Infrastructure from '@/components/footprint/building/Infrastructure.vue'
import Stakeholdes from '@/components/footprint/building/Stakeholdes.vue'
import Files from '@/components/footprint/building/Files.vue'
import Other from '@/components/footprint/building/Other.vue'

import { buildingStatusHandler /*, buildingsListPageNumberHandler */ } from '@/controllers/data-handlers'
import { getRouteByBuildingStatus } from '@/helpers'

export default {
  name: 'BuildingPages',

  components: {
    GeneralInfo,
    Corporation,
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
    steps: ['General', 'Corporation', 'Access', 'Levels', 'Infrastructure', 'Stakeholders', 'Files', 'Other'],
    pages: [
      GeneralInfo,
      Corporation,
      Access,
      Levels,
      Infrastructure,
      Stakeholdes,
      Files,
      Other
    ],
    currentComponent: GeneralInfo,
    generalInfoUpdated: false,
    buildingData: null
  }),

  computed: {
    buildingStep () {
      return this.step === 1
    },
    corporationStep () {
      return this.step === 2
    },
    accessStep () {
      return this.step === 3
    },
    levelStep () {
      return this.step === 4
    },
    infrastructureStep () {
      return this.step === 5
    },
    stakeholderStep () {
      return this.step === 6
    },
    filesStep () {
      return this.step === 7
    },
    otherStep () {
      return this.step === 8
    }
  },

  watch: {
    step (value) {
      this.currentComponent = this.pages[value - 1]
    }
  },

  methods: {
    exit () {
      const { address, uniqueCode, status, estimatedServiceDeliveryTime, buildingClass, buildingType, buildingCategory } = this.buildingData

      buildingStatusHandler(status)
      const routeName = getRouteByBuildingStatus(status)

      const general = { address, uniqueCode, status, estimatedServiceDeliveryTime, buildingClass, buildingType, buildingCategory }

      this.generalInfoUpdated && this.$root.$emit('building-general-data-changed', general)

      this.$route.name !== routeName && this.$router.push({ name: routeName }).catch(failure => console.warn('Router failure:\n', failure))
    },

    getData (data) {
      this.buildingData = data
      this.ready = true
    },
    goToGeneralInfo () {
      this.step = 1
      this.currentComponent = GeneralInfo
    },
    goToCorporation () {
      this.step = 2
      this.currentComponent = Corporation
    },
    goToAccess () {
      this.step = 3
      this.currentComponent = Access
    },
    goToLevels () {
      this.step = 4
      this.currentComponent = Levels
    },
    goToInfrastructure (data) {
      this.step = 5
      this.currentComponent = Infrastructure
    },
    goToStakeholders (data) {
      this.step = 6
      this.currentComponent = Stakeholdes
    },
    goToFiles (data) {
      this.step = 7
      this.currentComponent = Files
    },
    goToOther (data) {
      this.step = 8
      this.currentComponent = Other
    }
  },

  mounted () {
    window[Symbol.for('map.worker')].getBuildingDetailsById(this.buildingId, this.getData)
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
