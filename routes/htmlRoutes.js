const path = require("path");

const index = path.join(__dirname, "../public/index.html");
const notes = path.join(__dirname, "../public/notes.html");

// HTML Routing

module.exports = function (app) {
  // Goes to main page
  app.get("/", function (req, res) {
    res.sendFile(index);
  });

  // Goes to notes page
  app.get("/notes", function (req, res) {
    res.sendFile(notes);
  });

  // Default to main page, if no matching routes
  app.get("*", function (req, res) {
    res.sendFile(index);
  });
};
