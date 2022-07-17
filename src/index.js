const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const sectionsPath = path.join(__dirname, "../templates/sections");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
hbs.registerPartials(sectionsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
