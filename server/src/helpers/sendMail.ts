import sendMail from 'sendmail';

export const sendMailOptions = sendMail({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
  silent: true,
  smtpHost: 'localhost',
  smtpPort: 1025,
});
