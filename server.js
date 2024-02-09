const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000; // Change this back to your desired port

const url = 'mongodb://localhost:27017';
const dbName = 'Arecibo';

async function connectToDB() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.connect();
}

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send', async (req, res) => {
  let client;

  try {
    client = await connectToDB();
    const db = client.db(dbName);

    const sender = req.body.sender;
    const subject = req.body.subject;
    const body = req.body.body;
    const timestamp = new Date();

    await db.collection('UserAccounts').insertOne({ sender });
    await db.collection('Messages').insertOne({ sender, subject, body, timestamp });

    res.send('Message sent successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (client) {
      await client.close();
    }
  }
});

// Serve static files
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

// Disable strict MIME checking globally
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Serve index.html using a relative path
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.get('/', async (req, res) => {
  let client;

  try {
    client = await connectToDB();
    const db = client.db(dbName);

    // Fetch messages from the Messages collection
    const messages = await db.collection('Messages').find().toArray();

    // Render index.html and pass messages data to it
    res.render('index', { messages });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

