// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const dbFile = "./db/db.json";
var notesDb = require(dbFile);

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Make public directory accessible
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

// Displays a single note, or returns message
app.get("/api/notes/:noteID", function(req, res) {
  
  var chosen = req.params.noteID;
  console.log(chosen);

  for (let i = 0; i < notesDb.length; i++) {
    if (chosen == notesDb[i].id) {
      return res.json(notesDb[i]);
    }
  }
  return res.json('No record found');
});

// Create New note - takes in JSON input
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  notesDb.push(newNote);
  res.json(newNote);
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});