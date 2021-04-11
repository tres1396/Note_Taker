const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;


function saveJSON(data) {
  let jsonString = JSON.stringify(data);
  fs.writeFileSync("./db/db.json", jsonString);
}

function loadJSON() {
  let rawData = fs.readFileSync("./db/db.json");
  let data = JSON.parse(rawData);
  console.log(data);
  return data;
}

loadJSON();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  const data = loadJSON();
  res.json(data);
});

app.post("/api/notes", function (req, res) {
  console.log(req.body);
  const newEntry = req.body;
  const db = loadJSON();
  db.push(newEntry);
  saveJSON(db);
  // might have to send something back to user
});

app.get("/test", function (req, res) {
  res.send("test");
});

app.get("/json", function (req, res) {
  res.json({ fruit: "banana" });
});


app.listen(PORT, () => console.log(`app now listening on PORT: ${PORT}`));
