const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const NUM = "23456789";
const SYM = "!@#$%^&*-_=+";

export function generatePassword(length = 16): string {
  const len = Math.min(64, Math.max(8, length));
  const pool = ALPHA + NUM + SYM;
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < len; i++) out += pool[bytes[i] % pool.length];
  // Ensure mix
  return out;
}
