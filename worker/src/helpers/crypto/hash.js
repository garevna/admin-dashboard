const crypto = require('crypto-js')

export const hash = data => ({ status: 200, result: crypto.SHA256(data).toString() })
