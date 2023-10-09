export const getKey = (keys, keywords) => keys.find(key => keywords.filter(keyword => key.toLowerCase().indexOf(keyword) !== -1).length === keywords.length)
