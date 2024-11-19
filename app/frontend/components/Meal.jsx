/*import React, { useState, useEffect } from "react";
import "./Meal.css";
import { Link } from "react-router-dom";

const Meal = ({ meal }) => {
  const [availableSpots, setAvailableSpots] = useState(meal.availableSpots);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchAvailableSpots();

    const interval = setInterval(() => {
      fetchAvailableSpots();
    }, 10000);

    return () => clearInterval(interval);
  }, [meal.id]);

  return (
    <Link to={`/meals/${meal.id}`} className="meal-card">
      <h3 className="meal-title">{meal.title}</h3>
      <p className="meal-description">{meal.description}</p>
      <p className="meal-price">Price: ${price.toFixed(2)}</p>

      <p className="meal-spots">
        {isLoading ? "Loading..." : `Available Spots: ${availableSpots}`}
      </p>
    </Link>
  );
};

export default Meal;*/
import React, { useState, useEffect } from "react";
import "./Meal.css";
import { Link } from "react-router-dom";

const Meal = ({ meal }) => {
  const [availableSpots, setAvailableSpots] = useState(meal.availableSpots);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchAvailableSpots();

    const interval = setInterval(() => {
      fetchAvailableSpots();
    }, 10000);

    return () => clearInterval(interval);
  }, [meal.id]);

  return (
    <Link to={`/meals/${meal.id}`} className="meal-card">
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

      <p className="meal-spots">
        {isLoading ? "Loading..." : `Available Spots: ${availableSpots}`}
      </p>
    </Link>
  );
};

export default Meal;
