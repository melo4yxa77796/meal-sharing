import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import "./ReviewsPage.css";

const ReviewsPage = ({ mealId }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(5);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const createdDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      name,
      title,
      description,
      meal_id: mealId,
      stars,
      created_date: createdDate,
    };

    try {
      const response = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert("Review submitted successfully!");
        setName("");
        setTitle("");
        setDescription("");
        setStars(5);
        setIsFormVisible(false);
      } else {
        alert("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
    }
  };

  return (
    <div className="reviews-page">
      <Typography variant="h4" gutterBottom>
        Leave a Review
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Hide Form" : "Show Form"}
      </Button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="review-form">
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Review Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Your Review"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Stars"
            variant="outlined"
            fullWidth
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            margin="normal"
            type="number"
            min="1"
            max="5"
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Submit Review
          </Button>
        </form>
      )}
    </div>
  );
};

export default ReviewsPage;
