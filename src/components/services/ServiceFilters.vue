<template>
  <v-card flat class="transparent" v-if="ready">
    <table class="mx-auto">
      <tbody>
        <tr>
          <td>
            <v-select
              :items="types"
              v-model="localType"
              label="Service type"
              outlined
              clearable
              dense
              color="primary"
              style="width: 120px"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </td>
          <td>
            <v-select
              :items="priceList"
              v-model="localPrice"
              label="MRC ($)"
              outlined
              clearable
              dense
              color="primary"
              style="width: 160px"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </td>
          <td>
            <v-select
              :items="speedList"
              v-model="localSpeed"
              label="Speed"
              outlined
              clearable
              dense
              color="primary"
              style="width: 240px"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </td>
          <td>
            <v-select
              :items="termsList"
              v-model="localContractTerm"
              label="Contract term"
              outlined
              clearable
              dense
              color="primary"
              style="width: 240px"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </td>
          <td>
            <v-select
              :items="discountList"
              v-model="localDiscount"
              label="Discount"
              outlined
              clearable
              dense
              color="primary"
              style="width: 240px"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </td>
        </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script>

export default {
  name: 'ServiceFilters',

  props: ['type', 'speed', 'price', 'discount', 'contractTerm'],

  data: () => ({
    ready: false,
    types: ['residential', 'commercial'],
    priceList: [],
    termsList: [],
    discountList: [],
    speedList: []
  }),

  computed: {
    localType: {
      get () {
        return this.type
      },
      set (value) {
        this.$emit('update:type', value)
      }
    },

    localSpeed: {
      get () {
        return this.speed
      },
      set (value) {
        this.$emit('update:speed', value)
      }
    },

    localPrice: {
      get () {
        return this.price
      },
      set (value) {
        this.$emit('update:price', value)
      }
    },

    localDiscount: {
      get () {
        return this.discount
      },
      set (value) {
        this.$emit('update:discount', value)
      }
    },

    localContractTerm: {
      get () {
        return this.contractTerm
      },
      set (value) {
        this.$emit('update:contractTerm', value)
      }
    }
  },

  methods: {
    getFilters (data) {
      const { priceList, speedList, termsList, discountList } = data
      Object.assign(this, { priceList, speedList, termsList, discountList })
      this.ready = true
    }
  },

  created () {
    this.__getServiceFilters(this.getFilters)
  }
}
</script>
