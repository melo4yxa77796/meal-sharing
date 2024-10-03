import express from "express";
import knex from "../database_client.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res) => {
    try {
        const reviews = await knex("Review");
        res.json(reviews);
    } catch (error) {
        console.error("Error retrieving reviews:", error);
        res
            .status(500)
            .json({ error: "Server error while retrieving reviews." });
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
        res
            .status(500)
            .json({ error: "Server error while retrieving review." });
    }
});

reviewsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, comment, stars } = req.body;
    if (!title || !comment || !stars) {
        return res.status(400).json({
            error: "Fields title, comment, and stars are required.",
        });
    }
    try {
        const updatedReview = await knex("Review")
            .where({ id })
            .update({ title, comment, stars });
        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found." });
        }
        res.json({ message: "Review updated successfully." });
    } catch (error) {
        console.error("Error updating review:", error);
        res
            .status(500)
            .json({ error: "Server error while updating review." });
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
        res
            .status(500)
            .json({ error: "Server error while deleting review." });
    }
});
reviewsRouter.post("/", async (req, res) => {
    const { title, comment, stars } = req.body;
    if (!title || !comment || !stars) {
        return res.status(400).json({
            error: "Fields title, comment, and stars are required.",
        });
    }
    try {
        const newReview = await knex("Review").insert({ title, comment, stars });
        res.json(newReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res
            .status(500)
            .json({ error: "Server error while creating review." });
    }
});

export default reviewsRouter