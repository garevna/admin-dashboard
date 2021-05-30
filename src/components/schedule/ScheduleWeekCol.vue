<template>
  <v-card flat class="transparent ma-0 pa-0">
    <v-card-text
      v-for="record of records"
      :key="record._id"
      class="schedule-lot"
    >
      <v-btn text small @click="showCustomerDetails(record)">
        <v-icon small color="#999"> mdi-account-box </v-icon>
        {{ record.customer.uniqueCode }}
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small v-bind="attrs" v-on="on">
            <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
            {{ record.status }}
          </v-btn>
        </template>
        <v-list v-if="record.status === 'Awaiting for confirmation' || record.status === 'Awaiting confirmation'">
          <v-list-item @click="confirm(record)">
            <v-list-item-title>
              Confirm
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="reject(record)">
            <v-list-item-title>
              Reject
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="activate(record)">
            <v-list-item-title>
              Activate service
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list v-if="record.status === 'In job queue'">
          <!-- <v-list-item @click="reject(record)">
            <v-list-item-title>
              Reject installation
            </v-list-item-title>
          </v-list-item> -->
          <v-list-item @click="activate(record)">
            <v-list-item-title>
              Activate service
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-btn text small>
        <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
        {{ record.status }}
      </v-btn> -->
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'ScheduleWeekCol',
  props: ['date', 'period', 'records'],
  data: () => ({}),
  methods: {
    showCustomerDetails (record) {
      this.$root.$emit('open-customer-info-popup', {
        name: `${record.customer.firstName} ${record.customer.lastName}`,
        address: `${record.customer.apartmentNumber}/${record.customer.address}`,
        phone: record.customer.phoneMobile || record.customer.phoneWork
      })
    },

    confirm (record) {
      console.log('CONFIRMATION:\n', record)
      if (record.status === 'In job queue') return
      const lot = record.lots.find(item => item.date === this.date)

      const { _id, resellerId, customerId, serviceId, lots } = record

      this.__putRecordToJobQueue(Object.assign({}, {
        _id,
        resellerId,
        customerId,
        serviceId,
        lots,
        status: 'In job queue',
        modified: Date.now(),
        installation: {
          date: this.date,
          period: this.period,
          message: lot.message || ''
        }
      }))
    },

    activate (record) {
      if (record.status !== 'In job queue') return
      console.log(record)
      this.__activateService(record)
    },

    reject (record) {
      // if (record.status === 'In job queue') return
      // const lot = record.lots.find(item => item.date !== this.date)
      //
      // this.__updateScheduleRecordStatus(Object.assign({}, record, {
      //   status: 'Awaiting for scheduling',
      //   modified: Date.now(),
      //   lots: []
      // }))
    },

    getIcon (status) {
      const icons = {
        Active: 'mdi-check-network-outline',
        'Awaiting for connection': 'mdi-calendar-question',
        'Awaiting for confirmation': 'mdi-calendar-clock',
        'Awaiting confirmation': 'mdi-calendar-clock',
        'Awaiting for scheduling': 'mdi-calendar-question',
        'In job queue': 'mdi-calendar-check',
        'Unable to connect': 'mdi-minus-network',
        'Not connected': 'mdi-alert'
      }
      const colors = {
        Active: '#999',
        'Awaiting for connection': '#999',
        'Awaiting for confirmation': 'primary',
        'Awaiting confirmation': 'primary',
        'Awaiting for scheduling': '#999',
        'In job queue': '#999',
        'Unable to connect': '#777',
        'Not connected': '#f00'
      }
      return { icon: icons[status], color: colors[status] }
    }
  },

  mounted () {
    console.log(this.records)
  }
}
</script>

<style scoped>
table, th {
  background: #dfdfdf;
}
tbody {
  background: #fbfbfb;
}
td {
  border: solid 1px #dfdfdf;
  padding: 4px 8px;
}
/* b {
  font-weight: 900;
} */

.week-date {
  border: solid 1px #aaa;
  border-radius: 4px;
  padding: 4px 8px;
  color: #900;
}

.schedule-lot {
  border: solid 1px #ccc;
  border-radius: 4px;
}
</style>
