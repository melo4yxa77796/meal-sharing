import express from "express";
import knex from "../database_client.js";

const reviewsRouter = express.Router();

function validateReviewFields({
  title,
  description,
  meal_id,
  stars,
  created_date,
}) {
  if (!title || !description || !meal_id || !stars || !created_date) {
    return {
      valid: false,
      error:
        "Fields title, description, meal_id, stars, and created_date are required.",
    };
  }

  if (stars < 1 || stars > 5) {
    return {
      valid: false,
      error: "Stars must be between 1 and 5.",
    };
  }

  return { valid: true };
}

reviewsRouter.get("/", async (req, res, next) => {
  console.log("GET /api/reviews route called");
  try {
    const reviews = await knex("Review");
    res.json(reviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    next(error);
  }
});

reviewsRouter.post("/", async (req, res, next) => {
  const { title, description, meal_id, stars, created_date } = req.body;

  const validation = validateReviewFields({
    title,
    description,
    meal_id,
    stars,
    created_date,
  });

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const newReview = await knex("Review").insert({
      title,
      description,
      meal_id,
      stars,
      created_date,
    });
    res.status(201).json({
      message: "Review created successfully.",
      reviewId: newReview[0],
    });
  } catch (error) {
    console.error("Error creating review:", error);
    next(error);
  }
});

reviewsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await knex("Review").where({ id }).first();
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.json(review);
  } catch (error) {
    console.error("Error retrieving review:", error);
    next(error);
  }
});

reviewsRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, description, meal_id, stars, created_date } = req.body;

  const validation = validateReviewFields({
    title,
    description,
    meal_id,
    stars,
    created_date,
  });

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const updatedRows = await knex("Review").where({ id }).update({
      title,
      description,
      meal_id,
      stars,
      created_date,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Review not found." });
    }

    res.status(200).json({
      message: "Review updated successfully.",
    });
  } catch (error) {
    console.error("Error updating review:", error);
    next(error);
  }
});

reviewsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReview = await knex("Review").where({ id }).del();
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error);
    next(error);
  }
});

reviewsRouter.get("/meals/:meal_id", async (req, res) => {
  const { meal_id } = req.params;
  try {
    const reviews = await knex("Review").where({ meal_id });
    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this meal." });
    }
    res.json(reviews);
  } catch (error) {
    console.error("Error retrieving reviews for meal:", error);
    next(error);
  }
});

export default reviewsRouter;
