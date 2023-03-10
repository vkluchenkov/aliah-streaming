import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import * as fsp from 'node:fs/promises';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { NODE_ENV, JWT_SECRET, DEV_DATA_DIR } = process.env;

  const dir = process.env.NODE_ENV === 'production' ? '/data' : DEV_DATA_DIR!;
  const savedPin = await fsp.readFile(path.join(dir, 'pin'), { encoding: 'utf-8' });

  const isValid = await bcrypt.compare(req.body.pin, savedPin);

  if (isValid) {
    const token = jwt.sign(
      { pin: savedPin },
      NODE_ENV === 'production' ? JWT_SECRET! : 'dev-secret',
      {
        expiresIn: '7 days',
      }
    );
    res.status(200).send(token);
  } else res.status(401).send({ message: 'Unauthorized' });
};

export default handler;
