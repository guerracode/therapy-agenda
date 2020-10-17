require('dotenv').config();

const config = {
  general: {
    env: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
  },
  mongo: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
  },
};

module.exports = config;
