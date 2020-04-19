// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
var notes;
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Make public directory accessible
app.use(express.static(path.join(__dirname, './public')))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Routes

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


fs.readFile("db/db.json", "utf8", function (err, data) {
  notes = JSON.parse(data);
});

app.get("/api/notes", function (req, res) {
  res.json(notes);
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  newNote.id = notes.length;
  notes.push(newNote);
  saveNotes();
  res.json({ success: true });
});

app.delete("/api/notes/:id", function (req, res) {
  notes = notes.filter((note) => note.id !== parseInt(req.params.id));
  saveNotes();
  res.json({ success: true });
});

function saveNotes() {
  fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
    if (err) throw err;
    console.log("notes saved");
  });
}


app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});