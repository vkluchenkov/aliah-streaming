const SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_SECRET;

interface SendMailProps {
  toEmail: string;
  fromEmail: string;
  senderName: string;
  toName: string;
  subject: string;
  content: string;
}

export const sendMail = (props: SendMailProps) => {
  const { toEmail, fromEmail, senderName, toName, subject, content } = props;

  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
    sender: { email: fromEmail, name: senderName },
    subject: subject,
    to: [{ email: toEmail, name: toName }],
    htmlContent: content,
  });
};
