const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Default MongoDB connection URL
const dbName = 'Areceibo'; // database name

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

async function insertMessage(message) {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection('Messages'); 
  
    await collection.insertOne({message});
    console.log('User inserted message successfully');
  } finally {
    await client.close();
  }
}

insertMessage('Hello World');
