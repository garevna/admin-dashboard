<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="480"
    >
      <v-card>
        <v-card-title class="grey lighten-2">
          <h5><small>Connection info</small></h5>
          <v-spacer />
          <v-icon large @click="dialog = false"> mdi-close </v-icon>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-4">
          <table>
            <tbody>
              <tr>
                <td width="120" class="text-center"> Login </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td class="text-right pr-2"> PPPOE </td>
                <td width="240">
                  <v-text-field hide-details outlined dense v-model="connectionData.Login.PPPOE" />
                </td>
              </tr>
              <tr>
                <td></td>
                <td class="text-right pr-2"> IPoE </td>
                <td width="240">
                  <v-text-field hide-details outlined dense v-model="connectionData.Login.IPoE" />
                </td>
              </tr>

              <v-divider />

              <tr>
                <td width="120" class="text-center"> PWD </td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td></td>
                <td class="text-right pr-2"> PPPOE </td>
                <td>
                  <v-text-field hide-details outlined dense v-model="connectionData.PWD.PPPOE" />
                </td>
              </tr>
              <tr>
                <td></td>
                <td class="text-right pr-2"> IPoE </td>
                <td>
                  <v-text-field hide-details outlined dense v-model="connectionData.PWD.IPoE" />
                </td>
              </tr>

              <v-divider />

              <tr>
                <td width="120"></td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td colspan="2" class="text-right pr-2"> Speed In </td>
                <td>
                  <v-text-field hide-details outlined dense v-model="connectionData['Speed In']" />
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-right pr-2"> Speed Out </td>
                <td>
                  <v-text-field hide-details outlined dense v-model="connectionData['Speed Out']" />
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-right pr-2"> IP </td>
                <td>
                  <v-text-field hide-details outlined dense v-model="connectionData.IP" />
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-right pr-2"> Routed subnet </td>
                <td>
                  <v-text-field hide-details outlined dense v-model="connectionData['Routed subnet']" />
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-right pr-2"> VLAN DGtek </td>
                <td>
                  <v-text-field hide-details outlined dense v-model="connectionData['VLAN DGtek']" />
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-right pr-2"> VLAN RSP </td>
                <td>
                  <v-text-field hide-details outlined dense v-model="connectionData['VLAN RSP']" />
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>

        <v-card-text class="text-center">
          <v-btn
            color="primary"
            outlined
            text
            @click="submit"
            class="mx-auto my-4"
          >
            Submit
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

const newConnectionData = {
  Login: {
    PPPOE: 'CRN@RSP',
    IPoE: 'port@fttp.dgtek.net'
  },
  PWD: {
    PPPOE: '',
    IPoE: ''
  },
  'Speed In': '',
  'Speed Out': '',
  IP: '',
  'Routed subnet': '',
  'VLAN DGtek': '',
  'VLAN RSP': ''
}

export default {
  name: 'ConnectionDataForActivation',

  props: ['opened', 'data', 'submitted'],

  data: () => ({
    connectionData: JSON.parse(JSON.stringify(newConnectionData))
  }),

  computed: {
    dialog: {
      get () {
        return this.opened
      },
      set (val) {
        this.$emit('update:opened', val)
      }
    }
  },

  methods: {
    submit () {
      this.$emit('update:data', this.connectionData)
      this.$emit('update:submitted', true)
      this.dialog = false
    }
  },

  mounted () {
    this.data && Object.assign(this.connectionData, this.data)
  }
}
</script>
