import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      add: 'mdi-note-plus',
      buildings: 'mdi-home-city-outline',
      chat: 'mdi-account-voice',
      delete: 'mdi-trash-can',
      dropdown: 'mdi-menu-down',
      edit: 'mdi-pencil',
      error: 'mdi-alert',
      externalLink: 'mdi-open-in-new',
      list: 'mdi-view-list',
      menu: 'mdi-dots-vertical',
      message: 'mdi-android-messages',
      orders: 'mdi-printer',
      pdf: 'mdi-file-pdf',
      pageNext: 'mdi-page-next-outline',
      pagePrev: 'mdi-page-previous-outline',
      send: 'mdi-send',
      services: 'mdi-apps-box'
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#881F1A',
        secondary: '#E82F37',
        buttons: '#881F1A',
        buttonActive: '#882F1A',
        homefone: '#FBFBFB',
        accent: '#f3f3f3',
        inputs: '#EFEFEF',
        activefield: '#D9D9D9',
        warning: '#FAFF00',
        info: '#fbfbfb'
      },
      dark: {
        primary: '#881F1A',
        secondary: '#E82F37',
        buttons: '#881F1A',
        buttonActive: '#882F1A',
        homefone: '#FBFBFB',
        accent: '#f3f3f3',
        inputs: '#EFEFEF',
        activefield: '#D9D9D9',
        warning: '#FAFF00',
        info: '#fbfbfb'
      }
    }
  }
})
