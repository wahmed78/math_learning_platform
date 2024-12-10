export class CryptoProvider {
  encrypt(data, key) {
    const encrypted = btoa(JSON.stringify({ data, key })); // Simple base64 encoding
    return encrypted;
  }

  decrypt(encrypted, key) {
    const decoded = JSON.parse(atob(encrypted));
    if (decoded.key !== key) {
      throw new Error('Invalid decryption key');
    }
    return decoded.data;
  }
}