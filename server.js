import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import path from 'path';
// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');
// const route = require("./public/js/registration/routes/index.js");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import App from "./public/js/registration/routes/index.js";

const app = express();
const PORT = 3000; // Change this back to your desired port

const url = 'mongodb://3.131.33.187:27017/';
const dbName = 'Arecibo';

async function connectToDB() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.connect();
}

async function connectByMongoose() {
  mongoose.promise = global.Promise;
  mongoose.set("strictQuery", false);
  mongoose
      .connect(url+"/login_test", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      })
      .then(console.log(`Connected to database ${url}`))
      .catch((err) => console.log(err));
}

// Configure Header Info
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(express.json());

// Configure routes
app.use(App);

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

