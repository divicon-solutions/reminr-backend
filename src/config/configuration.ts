export default () => ({
  port: parseInt(process.env.PORT, 10) || 5001,
  mailGun: {
    apiKey: process.env.MG_API_KEY,
    domain: process.env.MG_DOMAIN,
    receiverEmails: process.env.MG_RECEIVER_EMAILS?.split(',') ?? [],
  },
});
