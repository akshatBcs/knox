import CryptoJS from 'crypto-js';


const ENCRYPTION_KEY = '2e35f242a46d67eeb74aabc37d5e5d05';
const IV_LENGTH = 16; // Use 128-bit IV for AES encryption

// Convert a JSON object to a string and encrypt it
export function encryptObject(obj) {
  const plaintext = JSON.stringify(obj);
  const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
  const ciphertext = CryptoJS.AES.encrypt(plaintext, ENCRYPTION_KEY, { iv }).toString();
  //console.log(iv)
  return { iv: iv.toString(), ciphertext };
}

// Decrypt a string and convert it to a JSON object
export function decryptToObject(ciphertextObj) {
  const iv = CryptoJS.enc.Hex.parse(ciphertextObj.iv);
  const ciphertext = ciphertextObj.ciphertext;
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY, { iv });
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
}