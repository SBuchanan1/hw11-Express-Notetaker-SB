const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Needed to add this middleware for css to work (https://stackoverflow.com/questions/13395742/can-not-get-css-file)
app.use(express.static(path.join(__dirname, 'public')));


// have to put API routes before HTML routes, because HTML routes contains * (catch-all)
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
})