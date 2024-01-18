const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Default MongoDB connection URL
const dbName = 'Areceibo'; // Database name

async function connectToDB() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');
  } finally {
    await client.close();
  }
}

connectToDB();

async function insertUser(username, password) {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection('UserAccounts'); // Collection name
  
    await collection.insertOne({ username, password }); //fields
    console.log('User inserted successfully');
  } finally {
    await client.close();
  }
}

insertUser('myUsername', 'myPassword');
