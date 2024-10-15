require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { lookup } = require("node:dns");
const { parse } = require("node:url");
const { readFileSync, existsSync, writeFile } = require("node:fs");
const app = express();

// Read URLs from file
let urls = [];

const file = `${process.cwd()}/urls.json`;
if (existsSync(file)) {
  const data = readFileSync(file);
  urls = JSON.parse(data);
}

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

function validate(request, response, next) {
  const pattern = /^(https?:\/\/(www\.)?[a-z0-9\-]+(\.[a-z]{2,})+(\/[^\s]*)?)$/i;
  if (pattern.test(request.body.url)) {
    next();
  } else {
    response.json({ error: "invalid url" });
  }
}

app.post("/api/shorturl", validate, (request, response) => {
  const { hostname } = parse(request.body.url);
  lookup(hostname, (error, address, family) => {
    if (error) {
      response.json({ error: "invalid url" });
    } else {
      const url = new URL(request.body.url);
      const index = urls.length;
      urls[index] = url.href;
      // Save to file
      const data = JSON.stringify(urls);
      writeFile(file, JSON.stringify(urls, null, 1), () => {
        response.json({ original_url: url.href, short_url: index });
      });
    }
  });
});

app.get("/api/shorturl/:short_url", (request, response) => {
  const url = urls[request.params.short_url];
  if (url) {
    response.redirect(url);
  } else {
    response.json({ error: "No short URL found for given input." });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
