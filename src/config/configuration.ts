export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    postgres: {
      url: process.env.DB_POSTGRES,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
  },
  email: {
    host: process.env.EMAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
  },
});
