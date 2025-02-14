export const basicEncrypt = (data: string) => {
  if (!process.env.ENCRYPT_KEY) {
    throw new Error('Parameter ENCRYPT_KEY must be set!');
  }

  const base64Data = Buffer.from(data).toString('base64');

  const result = process.env.ENCRYPT_KEY + base64Data;

  return Buffer.from(result).toString('base64');
};
