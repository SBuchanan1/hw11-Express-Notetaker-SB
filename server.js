const fs = require("fs");

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.join(__dirname, "db/db.json"));
});

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});

app.post("/api/notes", function (req, res) {
  try {
    notesData = fs.readFileSync("./db/db.json", "utf8");
    console.log(notesData);
    notesData = JSON.parse(notesData);
    req.body.id = notesData.length;
    notesData.push(req.body);
    notesData = JSON.stringify(notesData);
    fs.writeFile("./db/db.json", notesData, "utf8", function (err) {
      if (err) throw err;
    });

    res.json(JSON.parse(notesData));
  } catch (err) {
    throw err;
  }
});

app.delete("/api/notes/:id", function (req, res) {
  try {
    notesData = fs.readFileSync("./db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    notesData = notesData.filter(function (note) {
      return note.id != req.params.id;
    });
    notesData = JSON.stringify(notesData);
    fs.writeFile("./db/db.json", notesData, "utf8", function (err) {
      if (err) throw err;
    });
    res.send(JSON.parse(notesData));
  } catch (err) {
    throw err;
  }
});
