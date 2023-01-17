import bcrypt from 'bcryptjs';
import path from 'node:path';
import * as fsp from 'node:fs/promises';

const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();

export const getNewPin = async () => {
  const dir = process.env.NODE_ENV === 'production' ? '/data' : process.env.DEV_DATA_DIR!;

  const pin = generatePin();
  const hashed = await bcrypt.hash(pin, 10);

  // Delete all folder content if any
  const dirContent = await fsp.readdir(dir);
  if (dirContent.length) dirContent.forEach(async (file) => await fsp.unlink(path.join(dir, file)));

  // Write pin hash as a file in data folder
  const file = await fsp.writeFile(path.join(dir, 'pin'), hashed);

  // Send new pin
  console.log(pin);
};
