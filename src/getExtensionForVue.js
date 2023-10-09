import {
  getWeekNumber,
  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
} from 'garevna-date-functions'

export function getExtensionForVue () {
  return {
    $releaseDate: document.documentElement.dataset.buildTimestampUtc,
    getWeekNumber,
    getWeekStartDateByWeekNumber,
    getWeekEndDateByWeekNumber,
    getWeekDatesByWeekNumber,
    __getReleaseDate: () => document.documentElement.dataset.buildTimestampUtc,
    __openExternalLink: url => window.open(url, '_blank'),
    __roundFloat: number => Math.round((number + Number.EPSILON) * 100) / 100,
    __clone: object => JSON.parse(JSON.stringify(object)),
    __removeGoogleMaps: function () {
      Array.from(document.getElementsByTagName('script'))
        .filter(script => script.src.indexOf('https://maps.googleapis.com') === 0)
        .forEach(script => script.remove())
      window.google = null
    }
  }
}
