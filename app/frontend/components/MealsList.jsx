import React, { useEffect, useState } from "react";
import Meal from "./Meal";
import "./MealsList.css";
import MealSearch from "./MealSearch";

function MealsList({ limit }) {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState("");
  

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/all-meals`);
      const data = await response.json();

      const sanitizedData = data.map((meal) => ({
        ...meal,
        title: typeof meal.title === "string" ? meal.title : "Unknown Meal",
        price: meal.price || 0,
      }));

      setMeals(sanitizedData);
      setFilteredMeals(sanitizedData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAvailableSpots = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/meals");
      const updatedMeals = await response.json();

      setMeals((prevMeals) =>
        prevMeals.map((meal) => {
          const updatedMeal = updatedMeals.find((m) => m.id === meal.id);
          return updatedMeal
            ? { ...meal, availableSpots: updatedMeal.availableSpots }
            : meal;
        })
      );
    } catch (error) {
      console.error("Error updating available spots:", error);
    }
  };

  const handleSortChange = (type, value) => {
    if (type === "sortKey") setSortKey(value);
    if (type === "sortDir") setSortDir(value);
  };

  useEffect(() => {
    if (sortKey && sortDir) {
      const sortMeals = (meals) => {
        return [...meals].sort((a, b) => {
          if (sortKey === "title") {
            const titleA = a.title ? a.title.toLowerCase() : "";
            const titleB = b.title ? b.title.toLowerCase() : "";
            return sortDir === "asc"
              ? titleA.localeCompare(titleB)
              : titleB.localeCompare(titleA);
          }
          if (sortKey === "price") {
            return sortDir === "asc" ? a.price - b.price : b.price - a.price;
          }
          return 0;
        });
      };

      const sortedMeals = sortMeals(filteredMeals);
      setFilteredMeals(sortedMeals);
    }
  }, [sortKey, sortDir]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      updateAvailableSpots();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const limitedMeals = limit ? filteredMeals.slice(0, limit) : filteredMeals;

  return (
    <>
    <div className="meals-list" >
      <h2 style={{ textAlign: "center",
        padding: "20px",
        fontSize: "4em",
        fontFamily: "'Dancing Script', cursive",
       }}>Meals</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <select
          defaultValue=""
          onChange={(e) => handleSortChange("sortKey", e.target.value)}
          className="sort-select"
        >
          <option value="" disabled className="sort-select">
            Select Field to Sort
          </option>
          <option value="title">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>

        <select
          defaultValue=""
          onChange={(e) => handleSortChange("sortDir", e.target.value)}
          className="sort-select"
        >
          <option value="" disabled>
            Select Direction
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <MealSearch meals={meals} onFilter={setFilteredMeals} />

      <div className="meals-grid">
        {meals.length > 0 ? (
          limitedMeals.map((meal) => <Meal key={meal.id} meal={meal} />)
        ) : (
          <p>Loading meals...</p>
        )}
      </div>
    </div>
    </>
  );
}

export default MealsList;
