export const formatTime = ms => new Date(ms).toLocaleTimeString()

export const formatRecord = record => Object.assign({}, record, { created: formatTime(record.created) })
