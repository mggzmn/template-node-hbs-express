const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
//Define paths for Express
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
//setup static directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mariana",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Mariana",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  res.send({
    forecast:"It is snowing",
    address:req.query.address
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mariana",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("it's running");
});
