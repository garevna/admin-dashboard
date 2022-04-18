<template>
  <v-sheet color="transparent" height="480" class="mt-8">
    <h5 class="text-center">
      <small>{{ title }}</small>
    </h5>
    <GChart
      type="MapChart"
      mapsApiKey="AIzaSyBVql75Qc_Y5oGvrxdcNRNMhBlZEzTdk1o"
      :data="mapChartData"
      :options="options"
      style="height: 480px"
    />
  </v-sheet>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  name: 'DiagramBuildings',

  components: {
    GChart
  },

  props: ['overviewData', 'title'],

  data: () => ({
    mapChartData: [
      ['Lng', 'Lat', 'Connections']
    ],
    options: {
      mapType: 'silver',
      zoomLevel: 15,
      showTooltip: true,
      showInfoWindow: false,
      useMapTypeControl: false,
      mapTypeIds: ['silver'],
      maps: {
        styledMap: {
          name: 'Silver Map',
          styles: [
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ffffff' }, { lightness: 17 }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#707070' }, { lightness: 29 }, { weight: 0.2 }]
            },
            {
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }, { lightness: 18 }]
            },
            {
              featureType: 'road.local',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }, { lightness: 16 }]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }, { lightness: 21 }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#dedede' }, { lightness: 21 }]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }]
            },
            {
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#f2f2f2' }, { lightness: 19 }]
            },
            {
              featureType: 'administrative',
              elementType: 'geometry.fill',
              stylers: [{ color: '#fefefe' }, { lightness: 20 }]
            },
            {
              featureType: 'administrative',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }]
            }
          ]
        }
      }
    }
  }),

  methods: {
    //
  },

  mounted () {
    console.log(this.overviewData)
    // for (const record of this.overviewData) {
    //   this.mapChartData.push(record.coordinates[1], record.coordinates[0], record.connections.)
    // }
  }
}
</script>
