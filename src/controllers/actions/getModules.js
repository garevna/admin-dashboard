// export function getModules (folder) {
//   const modules = {}
//   const path = `./${folder}`
//
//   const context = require.context(path, false)
//
//   let modulesNames = context.keys()
//     .filter(key => key !== path && key !== `${path}/index` && key !== `${path}/index.js`)
//     .map(key => key.split('.js').join(''))
//
//   modulesNames = Array.from(new Set(modulesNames))
//
//   modulesNames.forEach((moduleName) => {
//     const name = moduleName.split(path).join('')
//     modules[name] = context(moduleName)
//   })
//
//   return Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))
// }
