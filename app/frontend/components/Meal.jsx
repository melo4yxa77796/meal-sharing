import React from "react";
import "./Meal.css";

const Meal = ({ meal }) => {
  const price =
    typeof meal.price === "string" ? parseFloat(meal.price) : meal.price;

  return (
    <div className="meal-card">
      <h3 className="meal-title">{meal.title}</h3>
      <p className="meal-description">{meal.description}</p>
      <p className="meal-price">Цена: ${price.toFixed(2)}</p>
    </div>
  );
};

export default Meal;
