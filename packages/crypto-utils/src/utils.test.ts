import { describe, it, expect, beforeEach } from 'vitest';
import { basicEncrypt } from './utils';

describe('basicEncrypt', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, ENCRYPT_KEY: 'testkey' };
  });

  it('should throw an error if ENCRYPT_KEY is not set', () => {
    process.env.ENCRYPT_KEY = undefined;
    expect(() => basicEncrypt('test')).toThrow(
      'Parameter ENCRYPT_KEY must be set!',
    );
  });

  it('should encrypt data correctly', () => {
    const data = 'hello';
    const encrypted = basicEncrypt(data);

    expect(encrypted).toBeTruthy();
    expect(encrypted).not.toBe(data);

    // Validating if decoding works as expected
    const decoded = Buffer.from(encrypted, 'base64').toString();
    expect(decoded.startsWith(process.env.ENCRYPT_KEY!)).toBe(true);
  });
});
