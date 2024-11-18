import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";
import "./routers/resetReservations.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const apiRouter = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

app.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json({ message: "API is working!" });
  })
);

app.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex("Meal").where("when", ">", knex.fn.now());
    res.json(meals);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error while fetching future meals." });
  }
});

app.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex("Meal").where("when", "<", knex.fn.now());
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching past meals." });
  }
});

app.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex("Meal").orderBy("id");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching all meals." });
  }
});

app.get("/first-meal", async (req, res) => {
  try {
    const meal = await knex("Meal").orderBy("id", "asc").first();
    if (!meal) {
      res.status(404).json({ error: "No meals available." });
    } else {
      res.json(meal);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error while fetching the first meal." });
  }
});

app.get("/last-meal", async (req, res) => {
  try {
    const meal = await knex("Meal").orderBy("id", "desc").first();
    if (!meal) {
      res.status(404).json({ error: "No meals available." });
    } else {
      res.json(meal);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error while fetching the last meal." });
  }
});

app.use("/nested", nestedRouter);

app.use("/api/meals", mealsRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/reviews", reviewsRouter);

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
