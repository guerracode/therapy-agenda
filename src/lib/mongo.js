const { MongoClient } = require('mongodb');
const config = require('../config');

const USER = encodeURIComponent(config.mongo.user);
const PASSWORD = encodeURIComponent(config.mongo.password);
const DB_NAME = config.mongo.db_name;

const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@${config.mongo.host}/${DB_NAME}?retryWrites=true&w=majority`;
let connection;

async function connectDB() {
  if (connection) return connection;

  let client;
  try {
    client = await MongoClient.connect(MONGO_URL, {
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
    connection = client.db(DB_NAME);
  } catch (err) {
    console.error('Could not connect to db', MONGO_URL, err);
    process.exit(1);
  }

  return connection;
}

module.exports = connectDB;
