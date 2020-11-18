const db = require("../db/db.json");
const fs = require("fs");
const path = require("path");


module.exports = function (app) {
  // GET 
  app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", function (err, data) {
      if (err) throw err;

      res.json(JSON.parse(data));
    });
  });

  // POST
  app.post("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", function (err, data) {
      if (err) throw err;

      const json = JSON.parse(data);

      json.push(req.body);

      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(json), function (err) {
        if (err) throw err;

        console.log("successfully wrote to db");
      });
    });



    res.json(req.body);
  });

  // DELETE
  app.delete("/api/notes/:id", function (req, res) {
    let noteID = req.params.id;

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", function (err, data) {
      if (err) throw err;

      const json = JSON.parse(data);

      const newJson = json.filter(note => note.id !== noteID);

      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newJson), function (err) {
        if (err) throw err;

        console.log("successfully deleted, and wrote to db");
      });
    });

    res.sendStatus(200);


  });
}