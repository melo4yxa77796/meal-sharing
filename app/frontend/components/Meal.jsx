import React from "react";
import "./Meal.css";
import { Link } from "react-router-dom";

const Meal = ({ meal }) => {
  const price =
    typeof meal.price === "string" ? parseFloat(meal.price) : meal.price;

  return (

    <Link to={`/meals/${meal.id}`} className="meal-card">
      <h3 className="meal-title">{meal.title}</h3>
      <p className="meal-description">{meal.description}</p>
      <p className="meal-price">Price: ${price.toFixed(2)}</p>
    </Link>
  );
};

export default Meal;
