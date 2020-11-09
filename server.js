// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json")


// Var for Express
const app = express();

// PORT for incoming request
const PORT = process.env.PORT || 8080;

// Setup for Express data parsing/Middleware
const rootObj = { root: __dirname + "/public" };

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(apiRoutes);
app.use(htmlRoutes);

app.get("/", (res, req) => res.sendFile("/index.html", rootObj));

app.get("/notes", (req, res) => res.sendFile("/notes.html", rootObj));
app.get("/api/notes", (req, res) => {
    // console.log("/api/notesget")
    let json = getJson();
    console.log(json);
    res.json(json);
})

app.post("/api/notes", (req, res) => {
    // console.log("./api/notespost")
    // console.log(req.body);
    addNoteToJSON(req.body)
    res.json(getJson());
})

app.delete("/api/notes/id:", (req, res) => {
    // console.log("/api/notes/id:delete")
    deleteNoteToJSON(req.params.id);
    res.json(getJson());
})

// Inherting files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Server request & console log 
app.listen(PORT, function () {
    console.log("App is listening on: http://localhost" + PORT);
});

function getJson() {
    let data = fs.readFileSync(_dirname = "/db/db.json", data);

}
