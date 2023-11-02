export default () => ({
  port: parseInt(process.env.PORT) || 3001,
  hostname: process.env.HOSTNAME || 'localhost',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/admin',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresInt: parseInt(process.env.JWT_EXPIRES_IN) || 3600,
  CLOUDINARY: 'Cloudinary'
});


