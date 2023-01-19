import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as fsp from 'node:fs/promises';
import path from 'node:path';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { NODE_ENV, JWT_SECRET, DEV_DATA_DIR } = process.env;
  const token = req.body.token;
  const secret = NODE_ENV === 'production' ? JWT_SECRET! : 'dev-secret';
  const dir = process.env.NODE_ENV === 'production' ? '/data' : DEV_DATA_DIR!;
  const savedPin = await fsp.readFile(path.join(dir, 'pin'), { encoding: 'utf-8' });

  const payload = jwt.verify(token, secret);

  if (payload) {
    const { pin } = payload as JwtPayload;
    const isMatch = pin === savedPin;
    if (isMatch) res.status(200).send('Ok');
    else res.status(401).send({ message: 'Unauthorized' });
  } else res.status(401).send({ message: 'Unauthorized' });
};

export default handler;
