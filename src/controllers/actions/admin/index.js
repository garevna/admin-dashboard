// import { auth } from './auth'
// import { changePassword } from './changePassword'
// import { resetPassword } from './resetPassword'
// import { sendPasswordResetCode } from './sendPasswordResetCode'
//
// import { getAdmins } from './getAdmins'
// import { createAdmin } from './createAdmin'
// import { getAdminDetails } from './getAdminDetails'
// import { updateAdmin } from './updateAdmin'
//
// export {
//   auth,
//   changePassword,
//   resetPassword,
//   sendPasswordResetCode,
//
//   getAdmins,
//   createAdmin,
//   getAdminDetails,
//   updateAdmin
// }

const context = require.context('./', false)

let moduleNames = context.keys().filter(key => key !== './' && key !== './index' && key !== './index.js')

moduleNames = Array.from(new Set(moduleNames))

const modules = Object.assign({}, ...moduleNames.map(name => ({ [name.split('./').join('').split('.js').join('')]: context(name) })))

const result = Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))

export default result
