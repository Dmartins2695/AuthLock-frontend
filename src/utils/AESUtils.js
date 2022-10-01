const CryptoJS = require('crypto-js')

const _keySize = 256
const _ivSize = 128
const _iterationCount = 1989

const generateKey = (salt, passPhrase) => {
  return CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
    keySize: _keySize / 32,
    iterations: _iterationCount
  })
}

const encryptWithIvSalt = (salt, iv, passPhrase, plainText) => {
  let key = generateKey(salt, passPhrase)
  let encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: CryptoJS.enc.Hex.parse(iv)
  })
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}

const decryptWithIvSalt = (salt, iv, passPhrase, cipherText) => {
  let key = generateKey(salt, passPhrase)
  let cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  })
  let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: CryptoJS.enc.Hex.parse(iv)
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export const encrypt = (passPhrase, plainText) => {
  let iv = CryptoJS.lib.WordArray.random(_ivSize / 8).toString(CryptoJS.enc.Hex)
  let salt = CryptoJS.lib.WordArray.random(_keySize / 8).toString(CryptoJS.enc.Hex)
  let ciphertext = encryptWithIvSalt(salt, iv, passPhrase, plainText)
  return salt + iv + ciphertext
}

export const decrypt = (passPhrase, cipherText) => {
  let ivLength = _ivSize / 4
  let saltLength = _keySize / 4
  let salt = cipherText.substr(0, saltLength)
  let iv = cipherText.substr(saltLength, ivLength)
  let encrypted = cipherText.substring(ivLength + saltLength)
  return decryptWithIvSalt(salt, iv, passPhrase, encrypted)
}
