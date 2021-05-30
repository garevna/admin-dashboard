<template>
  <v-card flat class="transparent mx-auto" max-width="700" v-if="ready">
    <v-row
      justify="center"
      v-for="(item, propName) in schema"
      :key="propName"
      class="my-0"
      :style="{ height: rowHeight(item) + 'px' }"
    >
      <v-col cols="0" md="4" class="d-none d-md-inline-block">
        <h6 class="text-right">{{ item.title }}</h6>
      </v-col>

      <v-col cols="12" sm="8">
        <v-text-field
          v-if="textField(item)"
          v-model="item.value"
          @input="update(propName, item.value)"
          :label="item.title"
          :rules="[rules.required, rule(item)]"
          outlined
          dense
          :append-icon="appendIcon(item)"
          :type="type(item)"
          @click:append="showPassword = !showPassword"
        />

        <GeoscapeAutocomplete
          v-if="item.type === 'address'"
          :value.sync="item.value"
          style="margin-top: -14px!important; margin-bottom: 8px!important;"
        />

        <v-textarea
          v-if="item.type === 'textarea'"
          v-model="item.value"
          :label="item.title"
          hide-details
          outlined
          dense
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import { testTextField } from '@/helpers'
import { rules } from '@/configs'

export default {
  name: 'CompanyDetailsStep',
  components: {
    GeoscapeAutocomplete: () => import('@/components/inputs/GeoscapeAutocomplete.vue')
  },
  props: {
    data: Object,
    step: String
  },
  data: () => ({
    ready: false,
    schema: {},
    showPassword: false,
    rules
  }),
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler (value) {
        if (!value) return
        this.schema = value[this.step]
        this.ready = true
      }
    },
    schema: {
      deep: true,
      handler (val) {
        // console.log(val)
      }
    }
  },
  methods: {
    appendIcon (item) {
      return item.type !== 'password' ? '' : this.showPassword ? 'mdi-eye' : 'mdi-eye-off'
    },
    type (item) {
      return item.type !== 'password' || this.showPassword ? 'text' : 'password'
    },
    update (prop, value) {
      this.schema[prop].value = value
      const result = Object.assign({}, this.rspData, { [this.step]: JSON.parse(JSON.stringify(this.schema)) })
      this.$emit('update:rspData', JSON.parse(JSON.stringify(result)))
    },
    rowHeight (item) {
      return item.type === 'textarea' ? 160 : 60
    },
    textField (item) {
      return testTextField(item.type)
    },
    rule (item) {
      return this.rules[item.type]
    }
  }
}
</script>

<style scoped>
</style>
