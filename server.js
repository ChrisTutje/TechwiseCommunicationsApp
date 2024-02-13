const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT;

const dbName = process.env.DATABASE_NAME;

async function connectToDB() {
  //const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/?retryWrites=true&w=majority`;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

app.post("/message", async (req, res) => {
  let client;

  try {
    client = await connectToDB();
    const db = client.db(dbName);

    const sender = req.body.sender;
    const subject = req.body.subject;
    const body = req.body.body;
    const timestamp = new Date();

    await db.collection("UserAccounts").insertOne({ sender });
    await db
      .collection("Messages")
      .insertOne({ sender, subject, body, timestamp });

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

// Serve static files
app.use(express.static("public"));

// Disable strict MIME checking globally
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Serve index.html using a relative path
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
