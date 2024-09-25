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

// Helper function to handle async errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

app.get("/", asyncHandler(async (req, res) => {
  res.json({ message: 'API is working!' });
}));


app.get('/future-meals', async (req, res) => {
  try {
    const meals = await knex('Meal').where('when', '>', knex.fn.now());
    res.json(meals);  // No need for [0] as in raw SQL
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching future meals.' });
  }
});


// Route for past meals
app.get('/past-meals', async (req, res) => {
  try {
    const meals = await knex('Meal').where('when', '<', knex.fn.now());
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching past meals.' });
  }
});


// Route for all meals
app.get('/all-meals', async (req, res) => {
  try {
    const meals = await knex('Meal').orderBy('id');
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching all meals.' });
  }
});


// Route for the first meal
app.get('/first-meal', async (req, res) => {
  try {
    const meal = await knex('Meal').orderBy('id', 'asc').first();  // "first()" returns a single object
    if (!meal) {
      res.status(404).json({ error: 'No meals available.' });
    } else {
      res.json(meal);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching the first meal.' });
  }
});


// Route for the last meal
app.get('/last-meal', async (req, res) => {
  try {
    const meal = await knex('Meal').orderBy('id', 'desc').first();  // Same as above, "first()" fetches the first result in the ordered set
    if (!meal) {
      res.status(404).json({ error: 'No meals available.' });
    } else {
      res.json(meal);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching the last meal.' });
  }
});


// Example of a nested router 
app.use("/nested", nestedRouter);

// Use routes with /api prefix
app.use("/api", apiRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Start server on port from .env file or default to 3000
app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
