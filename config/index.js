const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/tripmate",
    uploadDir: process.env.UPLOAD_DIR || "uploads",
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  },
  production: {
    mongoUri:
      process.env.MONGODB_URI ||
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    uploadDir: process.env.UPLOAD_DIR || "uploads",
    cors: {
      origin: process.env.CLIENT_URL || "https://*.glitch.me",
      credentials: true,
    },
  },
};

module.exports = config[env];
