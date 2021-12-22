<template>
  <v-row>
    <v-select
      :items="customersList"
      label="Unique code"
      v-model="localCustomer"
      item-text="uniqueCode"
      item-value="customerId"
      outlined
      dense
      clearable
      :menu-props="{ bottom: true, offsetY: true }"
      style="max-width: 220px"
    ></v-select>

    <v-select
      :items="customersList"
      label="Address"
      v-model="localCustomer"
      item-text="address"
      item-value="customerId"
      outlined
      dense
      clearable
      :menu-props="{ bottom: true, offsetY: true }"
      style="width: 320px"
    ></v-select>

    <v-select
      :items="severities"
      label="Severity"
      v-model="localSeverity"
      outlined
      dense
      clearable
      :menu-props="{ bottom: true, offsetY: true }"
      style="max-width: 160px"
    ></v-select>

    <v-select
      :items="priorities"
      label="Priority"
      v-model="localPriority"
      outlined
      clearable
      dense
      :menu-props="{ bottom: true, offsetY: true }"
      style="max-width: 160px"
    ></v-select>
  </v-row>
</template>

<script>

export default {
  name: 'Filters',

  props: ['customersList', 'customer', 'severity', 'priority'],

  data: () => ({
    severities: ['Low', 'Medium', 'Hight'],
    priorities: ['Low', 'Medium', 'Hight']
  }),

  computed: {
    localSeverity: {
      get () {
        return this.severity
      },
      set (val) {
        this.$emit('update:severity', val)
      }
    },
    localPriority: {
      get () {
        return this.priority
      },
      set (val) {
        this.$emit('update:priority', val)
      }
    },
    localCustomer: {
      get () {
        return this.customer
      },
      set (val) {
        this.$emit('update:customer', val)
      }
    }
  }
}
</script>
