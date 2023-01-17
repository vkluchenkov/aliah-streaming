import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import path from 'node:path';
import * as fsp from 'node:fs/promises';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const dir = process.env.NODE_ENV === 'production' ? '/data' : process.env.DEV_DATA_DIR!;
  const savedPin = await fsp.readFile(path.join(dir, 'pin'), { encoding: 'utf-8' });

  const isValid = await bcrypt.compare(req.body.pin, savedPin);

  if (isValid) res.status(200).send('Ok');
  else res.status(401).send({ message: 'Unauthorized' });
};

export default handler;
