import React, { useEffect, useState } from "react";
import Meal from "./Meal";
import "./MealsList.css";
import MealSearch from "./MealSearch";

function MealsList({ limit }) {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/all-meals");
      const data = await response.json();
      setMeals(data);
      setFilteredMeals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const limitedMeals = limit ? filteredMeals.slice(0, limit) : filteredMeals;

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Meals</h2>

      <MealSearch meals={meals} onFilter={setFilteredMeals} />

      <div className="meals-grid">
        {meals.length > 0 ? (
          limitedMeals.map((meal) => <Meal key={meal.id} meal={meal} />)
        ) : (
          <p>Loading meals...</p>
        )}
      </div>
    </>
  );
}

export default MealsList;
