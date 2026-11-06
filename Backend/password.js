import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64);

  return `scrypt$${salt}$${hash.toString('hex')}`;
}

export async function verifyPassword(password, storedHash) {
  const [algorithm, salt, hashHex] = storedHash.split('$');

  if (algorithm !== 'scrypt' || !salt || !/^[a-f0-9]{128}$/i.test(hashHex ?? '')) {
    return false;
  }

  const expectedHash = Buffer.from(hashHex, 'hex');
  const actualHash = await scrypt(password, salt, expectedHash.length);

  return timingSafeEqual(expectedHash, actualHash);
}
