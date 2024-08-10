const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require('bcrypt');
const session = require('express-session');
require("dotenv").config();

const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.SERVER_PORT;
const SERVER_IP = process.env.SERVER_IP;
const dbName = process.env.DATABASE_NAME;
const saltRounds = 10;

// Configure database connection
async function connectToDB() {
  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return await client.connect();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: `${process.env.MONGODB_URL}+${process.env.MONGODB_PASSWORD}`, // hashes the string for unique session ID, should change periodically (look up secret rotation)
  saveUninitialized: false, // session isn't created until something is stored
  resave: false // session isn't saved if no changes
}));

// Routes for handling messages, registration, login, and logout
app.post("/message", async (req, res) => {
  let client;

  try {
    client = await connectToDB();
    const db = client.db(dbName);

    const { sender, subject, body } = req.body;
    const timestamp = new Date();

    await db.collection("Messages").insertOne({ sender, subject, body, timestamp });

    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.get("/message", async (req, res) => {
  let client;

  try {
    client = await connectToDB();
    const db = client.db(dbName);

    // Fetch messages from the Messages collection
    const messages = await db.collection("Messages").find().toArray();

    // Send messages as JSON response
    res.json(messages);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.get('/logout', async (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.end();
  }
});

app.post('/register', async (req, res) => {
  let client;

  try {
    client = await connectToDB();
    const db = client.db(dbName);
    const { username } = req.body;
    const timestamp = new Date();

    const salt = await bcrypt.genSalt(saltRounds);
    const password = await bcrypt.hash(req.body.password, salt);

    const existingUser = await db.collection("UserAccounts").findOne({ username });
    if (existingUser) {
      throw "duplicateUsers";
    }

    await db.collection('UserAccounts').insertOne({ username, password, timestamp });
    req.session.userStartDate = timestamp;
    req.session.username = username;
    res.redirect('/');
  } catch (err) {
    res.redirect('/signup.html?error=' + encodeURIComponent(err));
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.post('/login', async (req, res) => {
  let client;

  try {
    client = await connectToDB();
    const db = client.db(dbName);

    const user = await db.collection("UserAccounts").findOne({ username: req.body.username });
    if (!user) {
      throw "badlogin";
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw "badlogin";
    }

    req.session.userStartDate = user.timestamp;
    req.session.username = user.username;
    res.redirect("/");
  } catch (err) {
    res.redirect('/signup.html?error=' + encodeURIComponent(err));
  } finally {
    if (client) {
      await client.close();
    }
  }
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Disable strict MIME checking globally
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Serve static files
app.use(express.static("public"));

// Serve index.ejs using a relative path
app.get("/", (req, res) => {
  res.render('index', { username: req.session.username, userStartDate: req.session.userStartDate });
});

app.get("/ReturnOfTheFallen", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ReturnOfTheFallenUncompressed', 'index.html'));
});

// Serve the React app from the '/about_us/aboutChrisTutje' route
app.use('/about_us/aboutChrisTutje', express.static(path.join(__dirname, 'public', 'about_us', 'aboutChrisTutje', 'dist')));

// Serve the index.html file for the React app on any route under '/about_us/aboutChrisTutje'
app.get('/about_us/aboutChrisTutje/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about_us', 'aboutChrisTutje', 'dist', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://${SERVER_IP}:${PORT}`);
});
