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
          <td width="120" style="padding: 0 16px" v-if="approved">
            <h6>Updated</h6>
          </td>
          <td width="120" style="padding: 0 16px" v-if="approved">
            <h6>Approve updates</h6>
          </td>
          <td width="120" style="padding: 0 16px" v-if="approved">
            <h6>Reject updates</h6>
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
              :disabled="Boolean(item.updated)"
            />
          </td>

          <td v-if="approved" class="text-center">
            <small v-if="item.updated"> {{ item.updated }} </small>
            <!-- <v-icon v-if="item.updated" color="#09b"> mdi-check-circle-outline </v-icon> -->
          </td>

          <td v-if="approved" class="text-center">
            <v-btn small text v-if="item.updated" color="#777" @click="confirmUpdates(propName)">
              ok
              <!-- <v-icon> mdi-bookmark-check-outline </v-icon> -->
            </v-btn>
          </td>

          <td v-if="approved" class="text-center">
            <v-btn small text v-if="item.updated" color="#999" @click="rejectUpdates(propName)">
              <v-icon> mdi-close </v-icon>
            </v-btn>
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
    sourceData: Object,
    step: String,
    title: String,
    approved: Boolean
  },

  data: () => ({
    ready: true,
    selected: []
  }),

  computed: {
    schema () {
      return this.sourceData[this.step]
    }
  },

  watch: {
    sourceData: {
      deep: true,
      handler (data) {
        // console.log('SOURCE DATA CHANGED:\n', data)
      }
    },
    schema: {
      deep: true,
      handler (data) {
        // console.log('SCHEMA CHANGED:\n', data)
      }
    }
  },

  methods: {
    rejectUpdates (propName) {
      this.ready = false
      this.$root.$emit('reject-update', {
        section: this.step,
        field: propName
      })
      this.$nextTick(() => { this.ready = true })
    },

    confirmUpdates (propName) {
      this.ready = false
      this.$root.$emit('confirm-update', {
        section: this.step,
        field: propName
      })
      this.$nextTick(() => { this.ready = true })
    }
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
