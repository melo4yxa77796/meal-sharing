import React, { useEffect, useState } from "react";

const TopMeals = () => {
  const [topMeals, setTopMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMeals = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/meals/top");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Fetched top meals:", data);

        setTopMeals(data);
      } catch (error) {
        console.error("Error fetching top meals:", error);
        setError("Failed to fetch top meals.");
      }
    };

    fetchTopMeals();
  }, []);

  return (
    <div>
      <h2>Top 3 Meals This Month</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {Array.isArray(topMeals) && topMeals.length > 0 ? (
          topMeals.map((meal) => (
            <div key={meal.id}>
              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
              <p>Price: ${meal.price.toFixed(2)}</p>
              <p>Total Likes: {meal.totalLikes}</p>
              <p>
                Promo Code: <b>TOP15</b>
              </p>
            </div>
          ))
        ) : (
          <p>No top meals available.</p>
        )}
      </div>
    </div>
  );
};

export default TopMeals;
