const {
  authController,
  adminController
} = require('../../controllers').default

export const admin = {
  init: authController.init,
  auth: authController.auth,
  reset: authController.passwordReset,
  code: authController.sendPasswordResetCode,
  change: authController.changePassword,
  admins: adminController.getAdmins,
  create: adminController.createAdmin,
  details: adminController.getAdminDetails,
  update: adminController.updateAdmin,
  remove: adminController.removeAdmin
}
