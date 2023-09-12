import { PUBLIC_SECRET_KEY } from "$env/static/public";
import CryptoES from "crypto-es";

export const encrypt = async (value: string) => {
  try {
    const encrypted = CryptoES.AES.encrypt(value, PUBLIC_SECRET_KEY);
    return encrypted.toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return "Encryption failed. Please try again.";
  }
};

export const decrypt = async (value: string) => {
  try {
    const decrypted = CryptoES.AES.decrypt(value, PUBLIC_SECRET_KEY);
    return decrypted.toString(CryptoES.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return "Decryption failed. Please check the input value.";
  }
};