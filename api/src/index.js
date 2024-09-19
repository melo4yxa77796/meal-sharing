import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

app.get("/my-route", (req, res) => {
    res.send("Hi friend");
  });

app.get("/", async (req, res) => {
    try {
      res.json({ message: 'API is working!' });  
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });


// Route for future meals
app.get('/future-meals', async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` > NOW()");
    res.json(meals[0]);  // Return array of meals
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching future meals.' });
  }
});

// Route for past meals
app.get('/past-meals', async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` < NOW()");
    res.json(meals[0]);  // Return array of meals
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching past meals.' });
  }
});

// Route for all meals, sorted by ID
app.get('/all-meals', async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id");
    res.json(meals[0]);  // Return array of meals
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching all meals.' });
  }
});

// Route for the first meal (by minimum ID)
app.get('/first-meal', async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id ASC LIMIT 1");
    if (meals[0].length === 0) {
      res.status(404).json({ error: 'No meals available.' });
    } else {
      res.json(meals[0][0]);  // Return the first meal
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching the first meal.' });
  }
});

// Route for the last meal (by maximum ID)
app.get('/last-meal', async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1");
    if (meals[0].length === 0) {
      res.status(404).json({ error: 'No meals available.' });
    } else {
      res.json(meals[0][0]);  // Return the last meal
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching the last meal.' });
  }
});

// Example of a nested router (can be replaced with your own sub-router)
app.use("/nested", nestedRouter);

// Use routes with /api prefix
app.use("/api", apiRouter);

// Start server on port from .env file or default to 3000
app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});






