/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
const crypto = require('crypto');

export const runtime = 'nodejs';
// Şifre hash'leme fonksiyonu
export async function hashPassword(password: string): Promise<{ salt: string; hash: string }> {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash:any = await crypto.scrypt(password, salt, 64, { N: 16384 } as any);
  return { salt, hash: hash.toString('hex') };
}

// Şifre doğrulama fonksiyonu
export async function verifyPassword(storedHash: string, storedSalt: string, providedPassword: string): Promise<boolean> {
  const hash:any = await crypto.scrypt(providedPassword, storedSalt, 64, { N: 16384 } as any);
  const storedHashBuffer = Buffer.from(storedHash, 'hex');
  return crypto.timingSafeEqual(hash, storedHashBuffer);
}