const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');
const bcrypt = require('bcrypt');

// // Get environment variables
const dotenv = require('dotenv')
dotenv.config();

const { URI, PORT } = process.env;

const app = express();
const dbName = 'Arecibo';

// // Configure Header Info
// app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser);
// app.use(express.json());

// // Configure database
async function connectToDB() {
  const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.connect();
}

app.post('/send', async (req, res) => {
  let client;

  try {
    client = await connectToDB();
    const db = client.db(dbName);

    const sender = req.body.sender;
    const subject = req.body.subject;
    const body = req.body.body;
    const timestamp = new Date();

    //await db.collection('UserAccounts').insertOne({ sender });
    await db.collection('Messages').insertOne({ sender, subject, body, timestamp });

    //res.send('Message sent successfully!');
    res.redirect('/');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.post('/register', async (req, res) => {
    let client;

    try {
      client = await connectToDB();
      const db = client.db(dbName);

      let password;
      password = await hashPassword(req.body.password);
      console.log(password);
      var username = req.body.username;
      const timestamp = new Date();

      await db.collection('UserAccounts').insertOne({ username, password, timestamp });
      res.redirect('/');

    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    } finally {
      if (client) {
        await client.close();
      }
    }
  }
);

async function hashPassword(password) {
  console.log(password);
  bcrypt.genSalt(10)
  .then(salt => {
    return bcrypt.hash(password, salt);
  }) 
  .then(hash => {

    console.log(hash);
    return hash;
  })
  .catch();
}

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
  //const indexPath = path.join(__dirname, 'public/index.html');
  const indexPath = 'public/index.html';
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

