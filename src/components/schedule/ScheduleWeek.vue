<template>
  <!-- <v-container v-if="ready"> -->
    <!-- <v-expansion-panels> -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          Week <b class="ml-2">{{ weekNumber }}</b>
          <p>
            <small>
              from <b class="week-date mx-2">{{ weekStartDate }}</b>
              to <b class="week-date ml-2">{{ weekEndDate }}</b>
            </small>
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table width="100%">
            <thead>
              <tr>
                <th width="48"><small>Day</small></th>
                <th width="120"><small>Date</small></th>
                <th width="240">AM</th>
                <th width="240">PM</th>
                <th width="240">Afterhours</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, data) of weekData" :key="data">
                <td><small><b>{{  }}</b></small></td>
                <td><small>{{ data }}</small></td>
                <td>
                  <v-card-text v-for="record of weekData[data].am" :key="record._id" class="schedule-lot">
                    <v-btn text small @click="showCustomerDetails(record)">
                      <v-icon small color="#999"> mdi-account-box </v-icon>
                      {{ record.customer.uniqueCode }}
                    </v-btn>

                    <v-menu offset-y v-if="record.status === 'Awaiting for confirmation' || record.status === 'Awaiting confirmation'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn text small v-bind="attrs" v-on="on">
                          <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
                          {{ record.status }}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="confirm(data, record)">
                          <v-list-item-title>
                            Confirm
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="reject(data, record)">
                          <v-list-item-title>
                            Reject
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-btn text small v-else>
                      <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
                      {{ record.status }}
                    </v-btn>
                  </v-card-text>
                </td>
                <td>
                  <v-card-text v-for="record of weekData[data].pm" :key="record._id" class="schedule-lot">
                    <v-btn text small @click="showCustomerDetails(record)">
                      <v-icon small color="#999"> mdi-account-box </v-icon>
                      {{ record.customer.uniqueCode }}
                    </v-btn>

                    <v-menu offset-y v-if="record.status === 'Awaiting for confirmation' || record.status === 'Awaiting confirmation'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn text small v-bind="attrs" v-on="on">
                          <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
                          {{ record.status }}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="confirm(data, record)">
                          <v-list-item-title>
                            Confirm
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="reject(data, record)">
                          <v-list-item-title>
                            Reject
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-btn text v-else>
                      <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
                      {{ record.status }}
                    </v-btn>
                  </v-card-text>
                </td>
                <td>
                  <v-card-text v-for="record of weekData[data].afterhours" :key="record._id" class="schedule-lot">
                    <v-btn text small @click="showCustomerDetails(record)">
                      <v-icon small color="#999"> mdi-account-box </v-icon>
                      {{ record.customer.uniqueCode }}
                    </v-btn>

                    <v-menu offset-y v-if="record.status === 'Awaiting for confirmation' || record.status === 'Awaiting confirmation'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn text small v-bind="attrs" v-on="on">
                          <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
                          {{ record.status }}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="confirm(data, record)">
                          <v-list-item-title>
                            Confirm
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="reject(data, record)">
                          <v-list-item-title>
                            Reject
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-btn text v-else>
                      <v-icon small :color="getIcon(record.status).color"> {{ getIcon(record.status).icon }} </v-icon>
                      {{ record.status }}
                    </v-btn>
                  </v-card-text>
                </td>
              </tr>
            </tbody>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    <!-- </v-expansion-panels> -->
  <!-- </v-container> -->
</template>

<script>

export default {
  name: 'ScheduleWeek',
  props: ['weekNumber', 'weekData', 'changedRecord'],
  data: () => ({
    records: null,
    ready: false,
    tableRowsHeaders: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    tableColsHeaders: ['AM', 'PM', 'After hours']
  }),
  computed: {
    weekStartDate () {
      if (!this.weekNumber) return ''
      return this.getWeekStartDateByWeekNumber(this.weekNumber)
    },
    weekEndDate () {
      if (!this.weekNumber) return ''
      return this.getWeekEndDateByWeekNumber(this.weekNumber)
    }
  },
  methods: {
    showCustomerDetails (record) {
      this.$root.$emit('open-customer-info-popup', {
        name: `${record.customer.firstName} ${record.customer.lastName}`,
        address: `${record.customer.apartmentNumber}/${record.customer.address}`,
        phone: record.customer.phoneMobile || record.customer.phoneWork
      })
    },

    confirm (date, record) {
      if (record.status === 'In job queue') return
      const lot = record.lots.find(item => item.date === date)
      this.$emit('update:changedRecord', Object.assign({}, record, {
        status: 'In job queue',
        installation: {
          date,
          period: lot.period,
          message: lot.message || ''
        }
      }))
    },

    reject (date, record) {
      if (record.status === 'In job queue') return
      const lot = record.lots.find(item => item.date !== date)
      this.$emit('update:changedRecord', Object.assign({}, record, {
        lots: lot ? [lot] : []
      }))
    },

    currentDate (index) {
      return new Date(Date.parse(this.weekStartDate) + 1000 * 60 * 60 * 24 * index).toISOString().slice(0, 10)
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
    // console.log(this.weekData)
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
