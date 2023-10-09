import {
  init,
  encrypt,
  decrypt,
  hash
} from '../helpers/crypto'

class CryptoController {
  init (request) {
    self.postMessage(init(request.data))
  }

  encrypt (request) {
    self.postMessage(encrypt(request.source))
  }

  decrypt (request) {
    self.postMessage(decrypt(request.source))
  }

  hash (request) {
    self.postMessage(hash(request.source))
  }
}

export const cryptoController = new CryptoController()
