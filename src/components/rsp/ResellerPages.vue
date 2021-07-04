<template>
  <v-container class="homefone" v-if="opened">
    <v-stepper v-model="step" class="homefone" style="box-shadow: none;">
      <v-stepper-items flat class="page-content transparent mx-auto mt-6 mb-12">
        <transition name="current-component">
          <component
            :is="currentComponent"
            :details="resellerDetails"
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
          :class="{ active: companyStep, tab: !companyStep }"
          @click="step = 1"
        >
          RSP details
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: serviceStep, tab: !serviceStep }"
          @click="step = 2"
        >
            RSP Service list
          </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: customerStep, tab: !customerStep }"
          @click="step = 3"
        >
          RSP Customer list
        </v-btn>

        <v-btn
          class="mx-1"
          :class="{ active: ticketStep, tab: !ticketStep }"
          @click="step = 4"
        >
          RSP Ticket list
        </v-btn>
      </v-stepper-header>
    </v-row>
  </v-container>
</template>

<script>

import CompanyDetails from '@/components/rsp/CompanyDetails.vue'
import ResellerServices from '@/components/rsp/ResellerServices.vue'
import CustomersList from '@/components/customers/CustomersList.vue'
import ResellerTickets from '@/components/rsp/ResellerTickets.vue'

export default {
  name: 'ResellerPages',
  components: {
    CompanyDetails,
    ResellerServices,
    CustomersList,
    ResellerTickets
  },

  props: {
    opened: Boolean,
    resellerDetails: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    ready: false,
    step: 1,
    steps: ['RSP details', 'RSP Service list', 'RSP Customer list', 'RSP Ticket list'],
    pages: [
      CompanyDetails,
      ResellerServices,
      CustomersList,
      ResellerTickets
    ],
    currentComponent: CompanyDetails
  }),

  computed: {
    companyStep () {
      return this.step === 1
    },
    serviceStep () {
      return this.step === 2
    },
    customerStep () {
      return this.step === 3
    },
    ticketStep () {
      return this.step === 4
    }
  },
  watch: {
    step (value) {
      this.currentComponent = this.pages[value - 1]
    }
  },

  methods: {
    goToCompanyDetails () {
      this.step = 1
      this.currentComponent = CompanyDetails
    },
    goToServiceList () {
      this.step = 2
      this.currentComponent = ResellerServices
    },
    goToCustomersList () {
      this.step = 3
      this.currentComponent = CustomersList
    },
    goToTicketsList (data) {
      this.step = 4
      this.currentComponent = ResellerTickets
    }
  },

  mounted () {
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
