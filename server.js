require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use(function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  next();
});

app.get("/movie", function handleGetMovies(req, res) {
  let response = MOVIEDEX;

  // If a genre is provided, filter movies by that genre
  if (req.query.genre) {
    response = response.filter((movie) =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  //   If a country is provided, filter movies by the country
  if (req.query.country) {
    response = response.filter((movie) =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }

  // If a avg_vote is provided, filter movies by the avg_vote
  if (req.query.avg_vote) {
    response = responst.filter(
      (movie) => movie.avg_vote >= Number(req.query.avg_vote)
    );
  }

  res.json(response);
});

const PORT = 8010;

app.listen =
  (PORT,
  () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
