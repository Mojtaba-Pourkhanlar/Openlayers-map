// encryption.js
import CryptoJS from "crypto-js";

const generateRandomKey = () => {
  // Generate a random key using CryptoJS
  const randomKey = CryptoJS.lib.WordArray.random(128 / 8);
  return CryptoJS.enc.Hex.stringify(randomKey);
};

const secretKey = generateRandomKey();

const encrypt = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  return ciphertext;
};

const decrypt = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export { encrypt, decrypt, secretKey };
