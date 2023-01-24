import { NextApiRequest, NextApiResponse } from 'next';
import { getNewPin } from '../../src/auth/getNewPin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  getNewPin()
    .then((data) => res.status(200).send('Ok'))
    .catch((error: any) => res.status(500).send(error.message));
};

export default handler;
