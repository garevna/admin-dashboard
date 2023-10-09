<template>
  <Fieldset legend="Discount" class="mx-auto" style="max-height: 280px; margin-top: 32px; max-width: 720px;">
    <table>
      <tr>
        <td rowspan="2" width="180" class="pr-12" style="vertical-align: start">
          <v-text-field
            v-model="value"
            outlined
            dense
            hide-details
            :label="discount.units"
            :prepend-icon="units === 'sum' ? 'mdi-toggle-switch-off-outline' : 'mdi-toggle-switch-outline'"
            @click:prepend="changeUnits"
            :prefix="units === 'sum' ? '$' : '%'"
          />
        </td>

        <td width="80" class="pr-8">
          <v-checkbox
            v-model="discountStart"
            label="Start"
            color="primary"
            hide-details
            style="margin-top: -32px !important"
          />
        </td>

        <td v-if="discountStart" width="80">
          <v-checkbox
            v-model="discountEnd"
            label="End"
            color="primary"
            hide-details
            style="margin-top: -32px !important"
          />
        </td>
      </tr>
      <tr>
        <td width="240">
          <DatePicker
            v-if="discountStart"
            title="From"
            :date.sync="from"
            :minDate="activationDate"
          />
        </td>
        <td width="240">
          <DatePicker
            v-if="discountEnd"
            title="To"
            :date.sync="to"
          />
          <div v-else style="border: solid 1px #ddd; border-radius: 4px; padding: 8px 16px; margin: 12px 16px;">
            Unlimited
          </div>
        </td>
      </tr>
    </table>
  </Fieldset>
</template>

<script>

import DatePicker from '@/components/inputs/DatePicker.vue'
import Fieldset from '@/components/Fieldset.vue'

import { customerController } from '@/components/customers/import/controllers'

export default {
  name: 'EditCustomerDiscountInfo',

  components: {
    Fieldset,
    DatePicker
  },

  props: ['serviceIndex', 'customerIndex'],

  data: () => ({
    activationDate: null,
    ready: true,
    discount: null,
    period: [],
    discountStart: true,
    discountEnd: false
  }),

  computed: {
    from: {
      get () {
        return this.getDate(this.period[0])
      },
      set (val) {
        customerController.updateDiscountPeriod(0, val)
        this.period = customerController.getDiscountPeriod()
      }
    },

    to: {
      get () {
        return this.getDate(this.period[1])
      },
      set (val) {
        customerController.updateDiscountPeriod(1, val)
        this.period = customerController.getDiscountPeriod()
      }
    },

    units: {
      get () {
        return this.discount?.units || 'sum'
      }
    },

    value: {
      get () {
        return this.discount?.value || 0
      },
      set (val) {
        customerController.updateDiscountProp('value', val)
      }
    }
  },

  watch: {
    serviceIndex (index) {
      if (index !== -1) this.refresh()
    },

    customerIndex (index) {
      this.serviceIndex = -1
    },

    discountStart (val) {
      this.period = val ? customerController.getDiscountPeriod() : null
    }
  },

  methods: {
    refresh () {
      const service = customerController.getServices()[customerController.getServiceIndex()]
      this.activationDate = service.activationDate
      this.discount = customerController.getDiscount()
      this.period = customerController.getDiscountPeriod()
      this.discountEnd = Boolean(this.period[1])
    },

    getDate (ms) {
      return parseInt(ms) ? new Date(parseInt(ms)).toISOString().slice(0, 10) : null
    },

    update (propName, propValue) {
      customerController.updateDiscount(propName, propValue)
    },

    changeUnits () {
      const units = this.units === 'sum' ? 'percent' : 'sum'
      customerController.updateDiscountProp('units', units)
    },

    getInitialPeriod () {
      return customerController.getDiscountPeriod()
    }
  },

  created () {
    this.refresh()
    this.discount = customerController.getDiscount()
  }
}
</script>
