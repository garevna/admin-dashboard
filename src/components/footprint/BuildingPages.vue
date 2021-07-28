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
            :buildingData="buildingData"
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
    steps: ['General', 'Corporation', 'Access', 'Levels', 'Infrastructure', 'Stakeholdes', 'Files', 'Other'],
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
    showMessage () {
      this.$root.$emit('open-message-popup', {
        messageType: this.buildingData.address,
        messageText: 'Building details updated'
      })
    },
    exit () {
      buildingStatusHandler(this.buildingData.status)
      this.$route.name !== 'buildings' && this.$router.push({ name: 'buildings' })
    },

    getData (data) {
      this.buildingData = data.result
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

  beforeDestroy () {
    this.$root.$off('building-details', this.getData)
    this.$root.$off('building-details-updated', this.showMessage)
    this.$root.$off('new-building-created', this.getNewBuildingId)
  },

  mounted () {
    this.$root.$on('building-details', this.getData)
    this.$root.$on('building-details-updated', this.showMessage)
    this.$root.$on('new-building-created', this.getNewBuildingId)

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
