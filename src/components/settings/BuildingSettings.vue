<template>
  <v-card flat class="transparent mx-auto" max-width="700">
    <table>
      <tbody>
        <tr>
          <td width="600">
            <v-tabs
              v-model="tab"
              align-with-title
              dark
              color="#fff"
            >
              <v-tabs-slider color="#fff"></v-tabs-slider>

              <v-tab v-for="item in items" :key="item.title" class="transparent">
                <b>{{ item.title }}</b>
              </v-tab>
            </v-tabs>
          </td>
          <td>
            <v-btn v-if="accessRights === 2" dark class="primary ml-12" @click="save()" text>
              Save
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>

    <v-tabs-items v-model="tab" class="transparent">
      <v-tab-item v-for="item in items" :key="item.title">
        <ListEditor :title="item.title" :list.sync="item.list" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>

import { roleHandler, accessRightsHandler } from '@/controllers/data-handlers'

export default {
  name: 'BuildingSettings',

  components: {
    ListEditor: () => import('@/components/settings/ListEditor.vue')
  },

  data: () => ({
    accessRights: accessRightsHandler().access[roleHandler()].settings,
    tab: 0,
    items: [
      {
        title: 'Building class',
        list: null
      },
      {
        title: 'Building type',
        list: null
      },
      {
        title: 'Established/new',
        list: null
      }
    ]
  }),

  computed: {
    ready () {
      return this.buildingClass && this.buildingType && this.buildingCategory
    }
  },

  methods: {
    getBuildingSettings (data) {
      this.items[0].list = data.buildingClass
      this.items[1].list = data.buildingType
      this.items[2].list = data.buildingCategory
    },

    callback (response) {
      //
    },

    save () {
      const [buildingClass, buildingType, buildingCategory] = this.items.map(item => item.list)

      this.__updateBuildingSettings({ buildingClass, buildingType, buildingCategory }, this.callback)
    }
  },

  mounted () {
    this.__getBuildingSettings(this.getBuildingSettings)
  }
}
</script>
