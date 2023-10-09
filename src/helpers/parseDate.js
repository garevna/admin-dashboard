const validate = date => date.indexOf('/') !== -1 ? date.split('/').reverse().join('-') : date

export const parseDate = date => date && typeof date === 'string'
  ? new Date(validate(date)).toString() === 'Invalid Date'
    ? ''
    : new Date(validate(date)).toISOString().slice(0, 10)
  : ''
