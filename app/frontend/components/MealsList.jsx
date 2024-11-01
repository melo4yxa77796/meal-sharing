"use client";

import React, { useEffect, useState } from "react";
import Meal from "./Meal";
import "./MealsList.css";

function MealsList() {
  const [meals, setMeals] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/all-meals");
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Meals</h2>
      <div className="meals-grid">
        {" "}
        {}
        {meals.length > 0 ? (
          meals.map((meal) => <Meal key={meal.id} meal={meal} />)
        ) : (
          <p>Loading meals...</p>
        )}
      </div>
    </>
  );
}

export default MealsList;
