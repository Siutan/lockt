import { createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-cbc';

export async function encrypt(secret: string, key: string, salt: string) {
  const cipher = createCipheriv(algorithm, key, salt);
  let encrypted = cipher.update(secret, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export async function decrypt(secret: string, key: string, salt: string) {
  const decipher = createDecipheriv(algorithm, key, salt);
  let decrypted = decipher.update(secret, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
