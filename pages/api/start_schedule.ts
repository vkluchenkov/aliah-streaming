import { NextApiRequest, NextApiResponse } from 'next';
import { ToadScheduler, SimpleIntervalJob, AsyncTask } from 'toad-scheduler';
import { getNewPin } from '../../src/auth/getNewPin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const scheduler = new ToadScheduler();

    const newPinTask = new AsyncTask('new pin', getNewPin);
    const newPinJob = new SimpleIntervalJob({ seconds: 10, runImmediately: true }, newPinTask, {
      id: 'id_1',
      preventOverrun: true,
    });

    scheduler.addSimpleIntervalJob(newPinJob);
    res.status(200).send('ok');
  }
};

export default handler;
