import { NextApiRequest, NextApiResponse } from 'next';
import { getNewPin } from '../../src/auth/getNewPin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await getNewPin();
  res.status(200).send('Ok');
};

export default handler;
