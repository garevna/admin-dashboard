// function getModules () {
//   const modules = {}
//
//   const context = require.context('./', false)
//
//   let modulesNames = context.keys()
//     .filter(key => key !== './' && key !== './index' && key !== './index.js')
//     .map(key => key.split('.js').join(''))
//
//   modulesNames = Array.from(new Set(modulesNames))
//
//   modulesNames.forEach((moduleName) => {
//     const name = moduleName.split('./').join('')
//     modules[name] = context(moduleName)
//   })
//
//   return Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))
// }
//
// export default getModules()

const context = require.context('./', false)

let moduleNames = context.keys().filter(key => key !== './' && key !== './index' && key !== './index.js')

moduleNames = Array.from(new Set(moduleNames))

const modules = Object.assign({}, ...moduleNames.map(name => ({ [name.split('./').join('').split('.js').join('')]: context(name) })))

const result = Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))

export default result
