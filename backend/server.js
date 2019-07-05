const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const db = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));
}

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/react-news-scraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://screenrant.com/movie-news/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $(".w-browse-clip").children().each(function (i, element) {
      const result = {};

      if ($(this).hasClass("half-thumb")) {
        result.url = `https://screenrant.com/${$(this).children("a").attr("href")}`;
        result.image = $(this).children("a").find("source").attr("data-srcset").split("?")[0];
        result.title = $(this).find($(".bc-title")).children("a").text();
        result.blurb = $(this).find($(".bc-excerpt")).text();

        if (result.blurb) {
          db.Article.create(result)
            .then((dbArticle) => {
              console.log(dbArticle);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

    });
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function (dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
// });


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
