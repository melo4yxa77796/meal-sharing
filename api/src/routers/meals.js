import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res, next) => {
  try {
    const meals = await knex("Meal");
    res.json(meals);
  } catch (error) {
    next(error);
  }
});

mealsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const meal = await knex("Meal").where({ id }).first();

    if (!meal) {
      const error = new Error("Meal not found");
      error.status = 404;
      return next(error);
    }

    res.json(meal);
  } catch (error) {
    next(error);
  }
});

mealsRouter.post("/", async (req, res, next) => {
  const { title, description, location, when, max_reservations, price } =
    req.body;

  if (!title || !when || !max_reservations || !price) {
    const error = new Error(
      "Fields title, when, max_reservations, and price are required."
    );
    error.status = 400;
    return next(error);
  }

  try {
    const formattedDate = new Date(when);
    if (isNaN(formattedDate.getTime())) {
      const error = new Error("Invalid date format.");
      error.status = 400;
      return next(error);
    }

    const newMeal = await knex("Meal").insert({
      title,
      description,
      location,
      when: formattedDate,
      max_reservations,
      price,
      created_date: knex.fn.now(),
    });

    res.status(201).json({ id: newMeal[0] });
  } catch (error) {
    next(error);
  }
});

mealsRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, description, location, when, max_reservations, price } =
    req.body;

  if (!title || !when || !max_reservations || !price) {
    const error = new Error(
      "Fields title, when, max_reservations, and price are required."
    );
    error.status = 400;
    return next(error);
  }

  try {
    const updatedMeal = await knex("Meal")
      .where({ id })
      .update({
        title,
        description,
        location,
        when: new Date(when),
        max_reservations,
        price,
      });

    if (!updatedMeal) {
      const error = new Error("Meal not found");
      error.status = 404;
      return next(error);
    }

    res.json({ message: "Meal updated successfully" });
  } catch (error) {
    next(error);
  }
});

mealsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await knex("Meal").where({ id }).del();

    if (!deletedRows) {
      const error = new Error("Meal not found");
      error.status = 404;
      return next(error);
    }

    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default mealsRouter;
