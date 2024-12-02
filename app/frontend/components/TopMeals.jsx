import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopMeals.css";

const TopMeals = () => {
  const [topMeals, setTopMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMeals = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/meals/top");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched top meals:", data);

        const mealsWithImages = data.map((meal) => ({
          ...meal,
          image_path: meal.image_path || "/placeholder.jpg",
        }));

        setTopMeals(mealsWithImages);
      } catch (error) {
        console.error("Error fetching top meals:", error);
        setError("Failed to fetch top meals.");
      }
    };

    fetchTopMeals();
  }, []);

  return (
    <div className="top-meals">
      {error && <p className="error">{error}</p>}
      <div className="meals-container">
        {Array.isArray(topMeals) && topMeals.length > 0 ? (
          topMeals.map((meal) => (
            <div className="meal-card1" key={meal.id}>
              <Link to={`/meals/${meal.id}`}>
                <img
                  className="meal-image"
                  src={`http://localhost:3001${meal.image_path}`}
                  alt={meal.title}
                />
                <h3 className="meal-title">{meal.title}</h3>
                <p className="meal-description1">{meal.description}</p>
                <p className="meal-price">
                  Price: ${Number(meal.price).toFixed(2)}
                </p>
              </Link>
              <div className="meal-likes">
                <span>{meal.totalLikes} ❤️</span>
              </div>
            </div>
          ))
        ) : (
          <p>No top meals available.</p>
        )}
      </div>
      <div className="discount-info">
        <p>
          These top 3 meals are available with a <b>15% discount</b> in
          participating cafes and restaurants! Use the promo code <b>TOP15</b>{" "}
          when placing your order.
        </p>
        <p>
          <b>Participating locations:</b> City Bistro, Gourmet Haven, The Foodie
          Spot.
        </p>
      </div>
    </div>
  );
};

export default TopMeals;

