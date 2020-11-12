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
    keyData = fs.readFileSync("./db/db.json", "utf8");
    console.log(keyData);
    keyData = JSON.parse(keyData);
    req.body.id = keyData.length;
    keyData.push(req.body);
    notesData = JSON.stringify(keyData);
    fs.writeFile("./db/db.json", keyData, "utf8", function (err) {
      if (err) throw err;
    });

    res.json(JSON.parse(keyData));
  } catch (err) {
    throw err;
  }
});

app.delete("/api/notes/:id", function (req, res) {
  try {
    keyData = fs.readFileSync("./db/db.json", "utf8");
    keyData = JSON.parse(notesData);
    keyData = keyData.filter(function (note) {
      return note.id != req.params.id;
    });
    keyData = JSON.stringify(keyData);
    fs.writeFile("./db/db.json", keyData, "utf8", function (err) {
      if (err) throw err;
    });
    res.send(JSON.parse(keyData));
  } catch (err) {
    throw err;
  }
});
