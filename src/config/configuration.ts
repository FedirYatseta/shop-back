export default () => ({
  port: parseInt(process.env.PORT) || 3002,
  host: process.env.HOSTNAME || 'localhost',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/admin',
  dbName: process.env.MONGODB_DB || 'test',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresInt: parseInt(process.env.JWT_EXPIRES_IN) || 3600,
  CLOUDINARY: 'Cloudinary',
  nodemailerPass: process.env.PASSWORD_NODEMAILER,
  nodemailerUser: process.env.USER_NODEMAILER,
  nodemailerPort: parseInt(process.env.PORT_NODEMAILER),
  nodemailerHost: process.env.HOST_NODEMAILER,
  supportEmail: process.env.SUPPORT_EMAIL,
});


