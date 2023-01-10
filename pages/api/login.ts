import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const savedPin = process.env.PIN!;

  if (req.body.pin == savedPin) res.status(200).send('Ok');
  else res.status(401).send({ message: 'Unauthorized' });
};

export default handler;
