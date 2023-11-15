// Dependecies
const express = require('express');
const database = require('../database/db');
const path = require('path');
const cors = require("cors");
const routes = require("../routes");
require("dotenv").config();

// App creation
const app = express()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../view')));
app.use("/api/v1", routes);

module.exports = app;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../view', 'index.html'));
});

app.get('/home', (req, res) => {
	res.sendFile(path.join(__dirname, '../view', 'home.html'));
  });

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../view', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../view', 'login.html'));
});