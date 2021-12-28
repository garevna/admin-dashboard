<template>
  <v-card flat class="transparent mx-auto" max-width="700" v-if="ready">
    <table>
      <thead>
        <tr style="background: #eee">
          <td colspan="2" style="padding: 0 16px">
            <h5><small>{{ title }}</small></h5>
          </td>
          <td width="120" style="padding: 0 16px" v-if="approved">
            <h6>Update needed</h6>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, propName) in schema"
          :key="propName"
        >
          <td width="180">
            <h6 class="text-right mr-4">{{ item.title }}</h6>
          </td>
          <td width="400">
            <div class="bordered-item">
              <small style="user-select: text !important">{{ item.value || '...' }}</small>
            </div>
          </td>
          <td v-if="approved">
            <v-checkbox
              v-model="item.selected"
              hide-details
              style="margin-top: 0!important"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script>

export default {
  name: 'CompanyDetailsStep',

  props: {
    data: Object,
    step: String,
    title: String,
    approved: Boolean
  },

  data: () => ({
    ready: false,
    schema: {},
    selected: []
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
    }
  },

  methods: {
    //
  }
}
</script>

<style scoped>

.bordered-item {
  border: solid 1px #ddd;
  padding: 4px 8px;
  border-radius: 4px;
  user-select: text !important;
}
</style>
