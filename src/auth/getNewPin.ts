import bcrypt from 'bcryptjs';
import path from 'node:path';
import * as fsp from 'node:fs/promises';
import { sendMail } from '../email/sendMail';

const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();

export const getNewPin = async () => {
  const dir = process.env.NODE_ENV === 'production' ? '/data' : process.env.DEV_DATA_DIR!;

  const pin = generatePin();
  const hashed = await bcrypt.hash(pin, 10);

  // Delete all folder content if any
  const dirContent = await fsp.readdir(dir);
  if (dirContent.length) dirContent.forEach(async (file) => await fsp.unlink(path.join(dir, file)));

  // Write pin hash as a file in data folder
  await fsp.writeFile(path.join(dir, 'pin'), hashed);

  // Send new pin
  if (process.env.NODE_ENV === 'production') {
    const fromEmail = process.env.ADMIN_EMAIL!;
    const senderName = process.env.ADMIN_NAME!;
    const toEmail = process.env.NOTIFICATIONS_RECEIVER!;
    const mailContent = `<html>
    <body>
    <h3>Your new pin is ${pin}</h3>
    </body>
    </html>`;

    sendMail({
      fromEmail: fromEmail,
      senderName: senderName,
      toEmail: toEmail,
      toName: 'Aliah',
      subject: 'New PIN for Aliah team online',
      content: mailContent,
    });
  } else console.log(pin);
};
