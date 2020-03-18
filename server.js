// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const dbFile = "./db/db.json";
const notesData = require(dbFile);

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Routes

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, dbFile));
});


app.post("/api/notes", function(req, res) {
    tableData.push(req.body);
});

app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  console.log(newNote);
  notesData.push(newNote);
  console.log(newNote);
  res.json(newNote);
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});