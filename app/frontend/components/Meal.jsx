import React, { useState, useEffect } from "react";
import "./Meal.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Meal = ({ meal }) => {
  const [availableSpots, setAvailableSpots] = useState(meal.availableSpots);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const price =
    typeof meal.price === "string" ? parseFloat(meal.price) : meal.price;

  const fetchAvailableSpots = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/meals/${meal.id}/spots`
      );
      if (response.ok) {
        const data = await response.json();
        setAvailableSpots(data.availableSpots);
      } else {
        console.error("Failed to fetch available spots");
      }
    } catch (error) {
      console.error("Error fetching available spots:", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/meals/${meal.id}/likes`
      );
      if (response.ok) {
        const data = await response.json();
        setLikes(data.totalLikes || 0);
      } else {
        console.error("Failed to fetch likes");
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const handleLike = async () => {
    if (hasLiked) {
      alert("You have already liked.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/meals/${meal.id}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setLikes((prevLikes) => prevLikes + 1);
        Cookies.set("hasLiked", true, { expires: 30 });
        setHasLiked(true);
      } else {
        console.error("Failed to like meal.");
      }
    } catch (error) {
      console.error("Error liking meal:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
    fetchAvailableSpots();

    if (Cookies.get("hasLiked")) {
      setHasLiked(true);
    }
  }, [meal.id]);

  return (
    <div className="meal-card">
      <Link to={`/meals/${meal.id}`}>
        {meal.image_path && (
          <img
            src={`http://localhost:3001${meal.image_path}`}
            alt={meal.title}
            className="meal-image"
          />
        )}
        <h3 className="meal-title">{meal.title}</h3>
        <p className="meal-description">{meal.description}</p>
        <p className="meal-price">Price: ${price.toFixed(2)}</p>
        <p className="meal-spots">Available Spots: {availableSpots}</p>
      </Link>
      <div className="meal-likes">
        <button
          onClick={handleLike}
          className="like-button"
          disabled={hasLiked}
        
        >
          {hasLiked ? "Liked" : "Like"}
        </button>
        <span>{likes} ❤️</span>
      </div>
    </div>
  );
};

export default Meal;
